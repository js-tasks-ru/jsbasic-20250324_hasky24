function factorial(n) {
  let result = 1;

  if (typeof n != 'number' || n % 1 != 0) {
    return 'Ошибка!';
  }

  if (n == 0 || n == 1) {
    return 1;
  }

  for (let count = 1; count <= n; count++) {
    result *= count;
  }

  return result;
}
