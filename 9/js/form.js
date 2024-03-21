import {body} from './photo-modal.js';
import {isEscapeKey} from './util.js';

const downloadForm = document.querySelector('.img-upload__form');
const modalForm = downloadForm.querySelector('.img-upload__overlay');
const fileDownloadControl = downloadForm.querySelector('.img-upload__input');
const formCloseButton = modalForm.querySelector('.img-upload__cancel');
const fields = modalForm.querySelectorAll('.img-upload__field-wrapper > *');
const inputHashtag = modalForm.querySelector('.text__hashtags');
const commentField = modalForm.querySelector('.text__description');
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

const ERROR_HASHTAG_MESSAGES = [
  'введён невалидный хэштег',
  'хэштеги повторяются',
  'превышено количество хэштегов'
];

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
  modalForm.classList.remove('hidden');
  body.classList.add('modal-open');

  downloadForm.addEventListener('submit', onFormSubmit);
  formCloseButton.addEventListener('click', onCloseModalButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  fields.forEach((field) => {
    field.addEventListener('focus', onFieldFocus);
  });
}

function closeModalForm() {
  modalForm.classList.add('hidden');
  body.classList.remove('modal-open');

  downloadForm.removeEventListener('submit', onFormSubmit);
  formCloseButton.removeEventListener('click', onCloseModalButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);

  fileDownloadControl.value = '';

  fields.forEach((field) => {
    field.removeEventListener('focus', onFieldFocus);
  });
}

const pristine = new Pristine(downloadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

function onFormSubmit(evt) {
  evt.preventDefault();
  pristine.validate();
}

const checkArrayOfHashtags = (hashtagsArray) => hashtagsArray.every((hashtag) => hashtagRegExp.test(hashtag));

const checkUniqueHashtags = (hashtagsArray) => hashtagsArray.every((element, index, array) => array.indexOf(element) === index);

const checkHashtagsLength = (hashtagsArray) => hashtagsArray.length <= MAX_HASHTAG_COUNT;

const validateHashtag = () => {
  const hashtags = inputHashtag.value.trim().split(' ');

  const isArrayOfHashtags = checkArrayOfHashtags(hashtags);
  const isUniqueHashtags = checkUniqueHashtags(hashtags);
  const isAllowableLength = checkHashtagsLength(hashtags);

  return (isArrayOfHashtags && isUniqueHashtags && isAllowableLength) || !inputHashtag.value;
};

const getErrorMessage = () => {
  const hashtags = inputHashtag.value.trim().split(' ');

  const isArrayOfHashtags = checkArrayOfHashtags(hashtags);
  const isUniqueHashtags = checkUniqueHashtags(hashtags);
  const isAllowableLength = checkHashtagsLength(hashtags);

  if (!isArrayOfHashtags && inputHashtag.value) {
    return ERROR_HASHTAG_MESSAGES[0];
  }
  if (!isUniqueHashtags) {
    return ERROR_HASHTAG_MESSAGES[1];
  }
  if (!isAllowableLength) {
    return ERROR_HASHTAG_MESSAGES[2];
  }
};

pristine.addValidator(inputHashtag, validateHashtag, getErrorMessage);

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(commentField, validateComment, 'длина комментария больше 140 символов');

fileDownloadControl.addEventListener('change', onFileDownloadControlChange);
