import {createPhotos} from './create-photos.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictures = createPhotos();
const picturesFragment = document.createDocumentFragment();

pictures.forEach(({url, description, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);
  const pictureImage = picture.querySelector('.picture__img');

  pictureImage.src = url;
  pictureImage.alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  picturesFragment.append(picture);
});

picturesList.append(picturesFragment);
