const uploadForm = document.querySelector('.img-upload__form');
const modalForm = uploadForm.querySelector('.img-upload__overlay');
const photo = modalForm.querySelector('.img-upload__preview img');
const sliderContainer = modalForm.querySelector('.img-upload__effect-level');
const effectInput = modalForm.querySelector('.effect-level__value');
const slider = modalForm.querySelector('.effect-level__slider');

const DEFAULT_SLIDER_MIN = 0;
const DEFAULT_SLIDER_MAX = 100;
const DEFAULT_SLIDER_START = DEFAULT_SLIDER_MAX;
const DEFAULT_SLIDER_STEP = 1;

const FILTERS_VALUE = {
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
};

const destroyNoUiSlider = () => {
  slider.noUiSlider.destroy();
};

function onFilterChange() {
  slider.noUiSlider.off('update');
  if (this.value !== 'none') {
    sliderContainer.classList.remove('hidden');

    slider.noUiSlider.updateOptions({
      range: {
        min: FILTERS_VALUE[this.value].MIN,
        max: FILTERS_VALUE[this.value].MAX,
      },
      start: FILTERS_VALUE[this.value].MAX,
      step: FILTERS_VALUE[this.value].STEP,
    });

    slider.noUiSlider.on('update', () => {
      photo.style.filter = FILTERS_VALUE[this.value].FILTER();
      effectInput.value = Number(slider.noUiSlider.get());
    });
  } else {
    sliderContainer.classList.add('hidden');
    photo.style.filter = '';
  }
}

export {onFilterChange, createNoUiSlider, destroyNoUiSlider};
