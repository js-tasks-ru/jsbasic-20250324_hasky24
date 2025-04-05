function camelize(str) {
  let arr = str.split('-');

  return arr
    .slice(0, 1)
    .concat(arr.slice(1)
      .map(item => item[0].toUpperCase() + item.slice(1)))
    .join('');
}
