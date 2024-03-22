const downloadForm = document.querySelector('.img-upload__form');
const modalForm = downloadForm.querySelector('.img-upload__overlay');
const inputHashtag = modalForm.querySelector('.text__hashtags');
const commentField = modalForm.querySelector('.text__description');
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

const ERROR_HASHTAG_MESSAGES = {
  INVALID_HASHTAG: 'введён невалидный хэштег',
  HASHTAG_REPEAT: 'хэштеги повторяются',
  HASHTAG_NUMBER_EXCEEDED: 'превышено количество хэштегов'
};

const ERROR_COMMENT_MESSAGE = 'длина комментария больше 140 символов';

const pristine = new Pristine(downloadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const checkArrayOfHashtags = (hashtagsArray) => hashtagsArray.every((hashtag) => hashtagRegExp.test(hashtag));

const checkUniqueHashtags = (hashtagsArray) => hashtagsArray.every((element, index, array) => array.indexOf(element) === index);

const checkHashtagsLength = (hashtagsArray) => hashtagsArray.length <= MAX_HASHTAG_COUNT;

const convertsHashtagsToArray = () => inputHashtag.value.trim().toLowerCase().replace(/  +/g, ' ').split(' ');

const validateHashtag = () => {
  const hashtags = convertsHashtagsToArray();

  const isArrayOfHashtags = checkArrayOfHashtags(hashtags);
  const isUniqueHashtags = checkUniqueHashtags(hashtags);
  const isAllowableLength = checkHashtagsLength(hashtags);

  return (isArrayOfHashtags && isUniqueHashtags && isAllowableLength) || !inputHashtag.value;
};

const getErrorMessage = () => {
  const hashtags = convertsHashtagsToArray();

  const isArrayOfHashtags = checkArrayOfHashtags(hashtags);
  const isUniqueHashtags = checkUniqueHashtags(hashtags);
  const isAllowableLength = checkHashtagsLength(hashtags);

  if (!isAllowableLength) {
    return ERROR_HASHTAG_MESSAGES.HASHTAG_NUMBER_EXCEEDED;
  }
  if (!isArrayOfHashtags && inputHashtag.value) {
    return ERROR_HASHTAG_MESSAGES.INVALID_HASHTAG;
  }
  if (!isUniqueHashtags) {
    return ERROR_HASHTAG_MESSAGES.HASHTAG_REPEAT;
  }
};

pristine.addValidator(inputHashtag, validateHashtag, getErrorMessage);

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(commentField, validateComment, ERROR_COMMENT_MESSAGE);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

export {onFormSubmit};
