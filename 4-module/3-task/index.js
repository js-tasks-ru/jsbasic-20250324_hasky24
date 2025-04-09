function highlight(table) {
  let tbody = table.querySelector('tbody');

  for (let row of tbody.rows) {
    let cell = row.querySelectorAll('td');

    setAvailabelClass(row, cell[3]);
    setGenderClass(row, cell[2]);
    setInlineStyle(row, cell[1])
  }
}

function setAvailabelClass(row, cell) {
  if (!cell.hasAttribute('data-available')) {
    return row.setAttribute('hidden', true);
  }

  return (cell.dataset.available == 'true' ?
    row.classList.add('available') :
    row.classList.add('unavailable'));
}

function setGenderClass(row, cell) {
  return (cell.innerHTML == 'm') ?
    row.classList.add('male') :
    row.classList.add('female');
}

function setInlineStyle(row, cell) {
  if (cell.innerHTML < '18') {
    return row.style.textDecoration = 'line-through';
  }
}