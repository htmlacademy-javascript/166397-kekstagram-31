import {modalForm, photo} from './const.js';

const scaleValue = modalForm.querySelector('.scale__control--value');
const buttonSmaller = modalForm.querySelector('.scale__control--smaller');
const buttonBigger = modalForm.querySelector('.scale__control--bigger');

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

const initScale = () => {
  buttonSmaller.addEventListener('click', onButtonSmallerClick);
  buttonBigger.addEventListener('click', onButtonBiggerClick);
};

const deleteScale = () => {
  buttonSmaller.removeEventListener('click', onButtonSmallerClick);
  buttonBigger.removeEventListener('click', onButtonBiggerClick);
};

export {initScale, deleteScale};
