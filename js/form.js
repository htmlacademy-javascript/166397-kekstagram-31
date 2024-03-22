import {isEscapeKey, openModalElement, closeModalElement} from './util.js';
import {onFormSubmit} from './validate-form.js';

const downloadForm = document.querySelector('.img-upload__form');
const modalForm = downloadForm.querySelector('.img-upload__overlay');
const fileDownloadControl = downloadForm.querySelector('.img-upload__input');
const formCloseButton = modalForm.querySelector('.img-upload__cancel');
const inputHashtag = modalForm.querySelector('.text__hashtags');
const commentField = modalForm.querySelector('.text__description');


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

function openModalForm() {
  openModalElement(modalForm);

  downloadForm.addEventListener('submit', onFormSubmit);
  formCloseButton.addEventListener('click', onCloseModalButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  inputHashtag.addEventListener('focus', onFieldFocus);
  commentField.addEventListener('focus', onFieldFocus);
}

function closeModalForm() {
  closeModalElement(modalForm);

  downloadForm.removeEventListener('submit', onFormSubmit);
  formCloseButton.removeEventListener('click', onCloseModalButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);

  fileDownloadControl.value = '';

  inputHashtag.removeEventListener('focus', onFieldFocus);
  commentField.removeEventListener('focus', onFieldFocus);
}

const registerFileDownloadControlEvent = () => {
  fileDownloadControl.addEventListener('change', onFileDownloadControlChange);
};

export {registerFileDownloadControlEvent};
