function getMinMax(str) {
  let obj = {};

  let arr = str.split(' ')
    .filter(item => isFinite(item))
    .sort((a, b) => a - b);

  obj.min = arr[0];
  obj.max = arr.at(-1);

  return obj
}
