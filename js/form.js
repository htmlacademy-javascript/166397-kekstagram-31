import {isEscapeKey, openModalElement, closeModalElement} from './util.js';
import {onFormSubmit} from './validate-form.js';
import {onButtonSmallerClick, onButtonBiggerClick, onFilterChange} from './edit-photo.js';

const uploadForm = document.querySelector('.img-upload__form');
const modalForm = uploadForm.querySelector('.img-upload__overlay');
const fileDownloadControl = uploadForm.querySelector('.img-upload__input');
const formCloseButton = modalForm.querySelector('.img-upload__cancel');
const inputHashtag = modalForm.querySelector('.text__hashtags');
const commentField = modalForm.querySelector('.text__description');
const buttonSmaller = modalForm.querySelector('.scale__control--smaller');
const buttonBigger = modalForm.querySelector('.scale__control--bigger');
const sliderContainer = modalForm.querySelector('.img-upload__effect-level');
const filters = modalForm.querySelectorAll('[name="effect"]');
const scaleValue = modalForm.querySelector('.scale__control--value');
const photo = modalForm.querySelector('.img-upload__preview img');

const onFileDownloadControlChange = () => {
  openModalForm();
};

const onCloseModalButtonClick = () => {
  closeModalForm();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalForm();
  }
};

const onFieldKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onFieldFocus = (evt) => {
  evt.target.addEventListener('keydown', onFieldKeydown);
};

const resetScale = () => {
  scaleValue.value = '100%';
  photo.style = '';
};

function openModalForm() {
  openModalElement(modalForm);

  uploadForm.addEventListener('submit', onFormSubmit);
  filters.forEach((filter) => {
    filter.addEventListener('change', onFilterChange);
  });
  formCloseButton.addEventListener('click', onCloseModalButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  buttonSmaller.addEventListener('click', onButtonSmallerClick);
  buttonBigger.addEventListener('click', onButtonBiggerClick);

  sliderContainer.classList.add('hidden');

  inputHashtag.addEventListener('focus', onFieldFocus);
  commentField.addEventListener('focus', onFieldFocus);
}

function closeModalForm() {
  closeModalElement(modalForm);

  uploadForm.removeEventListener('submit', onFormSubmit);
  filters.forEach((filter) => {
    filter.removeEventListener('change', onFilterChange);
  });
  formCloseButton.removeEventListener('click', onCloseModalButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  buttonSmaller.removeEventListener('click', onButtonSmallerClick);
  buttonBigger.removeEventListener('click', onButtonBiggerClick);

  sliderContainer.classList.remove('hidden');

  fileDownloadControl.value = '';
  resetScale();

  inputHashtag.removeEventListener('focus', onFieldFocus);
  commentField.removeEventListener('focus', onFieldFocus);
}

const registerFileDownloadControlEvent = () => {
  fileDownloadControl.addEventListener('change', onFileDownloadControlChange);
};

export {registerFileDownloadControlEvent};
