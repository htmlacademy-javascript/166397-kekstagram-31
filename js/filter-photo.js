import {modalFormElement, photoElement, sliderElement} from './const.js';

const DEFAULT_SLIDER_MIN = 0;
const DEFAULT_SLIDER_MAX = 100;
const DEFAULT_SLIDER_START = DEFAULT_SLIDER_MAX;
const DEFAULT_SLIDER_STEP = 1;

const FiltersValues = {
  'chrome': {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    FILTER: () => `grayscale(${sliderElement.noUiSlider.get()})`
  },

  'sepia': {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    FILTER: () => `sepia(${sliderElement.noUiSlider.get()})`
  },

  'marvin': {
    MIN: 0,
    MAX: 100,
    STEP: 1,
    FILTER: () => `invert(${sliderElement.noUiSlider.get()}%)`
  },

  'phobos': {
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    FILTER: () => `blur(${sliderElement.noUiSlider.get()}px)`
  },

  'heat': {
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    FILTER: () => `brightness(${sliderElement.noUiSlider.get()})`
  }
};

let currentFilter = 'none';

const sliderContainerElement = modalFormElement.querySelector('.img-upload__effect-level');
const effectInputElement = modalFormElement.querySelector('.effect-level__value');

const filtersElement = modalFormElement.querySelector('.effects__list');

const onFilterChange = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    currentFilter = evt.target.value;
    if (currentFilter !== 'none') {

      sliderContainerElement.classList.remove('hidden');

      sliderElement.noUiSlider.updateOptions({
        range: {
          min: FiltersValues[currentFilter].MIN,
          max: FiltersValues[currentFilter].MAX,
        },
        start: FiltersValues[currentFilter].MAX,
        step: FiltersValues[currentFilter].STEP,
      });
    } else {
      sliderContainerElement.classList.add('hidden');
      photoElement.style.filter = '';
    }
  }
};

const destroyNoUiSlider = () => {
  sliderElement.noUiSlider.destroy();
  filtersElement.removeEventListener('change', onFilterChange);
  sliderContainerElement.classList.remove('hidden');
  currentFilter = 'none';
};

const setNoUiSlider = () => {
  filtersElement.addEventListener('change', onFilterChange);
  sliderContainerElement.classList.add('hidden');
};

const createNoUiSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: DEFAULT_SLIDER_MIN,
      max: DEFAULT_SLIDER_MAX,
    },
    start: DEFAULT_SLIDER_START,
    step: DEFAULT_SLIDER_STEP,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
      from: (value) => parseFloat(value),
    }
  });

  sliderElement.noUiSlider.on('update', () => {
    photoElement.style.filter = FiltersValues[currentFilter]?.FILTER();
    effectInputElement.value = Number(sliderElement.noUiSlider.get());
  });
  setNoUiSlider();
};

export {onFilterChange, createNoUiSlider, destroyNoUiSlider};
