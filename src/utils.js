// ❤️ http://2ality.com/2013/11/initializing-arrays.html
export function range(n) {
  return Array(...Array(n)).map((_, i) => i);
}

// ❤️ https://stackoverflow.com/a/15030117
export function flatten(array) {
  return array.reduce(
    (flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    [],
  );
}

export function times(n, func) {
  for (let i = 0; i < n; i += 1) {
    func();
  }
}

// Needed to use Array's functions on non "real" Arrays like NodeList
export const forEach = (...args) => Array.prototype.forEach.call(...args);
export const map = (...args) => Array.prototype.map.call(...args);
export const reduce = (...args) => Array.prototype.reduce.call(...args);
export const find = (...args) => Array.prototype.find.call(...args);

// ❤️ https://github.com/acdlite/recompose/blob/master/src/packages/recompose/compose.js
export const compose = (...funcs) =>
  funcs.reduce((a, b) => (...args) => a(b(...args)), arg => arg);
