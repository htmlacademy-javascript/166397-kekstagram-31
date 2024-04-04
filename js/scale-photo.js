import {modalFormElement, photoElement} from './const.js';

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const STEP_SCALE_VALUE = 25;

const scaleValueElement = modalFormElement.querySelector('.scale__control--value');
const buttonSmallerElement = modalFormElement.querySelector('.scale__control--smaller');
const buttonBiggerElement = modalFormElement.querySelector('.scale__control--bigger');

const onButtonSmallerClick = () => {
  const currentScaleValue = parseInt(scaleValueElement.value, 10);
  if (currentScaleValue > MIN_SCALE_VALUE) {
    let newScaleValue = currentScaleValue - STEP_SCALE_VALUE;
    if (newScaleValue < MIN_SCALE_VALUE) {
      newScaleValue = MIN_SCALE_VALUE;
    }
    scaleValueElement.value = `${newScaleValue}%`;
    photoElement.style.transform = `scale(0.${newScaleValue})`;
  }
};

const onButtonBiggerClick = () => {
  const currentScaleValue = parseInt(scaleValueElement.value, 10);
  if (currentScaleValue < MAX_SCALE_VALUE) {
    const newScaleValue = currentScaleValue + STEP_SCALE_VALUE;
    scaleValueElement.value = `${newScaleValue}%`;
    photoElement.style.transform = (newScaleValue < MAX_SCALE_VALUE) ? `scale(0.${newScaleValue})` : 'scale(1)';
  }
};

const initScale = () => {
  buttonSmallerElement.addEventListener('click', onButtonSmallerClick);
  buttonBiggerElement.addEventListener('click', onButtonBiggerClick);
};

const deleteScale = () => {
  buttonSmallerElement.removeEventListener('click', onButtonSmallerClick);
  buttonBiggerElement.removeEventListener('click', onButtonBiggerClick);
};

export {initScale, deleteScale};
