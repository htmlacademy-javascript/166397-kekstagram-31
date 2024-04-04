const body = document.querySelector('body');
const errorSendTemplate = document.querySelector('#error').content.querySelector('.error');
const errorSendFragment = document.createDocumentFragment();
const errorToastTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorGetFragment = document.createDocumentFragment();
const successGetTemplate = document.querySelector('#success').content.querySelector('.success');
const successGetFragment = document.createDocumentFragment();
const ALERT_GET_SHOWTIME = 5000;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomArrayElements = (array, count) => {
  if (array.length < count) {
    count = array.length;
  }
  const previousValues = [];

  while (previousValues.length < count) {
    let currentValue = getRandomArrayElement(array);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomArrayElement(array);
    }
    previousValues.push(currentValue);
  }
  return previousValues;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const openModalElement = (modalElement) => {
  modalElement.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeModalElement = (modalElement) => {
  modalElement.classList.add('hidden');
  body.classList.remove('modal-open');
};

const showAlertSend = () => {
  const error = errorSendTemplate.cloneNode(true);

  errorSendFragment.append(error);
  body.append(errorSendFragment);
};

const showToastAlert = (message) => {
  const error = errorToastTemplate.cloneNode(true);

  if (message) {
    error.querySelector('.data-error__title').textContent = message;
  }
  errorGetFragment.append(error);
  body.append(error);

  setTimeout(() => {
    error.remove();
  }, ALERT_GET_SHOWTIME);
};

const showAlertGet = () => {
  showToastAlert();
};

const showSuccessSend = () => {
  const success = successGetTemplate.cloneNode(true);

  successGetFragment.append(success);
  body.append(success);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscapeKey, openModalElement, closeModalElement, showAlertSend, showAlertGet, showSuccessSend, getRandomArrayElements, debounce, showToastAlert};
