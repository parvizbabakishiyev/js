/**
 * @param {string} s
 * @return {number}
 */
const romanToInt = function (s) {
  const letters = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  const substractGroups = { IV: 4, IX: 9, XL: 40, XC: 90, CD: 400, CM: 900 };
  let sum = 0;

  // check type of input parameter
  if (typeof s !== 'string') {
    console.log('ERROR: Input parameter should be a string');
    return;
  }
  // check length of input
  if (!(s.length >= 1 && s.length <= 15)) {
    console.log('ERROR: Length of input string should be between 1 and 15');
    return;
  }

  // check if letters are valid in input
  const regexValidity = new RegExp('[^IVXLCDM]');
  if (regexValidity.test(s)) {
    console.log(
      `ERROR: Input string should contain only letters 'I', 'V', 'X', 'L', 'C', 'D', 'M'`
    );
    return;
  }

  // check repetition
  const regexRepetition = new RegExp(
    '(I{4,}|V{2,}|X{4,}|L{2,}|C{4,}|D{2,}|M{4,})',
    'g'
  );
  if (regexRepetition.test(s)) {
    console.log(
      `ERROR: Letters repeated more than necessary: ${s.match(regexRepetition)}`
    );
    return;
  }

  // conversion
  let isGroupFound = false;
  for (let i = 0; i < s.length; i++) {
    // check if substract group found in the previous iteration
    if (isGroupFound) {
      isGroupFound = false;
      continue;
    }

    const letter = s[i];
    const letterNext = s[i + 1];
    const letterNextNext = s[i + 2];
    const letterValue = letters[letter];
    const letterValueNext = letters[letterNext];
    const letterValueNextNext = letters[letterNextNext];
    const substractGroup = letter.concat(letterNext);
    const substractGroupValue = substractGroups[substractGroup];

    // check if two neighbouring letters are making a substraction group
    if (substractGroupValue) {
      // check if the next letter after substract group is in order
      if (substractGroupValue < letterValueNextNext) {
        console.log(
          `Letter order is not correct, ${letterNextNext} can't be after ${substractGroup}`
        );
        return;
      }
      sum += substractGroups[substractGroup];
      // set it true to skip the next iteration
      isGroupFound = true;
    } else if (letterValue < letterValueNext) {
      // check if the next letter is in order
      console.log(
        `Letter order is not correct, ${letterNext} can't be after ${letter}`
      );
      return;
    } else {
      sum += letterValue;
    }
  }
  return sum;
};
