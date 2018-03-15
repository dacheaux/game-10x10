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

export function genRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// export function removeItemFromArray(item, array) {}
