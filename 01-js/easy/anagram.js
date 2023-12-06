/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if(str1.length !== str2.length) {
    return false;
  }
  const freqCounterStr1 = {};
  const freqCounterStr2 = {};

  [...str1].forEach((c) => {
    freqCounterStr1[c.toLowerCase()] = (freqCounterStr1[c.toLowerCase()] || 0) + 1;
  });

  [...str2].forEach((c) => {
    freqCounterStr2[c.toLowerCase()] = (freqCounterStr2[c.toLowerCase()] || 0) + 1;
  });

  for (const key in freqCounterStr1) {
    if (freqCounterStr1[key] != freqCounterStr2[key]) {
      return false;
    }
  }
  return true;
}

module.exports = isAnagram;
