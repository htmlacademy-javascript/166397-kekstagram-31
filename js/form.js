import {isEscapeKey, openModalElement, closeModalElement, showToastAlert, showAlertSend, showSuccessSend} from './util.js';
import {addValidator, removeValidator, isFormValidate, setEventsOnInfoModal} from './validate-form.js';
import {initScale, deleteScale} from './scale-photo.js';
import {createNoUiSlider, destroyNoUiSlider} from './filter-photo.js';
import {sendData} from './api.js';
import {uploadForm, modalForm, photo} from './const.js';

const fileUploadControl = uploadForm.querySelector('.img-upload__input');
const formCloseButton = modalForm.querySelector('.img-upload__cancel');
const inputHashtag = modalForm.querySelector('.text__hashtags');
const commentField = modalForm.querySelector('.text__description');
const effectsPreviews = modalForm.querySelectorAll('.effects__preview');
const submitButton = modalForm.querySelector('#upload-submit');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

const onFileUploadControlChange = () => {
  const file = fileUploadControl.files[0];
  const fileType = file.type;

  const matches = FILE_TYPES.some((type) => fileType.endsWith(type));

  if (matches) {
    openModalForm();
    const fileURL = URL.createObjectURL(file);
    photo.src = fileURL;
    effectsPreviews.forEach((effectsPreview) => {
      effectsPreview.style.backgroundImage = `url(${fileURL})`;
    });
  } else {
    fileUploadControl.value = '';
    showToastAlert('Неверный формат изображения');
  }
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

const resetFormData = () => {
  photo.style = '';
  photo.src = 'img/upload-default-image.jpg';
  effectsPreviews.forEach((effectsPreview) => {
    effectsPreview.style.backgroundImage = '';
  });
  uploadForm.reset();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  let resultSubmit;

  const isValidate = isFormValidate();
  if (isValidate) {
    resultSubmit = 'success';
    blockSubmitButton();
    sendData(new FormData(evt.target)).then(() => {
      closeModalForm();
      showSuccessSend();
    })
      .catch(() => {
        showAlertSend();
        resultSubmit = 'error';
      })
      .finally(() => {
        unblockSubmitButton();
        setEventsOnInfoModal(resultSubmit);
      });
  }
};

const setUserFormSubmit = () => {
  uploadForm.addEventListener('submit', onFormSubmit);
};

const removeSetUserFormSubmit = () => {
  uploadForm.removeEventListener('submit', onFormSubmit);
};

function openModalForm() {
  openModalElement(modalForm);

  formCloseButton.addEventListener('click', onCloseModalButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  inputHashtag.addEventListener('focus', onFieldFocus);
  commentField.addEventListener('focus', onFieldFocus);

  initScale();
  addValidator();
  createNoUiSlider();
  setUserFormSubmit();
}

function closeModalForm() {
  closeModalElement(modalForm);

  formCloseButton.removeEventListener('click', onCloseModalButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);

  inputHashtag.removeEventListener('focus', onFieldFocus);
  commentField.removeEventListener('focus', onFieldFocus);

  deleteScale();
  removeValidator();
  destroyNoUiSlider();

  resetFormData();
  removeSetUserFormSubmit();
}

const setFileUploadControlEvent = () => {
  fileUploadControl.addEventListener('change', onFileUploadControlChange);
};

export {setFileUploadControlEvent, closeModalForm};
