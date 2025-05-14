import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  carousel = null;
  ribbonMenu = null;
  stepSlider = null;
  productsGrid = null;
  cartIcon = null;
  cart = null;
  productsArray = null;

  constructor() {
  }

  async render() {

    this.carousel = new Carousel(slides);
    let carouselHolder = document.querySelector('div[data-carousel-holder]');
    carouselHolder.append(this.carousel.elem);


    this.ribbonMenu = new RibbonMenu(categories);
    let ribbonHolder = document.querySelector('div[data-ribbon-holder]');
    ribbonHolder.append(this.ribbonMenu.elem);


    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    let sliderHolder = document.querySelector('div[data-slider-holder]');
    sliderHolder.append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector('div[data-cart-icon-holder]');
    cartIconHolder.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    try {
      let products = await fetch('./products.json');
      this.productsArray = await products.json();
      this.productsGrid = new ProductsGrid(this.productsArray);
      let productsGridHolder = document.querySelector('div[data-products-grid-holder]');
      productsGridHolder.innerHTML = '';
      productsGridHolder.append(this.productsGrid.elem);
    } catch (error) {
      console.log(error);
    }

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: document.querySelector('.ribbon__item_active').dataset.id
    });

    document.body.addEventListener('product-add', (event) => {
      let foundProduct = this.productsArray.find(item => item.id == event.detail);
      this.cart.addProduct(foundProduct);
    });

    this.stepSlider.elem.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({
        category: event.detail
      });
    });

    let nutsCheckbox = document.getElementById('nuts-checkbox');
    nutsCheckbox.addEventListener('change', () => {
      this.productsGrid.updateFilter({
        noNuts: nutsCheckbox.checked
      });
    });

    let vegeterianCheckbox = document.getElementById('vegeterian-checkbox');
    vegeterianCheckbox.addEventListener('change', () => {
      this.productsGrid.updateFilter({
        vegeterianOnly: vegeterianCheckbox.checked
      });
    });
  }
}
