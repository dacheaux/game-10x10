export function fetchPlayer(playerName) {
  let player = JSON.parse(localStorage.getItem('player'));
  let players = JSON.parse(localStorage.getItem('players')) || [];
  console.log('playerName', playerName);
  console.log(player);
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
    console.log('player from fetchPlayer', player);
    if (!player) {
      player = newPlayer;
      player.name = playerName;
      players.push(player);
    }
  }
  localStorage.setItem('player', JSON.stringify(player));
  localStorage.setItem('players', JSON.stringify(players));
  return { player, players };
}

export function isContainedIn(superset, subset) {
  superset = JSON.stringify(superset);
  subset = JSON.stringify(subset);

  const index = superset.indexOf(subset);
  if (index != -1) {
    return true;
  }
}

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

export function genNextSquare(current, levelSquares) {
  let linkedSquares = [].concat(
    genHorizontalSquares(current),
    genVerticalSquares(current),
    genDiagonalSquares(current)
  );
  linkedSquares = linkedSquares.filter(s => {
    return !(searchForArray(levelSquares, s) > -1);
  });
  return linkedSquares[Math.floor(Math.random() * linkedSquares.length)];
}

export function genHorizontalSquares(current) {
  let horSq = [];
  let x = current[0] + 3;
  let y = current[1];
  if (0 < x && x < 11) horSq.push([x, y]);
  x = current[0] - 3;
  if (0 < x && x < 11) horSq.push([x, y]);
  return horSq;
}

export function genVerticalSquares(current) {
  let verSq = [];
  let x = current[0];
  let y = current[1] + 3;
  if (0 < y && y < 11) verSq.push([x, y]);
  y = current[1] - 3;
  if (0 < y && y < 11) verSq.push([x, y]);
  return verSq;
}

export function genDiagonalSquares(current) {
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
    s => s[0] > 0 && s[1] > 0 && (s[0] < 11 && s[1] < 11)
  );
  return res;
}

export function flatten(arr) {
  return [].concat(...arr);
}

export function genRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
