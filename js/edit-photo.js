const uploadForm = document.querySelector('.img-upload__form');
const modalForm = uploadForm.querySelector('.img-upload__overlay');
const scaleValue = modalForm.querySelector('.scale__control--value');
const photo = modalForm.querySelector('.img-upload__preview img');
const sliderContainer = modalForm.querySelector('.img-upload__effect-level');
const effectInput = modalForm.querySelector('.effect-level__value');
const slider = modalForm.querySelector('.effect-level__slider');

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const STEP_SCALE_VALUE = 25;

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

const onButtonSmallerClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  if (currentValue > MIN_SCALE_VALUE) {
    let newValue = currentValue - STEP_SCALE_VALUE;
    if (newValue < MIN_SCALE_VALUE) {
      newValue = MIN_SCALE_VALUE;
    }
    scaleValue.value = `${newValue}%`;
    photo.style.transform = `scale(0.${newValue})`;
  }
};

const onButtonBiggerClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  if (currentValue < MAX_SCALE_VALUE) {
    const newValue = currentValue + STEP_SCALE_VALUE;
    scaleValue.value = `${newValue}%`;
    if (newValue < MAX_SCALE_VALUE) {
      photo.style.transform = `scale(0.${newValue})`;
    } else {
      photo.style.transform = 'scale(1)';
    }
  }
};

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

function onFilterChange() {
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

    slider.noUiSlider.off('update');
    slider.noUiSlider.on('update', () => {
      photo.style.filter = FILTERS_VALUE[this.value].FILTER();
      effectInput.value = Number(slider.noUiSlider.get());
    });
  } else {
    sliderContainer.classList.add('hidden');
    photo.style.filter = '';
  }
}

export {onButtonSmallerClick, onButtonBiggerClick, onFilterChange};
