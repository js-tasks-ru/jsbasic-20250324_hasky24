import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  elem = null;
  count = 1;
  position = 0;

  constructor(slides) {
    this.slides = slides;
    this.#render();
  }

  #createSlides() {
    let str = ``;

    for (let slide of this.slides) {
      str += `
      <div class="carousel__slide" data-id=${slide.id}>
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `;
    }

    return str;
  }

  #createTemplate() {
    return `
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
        <div class="carousel__inner">
          ${this.#createSlides()}
        </div>
    </div>
    `;
  }

  #addProduct(carouselSlide) {
    const event = new CustomEvent('product-add', {
      detail: carouselSlide.dataset.id,
      bubbles: true
    });

    this.elem.dispatchEvent(event);
  }

  #scrollSlides(event) {
    let arrowRight = this.elem.querySelector('.carousel__arrow_right');
    let arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    let carouselInner = this.elem.querySelector('.carousel__inner');
    let slidesAll = this.elem.querySelectorAll('.carousel__slide');
    let widthContainer = carouselInner.offsetWidth;

    if (event.closest('.carousel__arrow_right')) {
      if (this.count < slidesAll.length) {
        this.position += widthContainer;
        this.count += 1;
        arrowLeft.style.display = '';
        carouselInner.style.transform = `translateX(-${this.position}px)`;
      }

      if (this.count === slidesAll.length) {
        arrowRight.style.display = 'none';
      }
    }

    if (event.closest('.carousel__arrow_left')) {
      if (this.count > 1) {
        this.position -= widthContainer;
        this.count -= 1;
        arrowRight.style.display = '';
        carouselInner.style.transform = `translateX(-${this.position}px)`;
      }

      if (this.count === 1) {
        arrowLeft.style.display = 'none';
      }
    }
  }

  #render() {
    this.elem = createElement(this.#createTemplate());

    this.elem.querySelector('.carousel__arrow_left').style.display = 'none';

    this.elem.addEventListener('click', (event) => {

      if (event.target.closest('.carousel__button')) {
        this.#addProduct(event.target.closest('.carousel__slide'));
      }
    }
    );

    this.elem.addEventListener('click', (event) => {
      this.#scrollSlides(event.target);
    });
  }

}
