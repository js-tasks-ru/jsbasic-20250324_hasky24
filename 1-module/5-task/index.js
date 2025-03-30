function truncate(str, maxlength) {

  if (typeof str != 'string') return;

  if (str.length > maxlength) {
    return str.slice(0, maxlength - 1) + '…';
  } else return str;
}
