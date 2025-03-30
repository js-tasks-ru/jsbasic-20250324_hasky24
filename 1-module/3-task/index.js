function ucFirst(str) {

  if (typeof str != 'string') return;

  if (str == '') return '';

  if (str.length == 1) return str.toUpperCase();

  return str[0].toUpperCase() + str.slice(1);
}
