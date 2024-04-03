import {modalForm, photo} from './const.js';

const sliderContainer = modalForm.querySelector('.img-upload__effect-level');
const effectInput = modalForm.querySelector('.effect-level__value');
const slider = modalForm.querySelector('.effect-level__slider');
const filters = modalForm.querySelector('.effects__list');

const DEFAULT_SLIDER_MIN = 0;
const DEFAULT_SLIDER_MAX = 100;
const DEFAULT_SLIDER_START = DEFAULT_SLIDER_MAX;
const DEFAULT_SLIDER_STEP = 1;
let currentFilter = 'none';

const FiltersValues = {
  'chrome': {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    FILTER: () => `grayscale(${slider.noUiSlider.get()})`
  },

  'sepia': {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    FILTER: () => `sepia(${slider.noUiSlider.get()})`
  },

  'marvin': {
    MIN: 0,
    MAX: 100,
    STEP: 1,
    FILTER: () => `invert(${slider.noUiSlider.get()}%)`
  },

  'phobos': {
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    FILTER: () => `blur(${slider.noUiSlider.get()}px)`
  },

  'heat': {
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    FILTER: () => `brightness(${slider.noUiSlider.get()})`
  }
};

const onFilterChange = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    currentFilter = evt.target.value;
    if (currentFilter !== 'none') {

      sliderContainer.classList.remove('hidden');

      slider.noUiSlider.updateOptions({
        range: {
          min: FiltersValues[currentFilter].MIN,
          max: FiltersValues[currentFilter].MAX,
        },
        start: FiltersValues[currentFilter].MAX,
        step: FiltersValues[currentFilter].STEP,
      });
    } else {
      sliderContainer.classList.add('hidden');
      photo.style.filter = '';
    }
  }
};

const destroyNoUiSlider = () => {
  slider.noUiSlider.destroy();
  filters.removeEventListener('change', onFilterChange);
  sliderContainer.classList.remove('hidden');
};

const setNoUiSlider = () => {
  filters.addEventListener('change', onFilterChange);
  sliderContainer.classList.add('hidden');
};

const createNoUiSlider = () => {
  noUiSlider.create(slider, {
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

  slider.noUiSlider.on('update', () => {
    photo.style.filter = FiltersValues[currentFilter]?.FILTER();
    effectInput.value = Number(slider.noUiSlider.get());
  });
  setNoUiSlider();
};


export {onFilterChange, createNoUiSlider, destroyNoUiSlider};
