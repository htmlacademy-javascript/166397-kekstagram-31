const checkStringLength = (string, value) => string.length <= value;

checkStringLength('проверяемая строка', 20);

// console.log(checkStringLength('проверяемая строка', 20)); // true
// // Длина строки ровно 18 символов
// console.log(checkStringLength('проверяемая строка', 18)); // true
// // Строка длиннее 10 символов
// console.log(checkStringLength('проверяемая строка', 10)); // false

const isPalindrome = (string) => {
  const formattedString = string.toLowerCase().replaceAll(' ', '');
  let reverseString = '';
  for (let i = formattedString.length - 1; i >= 0; i--) {
    reverseString += formattedString[i];
  }

  return formattedString === reverseString;
};

isPalindrome('Лёша на полке клопа нашёл ');
// console.log(checkStringPalindrome('Лёша на полке клопа нашёл '));

const getNumber = (value) => {
  value += '';

  let number = '';
  for (let i = 0; i < value.length; i++) {
    if(!Number.isNaN(parseInt(value[i], 10))) {
      number += value[i];
    }
  }

  return(parseInt(number, 10));
};

getNumber('2023 год');
// console.log(getNumber('2023 год'));
// console.log(getNumber('ECMAScript 2022'));
// console.log(getNumber('1 кефир, 0.5 батона'));
// console.log(getNumber('агент 007'));
// console.log(getNumber('а я томат'));
// console.log(getNumber(2023));
// console.log(getNumber(-1));
// console.log(getNumber(1.5));

const convertsTimeToMinutes = (time) => {
  const splitTime = time.split(':');
  const formattedTime = splitTime.map((unit) => getNumber(unit));
  return formattedTime[0] * 60 + formattedTime[1];
};

const checkMeetingTime = (workBeginingTime, workEndTime, meetingBeginingTime, meetingDuration) => {
  const workBeginingTimeInMinutes = convertsTimeToMinutes(workBeginingTime);
  const workEndTimeInMinutes = convertsTimeToMinutes(workEndTime);
  const meetingBeginingTimeInMinutes = convertsTimeToMinutes(meetingBeginingTime);

  return !(meetingBeginingTimeInMinutes < workBeginingTimeInMinutes || workEndTimeInMinutes < (meetingBeginingTimeInMinutes + meetingDuration));
};

// eslint-disable-next-line no-console
console.log(checkMeetingTime('08:00', '17:30', '14:00', 90));
// eslint-disable-next-line no-console
console.log(checkMeetingTime('8:0', '10:0', '8:0', 120));
// eslint-disable-next-line no-console
console.log(checkMeetingTime('08:00', '14:30', '14:00', 90));
// eslint-disable-next-line no-console
console.log(checkMeetingTime('14:00', '17:30', '08:0', 90));
// eslint-disable-next-line no-console
console.log(checkMeetingTime('8:00', '17:30', '08:00', 900));
