/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  if (str.length <= 1) {
    return true;
  }

  const filteredString = str.replace(/[^a-zA-Z]/g, '');
  const mid = filteredString.length/2;

  for (let index = 0; index <= mid; index++) {
    const elementFromBeginning = filteredString[index];
    const elementFromEnd = filteredString[filteredString.length - index - 1];

    if (elementFromBeginning.toLowerCase() !== elementFromEnd.toLowerCase()) {
      return false;
    }
  }

  return true;
}

module.exports = isPalindrome;
