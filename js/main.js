import {renderThumbnails} from './render-thumbnails.js';
import {registerFileDownloadControlEvent, closeModalForm} from './form.js';
import {setUserFormSubmit} from './validate-form.js';
import {getData} from './api.js';
import {showAlertGet, getRandomArrayElements, debounce, setFiltersClick} from './util.js';
import {saveThumbnails} from './photo-modal.js';

const filters = document.querySelector('.img-filters');
const RERENDER_DELAY = 500;
const SLICE_PHOTOS_COUNT = 10;

const comparePhotos = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

getData().then((photos) => {
  saveThumbnails(photos);
  renderThumbnails(photos);

  filters.classList.remove('img-filters--inactive');
  let editPhotosArray;

  const filtersItems = filters.querySelectorAll('.img-filters__button');

  for (const filtersItem of filtersItems) {
    filtersItem.addEventListener('click', (evt) => {
      const currentActive = document.querySelector('.img-filters__button--active');

      currentActive.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');

      if (evt.target.matches('#filter-default')) {
        editPhotosArray = photos;
      }
      if (evt.target.matches('#filter-random')) {
        editPhotosArray = getRandomArrayElements(photos, SLICE_PHOTOS_COUNT);
      }
      if (evt.target.matches('#filter-discussed')) {
        editPhotosArray = photos.slice().sort(comparePhotos);
      }
    });
  }

  setFiltersClick(debounce(() => renderThumbnails(editPhotosArray), RERENDER_DELAY));
}).catch(() => {
  showAlertGet();
});

registerFileDownloadControlEvent();
setUserFormSubmit(closeModalForm);


