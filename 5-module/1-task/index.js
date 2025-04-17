function hideSelf() {
  let button = document.querySelector('.hide-self-button');

  return button.addEventListener('click', () => button.hidden = true)
}
