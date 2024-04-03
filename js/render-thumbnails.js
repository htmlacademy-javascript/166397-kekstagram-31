import {onThumbnailClick} from './photo-modal.js';

const thumbnailsList = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const thumbnailsFragment = document.createDocumentFragment();

const renderThumbnails = (thumbnails) => {
  const currentThumbnails = thumbnailsList.querySelectorAll('.picture');

  currentThumbnails.forEach((thumbnail) => {
    thumbnail.remove();
  });

  thumbnails.forEach(({id, url, description, likes, comments}) => {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    const thumbnailsImage = thumbnail.querySelector('.picture__img');

    thumbnail.dataset.id = id;
    thumbnailsImage.src = url;
    thumbnailsImage.alt = description;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;

    thumbnailsFragment.append(thumbnail);
  });
  thumbnailsList.append(thumbnailsFragment);
  thumbnailsList.addEventListener('click', onThumbnailClick);
};

export {renderThumbnails};
