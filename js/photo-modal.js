import {thumbnailsList, thumbnails} from './render-thumbnails.js';
import {isEscapeKey} from './util.js';

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsList = document.querySelector('.social__comments');
const commentsFragment = document.createDocumentFragment();

const clearCommentsList = () => {
  commentsList.innerHTML = '';
};

const renderComments = (currentPhoto) => {
  currentPhoto.comments.forEach(({id, avatar, message, name}) => {
    const comment = commentTemplate.cloneNode(true);
    const commentImage = comment.querySelector('.social__picture');

    comment.dataset.id = id;
    commentImage.src = avatar;
    commentImage.alt = name;
    comment.querySelector('.social__text').textContent = message;

    commentsFragment.append(comment);
  });
  commentsList.append(commentsFragment);
};

const photoModal = document.querySelector('.big-picture');
const photoModalImage = photoModal.querySelector('img');
const likesCount = photoModal.querySelector('.likes-count');
const commentsCount = photoModal.querySelector('.social__comment-count');
const commentsLoader = photoModal.querySelector('.comments-loader');
const commentsShown = photoModal.querySelector('.social__comment-shown-count');
const commentsTotal = photoModal.querySelector('.social__comment-total-count');
const caption = photoModal.querySelector('.social__caption');
const body = document.querySelector('body');

const getThumbnailById = (id) => {
  id = parseInt(id, 10);
  for (let i = 0; i < thumbnails.length; i++) {
    if (thumbnails[i].id === id) {
      return thumbnails[i];
    }
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

function closePhotoModal () {
  photoModal.classList.add('hidden');
  clearCommentsList();

  document.removeEventListener('keydown', onDocumentKeydown);
  body.classList.remove('modal-open');
}

function openPhotoModal (currentPhoto) {
  photoModal.classList.remove('hidden');
  renderComments(currentPhoto);

  document.addEventListener('keydown', onDocumentKeydown);
}

const onThumbnailClick = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();

    const thumbnailId = evt.target.closest('.picture').dataset.id;
    const currentThumbnail = getThumbnailById(thumbnailId);
    openPhotoModal(currentThumbnail);

    photoModalImage.src = currentThumbnail.url;
    likesCount.textContent = currentThumbnail.likes;

    if (currentThumbnail.comments.length < 5) {
      commentsShown.textContent = currentThumbnail.comments.length;
    } else {
      commentsShown.textContent = 5;
    }

    commentsTotal.textContent = currentThumbnail.comments.length;

    caption.textContent = currentThumbnail.description;

    commentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    body.classList.add('modal-open');
  }
};

const userModalCloseElement = photoModal.querySelector('#picture-cancel');

userModalCloseElement.addEventListener('click', () => {
  closePhotoModal();
});

thumbnailsList.addEventListener('click', onThumbnailClick);
