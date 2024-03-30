import {isEscapeKey, openModalElement, closeModalElement} from './util.js';
import {addValidator, removeValidator} from './validate-form.js';
import {onButtonSmallerClick, onButtonBiggerClick} from './scale-photo.js';
import {onFilterChange, createNoUiSlider, destroyNoUiSlider} from './filter-photo.js';

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
const photo = modalForm.querySelector('.img-upload__preview img');

const onFileDownloadControlChange = () => {
  openModalForm();
};

const onCloseModalButtonClick = () => {
  closeModalForm();
};

const onDocumentKeydown = (evt) => {
  const infoModal = document.querySelector('.error');
  if (isEscapeKey(evt) && !infoModal) {
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

function openModalForm() {
  openModalElement(modalForm);

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

  addValidator();
  createNoUiSlider();

}

function closeModalForm() {
  closeModalElement(modalForm);

  filters.forEach((filter) => {
    filter.removeEventListener('change', onFilterChange);
  });
  formCloseButton.removeEventListener('click', onCloseModalButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  buttonSmaller.removeEventListener('click', onButtonSmallerClick);
  buttonBigger.removeEventListener('click', onButtonBiggerClick);

  sliderContainer.classList.remove('hidden');

  inputHashtag.removeEventListener('focus', onFieldFocus);
  commentField.removeEventListener('focus', onFieldFocus);

  removeValidator();
  destroyNoUiSlider();

  photo.style = '';
  uploadForm.reset();
}

const registerFileDownloadControlEvent = () => {
  fileDownloadControl.addEventListener('change', onFileDownloadControlChange);
};

export {registerFileDownloadControlEvent, openModalForm, closeModalForm};
