import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {

  elem = null;
  thumb = null;
  progress = null;

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

    this.thumb.style.left = `${percents}%`;
    this.progress.style.width = `${percents}%`;
  }

  #trackingChange() {
    let event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this.elem.dispatchEvent(event);
  }

  #pointerDown = () => {
    document.addEventListener('pointermove', this.#pointerMove);
    document.addEventListener('pointerup', this.#pointerUp, { once: true });
  }

  #pointerMove = (event) => {
    this.elem.classList.add('slider_dragging');
    let segments = this.steps - 1;
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let percents = leftRelative * 100;
    this.value = Math.round(leftRelative * segments);
    this.thumb.style.left = `${percents}%`;
    this.progress.style.width = `${percents}%`;

    let sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.textContent = this.value;

    let arrSliders = this.elem.getElementsByTagName('span');
    this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    arrSliders[this.value].classList.add('slider__step-active');

  }

  #pointerUp = (event) => {
    this.#changingSlider(event);
    this.elem.classList.remove('slider_dragging');
    this.#trackingChange();
    document.removeEventListener('pointermove', this.#pointerMove);
  }

  #render() {
    this.elem = createElement(this.#template());
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');

    this.elem.querySelector('.slider__steps').children[this.value].classList.add('slider__step-active');
    this.elem.querySelector('.slider__progress').style.width = `${this.value / (this.steps - 1) * 100}%`;
    this.thumb.style.left = `${this.value / (this.steps - 1) * 100}%`;
    this.elem.querySelector('.slider__value').textContent = this.value;

    this.elem.addEventListener('click', (event) => {
      this.#changingSlider(event);
    });

    this.elem.addEventListener('click', () => {
      this.#trackingChange();
    });

    this.thumb.ondragstart = () => false;
    this.thumb.onpointerdown = () => false;
    this.thumb.onpointermove = () => false;

    this.thumb.addEventListener('pointerdown', this.#pointerDown);
  }
}
