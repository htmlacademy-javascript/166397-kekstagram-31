import {isEscapeKey, openModalElement, closeModalElement, thumbnails} from './util.js';

const modalPhoto = document.querySelector('.big-picture');
const modalCloseButton = modalPhoto.querySelector('.big-picture__cancel');
const bigPhoto = modalPhoto.querySelector('.big-picture__img img');
const likesCount = modalPhoto.querySelector('.likes-count');
const commentsCount = modalPhoto.querySelector('.social__comment-count');
const shownCommentsCount = commentsCount.querySelector('.social__comment-shown-count');
const totalCommentsCount = commentsCount.querySelector('.social__comment-total-count');
const commentsLoader = modalPhoto.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsList = modalPhoto.querySelector('.social__comments');
const photoCaption = modalPhoto.querySelector('.social__caption');
const MIN_SHOWN_COMMENTS = 5;
let commentsForRender = [];
let startCommentCount = 0;

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
  commentsList.innerHTML = '';
};

const renderNextComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const nextComments = commentsForRender.slice(startCommentCount, startCommentCount + MIN_SHOWN_COMMENTS);
  nextComments.forEach(({avatar, message, name}) => {
    const comment = commentTemplate.cloneNode(true);
    const commentAvatar = comment.querySelector('.social__picture');
    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    comment.querySelector('.social__text').textContent = message;
    commentsFragment.append(comment);
  });
  commentsList.append(commentsFragment);
  startCommentCount += MIN_SHOWN_COMMENTS;
  shownCommentsCount.textContent = startCommentCount;
  if (commentsList.children.length === commentsForRender.length) {
    shownCommentsCount.textContent = commentsList.children.length;
    commentsLoader.classList.add('hidden');
  }
};

const renderComments = (commentsArray) => {
  commentsForRender = commentsArray;
  renderNextComments();
  commentsLoader.addEventListener('click', renderNextComments);
};

const renderModal = ({url, likes, description, comments}) => {
  bigPhoto.src = url;
  bigPhoto.alt = description;
  likesCount.textContent = likes;
  if (comments.length < MIN_SHOWN_COMMENTS) {
    shownCommentsCount.textContent = comments.length;
  } else {
    shownCommentsCount.textContent = MIN_SHOWN_COMMENTS;
  }

  totalCommentsCount.textContent = comments.length;

  if (comments.length !== 0) {
    renderComments(comments);
  } else {
    commentsLoader.classList.add('hidden');
  }
  photoCaption.textContent = description;
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
  openModalElement(modalPhoto);
  modalCloseButton.addEventListener('click', closeModalPhoto);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.classList.remove('hidden');
}

function closeModalPhoto() {
  closeModalElement(modalPhoto);
  modalCloseButton.removeEventListener('click', closeModalPhoto);
  document.removeEventListener('keydown', onDocumentKeydown);
  clearCommentsList();
}

export {onThumbnailClick};
