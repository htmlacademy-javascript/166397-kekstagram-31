import {getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator} from './util.js';

const DESCRIPTIONS = [
  'Фото на фоне океана',
  'Семейная фотография',
  'Мой кот',
  'Я завтракаю',
  'Отправляюсь в путешествие'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артём',
  'Сергей',
  'Дарья',
  'Джорджия',
  'Бэт',
  'Кекс'
];

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
