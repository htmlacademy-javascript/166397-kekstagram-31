const checkStringLength = (string, value) => {
  const result = string.length <= value;
  return result;
};

checkStringLength('проверяемая строка', 20);

// console.log(checkStringLength('проверяемая строка', 20)); // true
// // Длина строки ровно 18 символов
// console.log(checkStringLength('проверяемая строка', 18)); // true
// // Строка длиннее 10 символов
// console.log(checkStringLength('проверяемая строка', 10)); // false

const checkStringPalindrome = (string) => {
  const formattedString = string.toLowerCase().replaceAll(' ', '');
  let backString = '';
  for (let i = formattedString.length - 1; i >= 0; i--) {
    backString += formattedString[i];
  }

  return formattedString === backString;
};

checkStringPalindrome('Лёша на полке клопа нашёл ');
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
