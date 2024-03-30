const uploadForm = document.querySelector('.img-upload__form');
const modalForm = uploadForm.querySelector('.img-upload__overlay');
const scaleValue = modalForm.querySelector('.scale__control--value');
const photo = modalForm.querySelector('.img-upload__preview img');

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const STEP_SCALE_VALUE = 25;

const onButtonSmallerClick = () => {
  const currentScaleValue = parseInt(scaleValue.value, 10);
  if (currentScaleValue > MIN_SCALE_VALUE) {
    let newScaleValue = currentScaleValue - STEP_SCALE_VALUE;
    if (newScaleValue < MIN_SCALE_VALUE) {
      newScaleValue = MIN_SCALE_VALUE;
    }
    scaleValue.value = `${newScaleValue}%`;
    photo.style.transform = `scale(0.${newScaleValue})`;
  }
};

const onButtonBiggerClick = () => {
  const currentScaleValue = parseInt(scaleValue.value, 10);
  if (currentScaleValue < MAX_SCALE_VALUE) {
    const newScaleValue = currentScaleValue + STEP_SCALE_VALUE;
    scaleValue.value = `${newScaleValue}%`;
    photo.style.transform = (newScaleValue < MAX_SCALE_VALUE) ? `scale(0.${newScaleValue})` : 'scale(1)';
  }
};

export {onButtonSmallerClick, onButtonBiggerClick};
