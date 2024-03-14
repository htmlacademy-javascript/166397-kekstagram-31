import {thumbnailsList, thumbnails} from './render-thumbnails.js';
import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const modalPhoto = document.querySelector('.big-picture');
const modalCloseButton = modalPhoto.querySelector('.big-picture__cancel');
const bigPhoto = modalPhoto.querySelector('.big-picture__img img');
const likesCount = modalPhoto.querySelector('.likes-count');
const commentsCount = modalPhoto.querySelector('.social__comment-count');
const shownCommentsCount = modalPhoto.querySelector('.social__comment-shown-count');
const totalCommentsCount = modalPhoto.querySelector('.social__comment-total-count');
const commentsLoader = modalPhoto.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();
const commentsList = modalPhoto.querySelector('.social__comments');
const photoCaption = modalPhoto.querySelector('.social__caption');

const getThumbnailbyId = (id, thubnailsArray) => {
  id = parseInt(id, 10);
  for (let i = 0; i < thubnailsArray.length; i++) {
    if (thubnailsArray[i].id === id) {
      return thubnailsArray[i];
    }
  }
};

const clearCommentsList = () => {
  commentsList.innerHTML = '';
};

const renderComments = (commentsArray) => {
  commentsArray.forEach(({avatar, message, name}) => {
    const comment = commentTemplate.cloneNode(true);
    const commentAvatar = comment.querySelector('.social__picture');
    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    comment.querySelector('.social__text').textContent = message;
    commentsFragment.append(comment);
  });
  commentsList.append(commentsFragment);
};

const renderModal = ({url, likes, description, comments}) => {
  bigPhoto.src = url;
  likesCount.textContent = likes;
  if (comments.length < 5) {
    shownCommentsCount.textContent = comments.length;
  } else {
    shownCommentsCount.textContent = 5;
  }

  totalCommentsCount.textContent = comments.length;
  clearCommentsList();
  renderComments(comments);
  photoCaption.textContent = description;
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
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
  modalPhoto.classList.remove('hidden');
  modalCloseButton.addEventListener('click', closeModalPhoto);
  document.addEventListener('keydown', onDocumentKeydown);
  body.classList.add('modal-open');
}

function closeModalPhoto() {
  modalPhoto.classList.add('hidden');
  modalCloseButton.removeEventListener('click', closeModalPhoto);
  document.removeEventListener('keydown', onDocumentKeydown);
  body.classList.remove('modal-open');
  clearCommentsList();
}

const addsEventListenerOnThumbnails = () => {
  thumbnailsList.addEventListener('click', onThumbnailClick);
};

export {addsEventListenerOnThumbnails};
