import {isEscapeKey, openModalElement, closeModalElement} from './util.js';

const MIN_SHOWN_COMMENTS = 5;

let commentsForRender = [];
let startCommentCount = 0;
let thumbnails = [];

const modalPhotoElement = document.querySelector('.big-picture');
const modalCloseButtonElement = modalPhotoElement.querySelector('.big-picture__cancel');
const bigPhotoElement = modalPhotoElement.querySelector('.big-picture__img img');
const likesCountElement = modalPhotoElement.querySelector('.likes-count');
const commentsCountElement = modalPhotoElement.querySelector('.social__comment-count');
const shownCommentsCountElement = commentsCountElement.querySelector('.social__comment-shown-count');
const totalCommentsCountElement = commentsCountElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = modalPhotoElement.querySelector('.comments-loader');
const commentTemplateElement = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsListElement = modalPhotoElement.querySelector('.social__comments');
const photoCaptionElement = modalPhotoElement.querySelector('.social__caption');

const saveThumbnails = (photosArray) => {
  thumbnails = photosArray;
};

const getThumbnailbyId = (id, thubnailsArray) => {
  id = parseInt(id, 10);
  for (let i = 0; i < thubnailsArray.length; i++) {
    if (thubnailsArray[i].id === id) {
      return thubnailsArray[i];
    }
  }
};

const clearCommentsList = () => {
  startCommentCount = 0;
  commentsListElement.innerHTML = '';
};

const renderNextComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const nextComments = commentsForRender.slice(startCommentCount, startCommentCount + MIN_SHOWN_COMMENTS);
  nextComments.forEach(({avatar, message, name}) => {
    const commentElement = commentTemplateElement.cloneNode(true);
    const commentAvatarElement = commentElement.querySelector('.social__picture');
    commentAvatarElement.src = avatar;
    commentAvatarElement.alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentsFragment.append(commentElement);
  });
  commentsListElement.append(commentsFragment);
  startCommentCount += MIN_SHOWN_COMMENTS;
  shownCommentsCountElement.textContent = startCommentCount;
  if (commentsListElement.children.length === commentsForRender.length) {
    shownCommentsCountElement.textContent = commentsListElement.children.length;
    commentsLoaderElement.classList.add('hidden');
  }
};

const renderComments = (commentsArray) => {
  commentsForRender = commentsArray;
  renderNextComments();
  commentsLoaderElement.addEventListener('click', renderNextComments);
};

const renderModal = ({url, likes, description, comments}) => {
  bigPhotoElement.src = url;
  bigPhotoElement.alt = description;
  photoCaptionElement.textContent = description;
  likesCountElement.textContent = likes;
  shownCommentsCountElement.textContent = (comments.length < MIN_SHOWN_COMMENTS) ? comments.length : MIN_SHOWN_COMMENTS;

  totalCommentsCountElement.textContent = comments.length;

  if (comments.length !== 0) {
    renderComments(comments);
  } else {
    commentsLoaderElement.classList.add('hidden');
  }
};

const onThumbnailClick = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    openModalPhoto();

    const currentId = evt.target.closest('.picture').dataset.id;
    const currentThumbnail = getThumbnailbyId(currentId, thumbnails);
    renderModal(currentThumbnail);
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalPhoto();
  }
};

function openModalPhoto() {
  openModalElement(modalPhotoElement);
  modalCloseButtonElement.addEventListener('click', closeModalPhoto);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.classList.remove('hidden');
}

function closeModalPhoto() {
  closeModalElement(modalPhotoElement);
  modalCloseButtonElement.removeEventListener('click', closeModalPhoto);
  document.removeEventListener('keydown', onDocumentKeydown);
  clearCommentsList();
}

export {onThumbnailClick, saveThumbnails};
