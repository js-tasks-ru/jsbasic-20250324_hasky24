import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {

  elem = null;

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.#render();
  }

  #createSpan() {
    let str = ``;

    for (let i = 0; i < this.steps; i++) {
      str += `<span></span>`;
    }
    return str;
  }

  #template() {
    return `
      <div class="slider">

        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>

        <div class="slider__progress"></div>

        <div class="slider__steps">
          ${this.#createSpan()}
        </div>
      </div>
    `;
  }

  #changingSlider(event) {
    let segments = this.steps - 1;
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    this.value = Math.round(leftRelative * segments);
    let percents = this.value / segments * 100;

    let sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.textContent = this.value;

    let arrSliders = this.elem.getElementsByTagName('span');
    this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    arrSliders[this.value].classList.add('slider__step-active');

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${percents}%`;
    progress.style.width = `${percents}%`;
  }

  #trackingChange() {
    let event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this.elem.dispatchEvent(event);
  }

  #render() {
    this.elem = createElement(this.#template());

    this.elem.querySelector('.slider__steps').firstElementChild.classList.add('slider__step-active');
    this.elem.querySelector('.slider__progress').style.width = '0%';

    this.elem.addEventListener('click', (event) => {
      this.#changingSlider(event);
    });

    this.elem.addEventListener('click', () => {
      this.#trackingChange();
    });
  }
}
