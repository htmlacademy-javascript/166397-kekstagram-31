import {getRandomArrayElements, debounce} from './util.js';
import {renderThumbnails} from './render-thumbnails.js';

const filtersButtons = document.querySelector('.img-filters');
const RERENDER_DELAY = 500;
const SLICE_PHOTOS_COUNT = 10;

const debounceRender = debounce(renderThumbnails, RERENDER_DELAY);

const comparePhotos = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const showFilters = () => {
  filtersButtons.classList.remove('img-filters--inactive');
};

const setFiltersClick = (photos) => {
  showFilters();

  filtersButtons.addEventListener('click', (evt) => {
    if (evt.target.matches('.img-filters__button')) {
      let photosFlter;
      const currentActive = document.querySelector('.img-filters__button--active');
      const currentButton = evt.target.id;

      currentActive.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');

      if (evt.target === currentActive) {
        return;
      }

      switch (currentButton) {
        case 'filter-default':
          photosFlter = photos;
          break;
        case 'filter-random':
          photosFlter = getRandomArrayElements(photos, SLICE_PHOTOS_COUNT);
          break;
        case 'filter-discussed':
          photosFlter = photos.slice().sort(comparePhotos);
          break;
      }
      debounceRender(photosFlter);
    }
  });
};

export {setFiltersClick};
