/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    // Your code here
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const vowelMap = {};
    let ans = 0;
    [...str].forEach(element => {
      if(vowels.includes(element.toLowerCase())) {
        vowelMap[element] = (vowelMap[element] || 0) + 1;
      }
    });
    
    for (const i in vowelMap) {
      ans = ans + vowelMap[i];
    }
    return ans;
}

module.exports = countVowels;