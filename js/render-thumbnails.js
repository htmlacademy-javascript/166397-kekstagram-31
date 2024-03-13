import {createPhotos} from './create-photos.js';

const thumbnailsList = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const thumbnails = createPhotos();
const thumbnailsFragment = document.createDocumentFragment();

const renderThumbnails = (callback) => {
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
  callback();
};

export {renderThumbnails, thumbnailsList, thumbnails};
