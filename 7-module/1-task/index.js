import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {

  elem = null;

  constructor(categories) {
    this.categories = categories;
    this.#render();
  }

  #createCategories() {
    let str = ``;

    for (let category of this.categories) {
      str += `
        <a href="#" class="ribbon__item" data-id=${category.id}>${category.name}</a>
      `;
    }

    return str;
  }

  #createTemplate() {
    return `
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
        ${this.#createCategories()}
      </nav>

      <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `;
  }

  #scrollRibbon = (event) => {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let arrowRight = this.elem.querySelector('.ribbon__arrow_right');


    if (event.closest('.ribbon__arrow_right')) {
      ribbonInner.scrollBy(350, 0);
    }

    if (event.closest('.ribbon__arrow_left')) {
      ribbonInner.scrollBy(-350, 0);
    }

    ribbonInner.addEventListener('scroll', () => {
      let scrollLeft = ribbonInner.scrollLeft;
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
      } else {
        arrowLeft.classList.add('ribbon__arrow_visible');
      }

      if (scrollRight < 1) {
        arrowRight.classList.remove('ribbon__arrow_visible');
      } else {
        arrowRight.classList.add('ribbon__arrow_visible');
      }
    });
  }

  #selectCategory(category) {
    const event = new CustomEvent('ribbon-select', {
      detail: category.dataset.id,
      bubbles: true
    });

    this.elem.dispatchEvent(event);
  }

  #render() {
    this.elem = createElement(this.#createTemplate());

    this.elem.querySelector('.ribbon__arrow_left').classList.toggle('ribbon__arrow_visible');
    this.elem.querySelector('.ribbon__arrow_right').classList.toggle('ribbon__arrow_visible');
    this.elem.querySelectorAll('.ribbon__item')[0].classList.add('ribbon__item_active');

    this.elem.addEventListener('click', (event) => {
      this.#scrollRibbon(event.target);
    });

    this.elem.addEventListener('click', (event) => {
      if (event.target.closest('.ribbon__item')) {
        event.preventDefault();

        this.elem.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
        event.target.classList.add('ribbon__item_active');

        this.#selectCategory(event.target);
      }
    });
  }
}
