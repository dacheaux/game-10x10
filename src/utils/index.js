export function fillArrayWithIndex(num) {
  return ('' + Array(num)).split(',').map(
    function() {
      return this[0]++;
    },
    [0]
  );
}

export function fetchPlayer(playerName) {
  let player = JSON.parse(localStorage.getItem('player-game-10x10'));
  let players = JSON.parse(localStorage.getItem('players-game-10x10')) || [];
  const noPlayer = !Boolean(player);
  const newPlayer = {
    level: 1,
    lives: 0,
    scores: {}
  };
  if (noPlayer) {
    player = newPlayer;
    player.name = 'anonPlayer';
    players.push(player);
  } else if (player.name !== playerName) {
    player = players.filter(player => player.name === playerName)[0];
    if (!player) {
      player = newPlayer;
      player.name = playerName;
      players.push(player);
    }
  }
  localStorage.setItem('player-game-10x10', JSON.stringify(player));
  localStorage.setItem('players-game-10x10', JSON.stringify(players));
  return { player, players };
}

export function isContainedIn(superset, subset) {
  superset = JSON.stringify(superset);
  subset = JSON.stringify(subset);

  const index = superset.indexOf(subset);
  if (index !== -1) {
    return true;
  }
}

/**

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

export function unshiftSquare(quadrant, square) {
  const sq = JSON.parse(JSON.stringify(square));
  switch (quadrant) {
    case 2:
      sq[0] = sq[0] - 5;
      return sq;
    case 3:
      sq[1] = sq[1] - 5;
      return sq;
    case 4:
      sq[0] = sq[0] - 5;
      sq[1] = sq[1] - 5;
      return sq;
    default:
      return sq;
  }
}

export function shiftSquare(quadrant, square) {
  const shiftSq = JSON.parse(JSON.stringify(square));
  switch (quadrant) {
    case 2:
      shiftSq[0] = shiftSq[0] + 5;
      return shiftSq;
    case 3:
      shiftSq[1] = shiftSq[1] + 5;
      return shiftSq;
    case 4:
      shiftSq[0] = shiftSq[0] + 5;
      shiftSq[1] = shiftSq[1] + 5;
      return shiftSq;
    default:
      return shiftSq;
  }
}

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

export function currentQuadrant(square) {
  const [x, y] = square;
  if (x <= 5 && y <= 5) return 1;
  if (x > 5 && y <= 5) return 2;
  if (x <= 5 && y > 5) return 3;
  if (x > 5 && y > 5) return 4;
}

export function addSquareToLevel(
  nextSquare,
  current,
  levelSquares,
  levelSquaresWithOpts,
  quadrant
) {
  let random = 0,
    currentOpts = [];
  if (!nextSquare) {
    levelSquares.pop();
    while (!levelSquaresWithOpts[levelSquaresWithOpts.length - 1].length) {
      levelSquaresWithOpts.pop();
      levelSquares.pop();
    }
    currentOpts = levelSquaresWithOpts[levelSquaresWithOpts.length - 1];
    random = Math.floor(Math.random() * currentOpts.length);
    current = currentOpts[random];
    levelSquares.push(JSON.parse(JSON.stringify(current)));
    currentOpts.splice(random, 1);
    levelSquaresWithOpts.pop();
    levelSquaresWithOpts.push(currentOpts);
  } else {
    random = Math.floor(Math.random() * nextSquare.length);
    current = nextSquare[random];
    levelSquares.push(JSON.parse(JSON.stringify(current)));
    nextSquare.splice(random, 1);
    levelSquaresWithOpts.push(nextSquare);
  }
  return { next: current, levelSquares, levelSquaresWithOpts };
}

export function isValidQuadrant(quadrant, levelSquares) {
  const lastSquare = levelSquares[levelSquares.length - 1];
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

export function genNextSquare(current, levelSquares, coef) {
  console.log();
  let linkedSquares = [].concat(
    genHorizontalSquares(current, coef),
    genVerticalSquares(current, coef),
    genDiagonalSquares(current, coef)
  );
  linkedSquares = linkedSquares.filter(s => {
    return !(searchForArray(levelSquares, s) > -1);
  });
  if (!linkedSquares.length) return null;
  return linkedSquares;
}

export function genHorizontalSquares(current, coef) {
  let horSq = [];
  let x = current[0] + 3;
  let y = current[1];
  if (0 < x && x < coef) horSq.push([x, y]);
  x = current[0] - 3;
  if (0 < x && x < coef) horSq.push([x, y]);
  return horSq;
}

export function genVerticalSquares(current, coef) {
  let verSq = [];
  let x = current[0];
  let y = current[1] + 3;
  if (0 < y && y < coef) verSq.push([x, y]);
  y = current[1] - 3;
  if (0 < y && y < coef) verSq.push([x, y]);
  return verSq;
}

export function genDiagonalSquares(current, coef) {
  let [x0, y0] = current;
  let diagSq = [];
  let x = x0 + 2;
  let y = y0 + 2;
  diagSq.push([x, y]);
  y = y0 - 2;
  diagSq.push([x, y]);
  x = x0 - 2;
  diagSq.push([x, y]);
  y = y0 + 2;
  diagSq.push([x, y]);
  const res = diagSq.filter(
    s => s[0] > 0 && s[1] > 0 && (s[0] < coef && s[1] < coef)
  );
  return res;
}

export function genRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
