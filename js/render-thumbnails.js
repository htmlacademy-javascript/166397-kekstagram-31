import {onThumbnailClick} from './photo-modal.js';

const thumbnailsListElement = document.querySelector('.pictures');
const thumbnailTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const thumbnailsFragment = document.createDocumentFragment();

const removeThumbnails = () => {
  const currentThumbnailsElements = thumbnailsListElement.querySelectorAll('.picture');

  currentThumbnailsElements.forEach((thumbnail) => {
    thumbnail.remove();
  });
};

const renderThumbnails = (thumbnails) => {
  removeThumbnails();

  thumbnails.forEach(({id, url, description, likes, comments}) => {
    const thumbnailElement = thumbnailTemplateElement.cloneNode(true);
    const thumbnailImageElement = thumbnailElement.querySelector('.picture__img');

    thumbnailElement.dataset.id = id;
    thumbnailImageElement.src = url;
    thumbnailImageElement.alt = description;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;

    thumbnailsFragment.append(thumbnailElement);
  });
  thumbnailsListElement.append(thumbnailsFragment);
  thumbnailsListElement.addEventListener('click', onThumbnailClick);
};

export {renderThumbnails};
