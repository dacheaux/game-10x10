/**
Check if superset array contains a subset array
@param {array} superset
@param {array} subset
@return {boolean}
*/
export function isContainedIn(superset, subset) {
  superset = JSON.stringify(superset);
  subset = JSON.stringify(subset);

  const index = superset.indexOf(subset);
  if (index !== -1) {
    return true;
  }
}

/**
Finds the index of a subset array inside of a superset array
@param {array} haystack - superset array
@param {array} needle - subset array
@return {number}
*/
export function searchForArray(haystack, needle) {
  let i, j, current;
  for (i = 0; i < haystack.length; ++i) {
    if (needle.length === haystack[i].length) {
      current = haystack[i];
      for (j = 0; j < needle.length && needle[j] === current[j]; ++j);
      if (j === needle.length) return i;
    }
  }
  return -1;
}

/**
Unshifts the square from its proper quadrant
@param {number} quadrant
@param {array} square
@return {array} unshifted square
*/
export function unshiftSquare(quadrant, square) {
  const unshiftSquare = JSON.parse(JSON.stringify(square));
  switch (quadrant) {
    case 2:
      unshiftSquare[0] = unshiftSquare[0] - 5;
      return unshiftSquare;
    case 3:
      unshiftSquare[1] = unshiftSquare[1] - 5;
      return unshiftSquare;
    case 4:
      unshiftSquare[0] = unshiftSquare[0] - 5;
      unshiftSquare[1] = unshiftSquare[1] - 5;
      return unshiftSquare;
    default:
      return unshiftSquare;
  }
}

/**
Shifts the square to its proper quadrant
@param {number} quadrant
@param {array} square
@return {array} shifted square
*/
export function shiftSquare(quadrant, square) {
  const shiftSquare = JSON.parse(JSON.stringify(square));
  switch (quadrant) {
    case 2:
      shiftSquare[0] = shiftSquare[0] + 5;
      return shiftSquare;
    case 3:
      shiftSquare[1] = shiftSquare[1] + 5;
      return shiftSquare;
    case 4:
      shiftSquare[0] = shiftSquare[0] + 5;
      shiftSquare[1] = shiftSquare[1] + 5;
      return shiftSquare;
    default:
      return shiftSquare;
  }
}

/**
Shifts all squares from an array of squares to its proper quadrant
@param {number} quadrant
@param {array} arr
@return {array} shifted squares
*/
export function shiftSquares(quadrant, arr) {
  const shiftArr = JSON.parse(JSON.stringify(arr));
  switch (quadrant) {
    case 2:
      return shiftArr.map(s => {
        s[0] = s[0] + 5;
        return s;
      });
    case 3:
      return shiftArr.map(s => {
        s[1] = s[1] + 5;
        return s;
      });
    case 4:
      return shiftArr.map(s => {
        s[0] = s[0] + 5;
        s[1] = s[1] + 5;
        return s;
      });
    default:
      return shiftArr;
  }
}

/**
Checks the current quadrant in which squares are generated
@param {array} square
@return {number} current quadrant
*/
export function currentQuadrant(square) {
  const [x, y] = square;
  if (x <= 5 && y <= 5) return 1;
  if (x > 5 && y <= 5) return 2;
  if (x <= 5 && y > 5) return 3;
  if (x > 5 && y > 5) return 4;
}

/**
Checks if this quadrant can be continued with subsequent squares
@param {number} quadrant
@param {array} quodrantSquares
@return {boolean}
*/
export function isValidQuadrant(quadrant, quodrantSquares) {
  const lastSquare = quodrantSquares[quodrantSquares.length - 1];
  const [x, y] = lastSquare;
  switch (quadrant) {
    case 1:
      if (x < 4 || y < 4) return false;
      return true;
    case 2:
      if (x > 2 || y < 4) return false;
      return true;
    case 3:
      if (x < 4 || y > 2) return false;
      return true;
    case 4:
      if (x > 2 || y > 2) return false;
      return true;
    default:
      return false;
  }
}