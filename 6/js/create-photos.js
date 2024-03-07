import {getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator} from './util.js';
import {getData} from './data.js';

const MIN_ID_PHOTO = 1;
const MAX_ID_PHOTO = 25;
const MIN_NUMBER_PHOTO = 1;
const MAX_NUMBER_PHOTO = 25;
const MIN_COUNT_LIKES = 15;
const MAX_COUNT_LIKES = 200;
const MIN_COUNT_COMMENTS = 0;
const MAX_COUNT_COMMENTS = 30;
const MIN_ID_COMMENT = 1;
const MAX_ID_COMMENT = 999;
const MIN_NUMBER_AVATAR = 1;
const MAX_NUMBER_AVATAR = 6;
const PHOTOS_COUNT = 25;

const generatePhotoId = createRandomIdFromRangeGenerator(MIN_ID_PHOTO, MAX_ID_PHOTO);
const generatePhotoNumber = createRandomIdFromRangeGenerator(MIN_NUMBER_PHOTO, MAX_NUMBER_PHOTO);
const generateCommentId = createRandomIdFromRangeGenerator(MIN_ID_COMMENT, MAX_ID_COMMENT);

const {DESCRIPTIONS, MESSAGES, NAMES} = getData();

const createComments = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${ getRandomInteger(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${ generatePhotoNumber() }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
  comments: Array.from({length: getRandomInteger(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS)}, createComments)
});

const createPhotos = () => Array.from({length: PHOTOS_COUNT}, createPhoto);

export {createPhotos};
