function toggleText() {
  let button = document.querySelector('.toggle-text-button');

  return button.addEventListener('click', () => text.hidden = !text.hidden)
}
