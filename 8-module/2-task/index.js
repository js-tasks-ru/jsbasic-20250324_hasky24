import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {

  elem = null;

  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#render();
    this.#createProductCard();

  }

  #template() {
    return `
    <div class="products-grid">
  <div class="products-grid__inner">
  </div>
</div>
    `;
  }

  #createProductCard(products = this.products) {
    for (let product of products) {
      let newProduct = new ProductCard(product);
      this.elem.querySelector('.products-grid__inner').append(newProduct.elem);
    }
  }

  #render() {
    this.elem = createElement(this.#template());

    this.filters = {
      noNuts: false,
      vegeterianOnly: false,
      maxSpiciness: 4,
      category: ''
    };
  }

  updateFilter(filters) {

    if ('noNuts' in filters) {
      this.filters.noNuts = filters.noNuts;
    }

    if ('vegeterianOnly' in filters) {
      this.filters.vegeterianOnly = filters.vegeterianOnly;
    }

    if ('maxSpiciness' in filters) {
      this.filters.maxSpiciness = filters.maxSpiciness;
    }

    if ('category' in filters) {
      this.filters.category = filters.category;
    }

    this.#createFilterProductCard(this.filters);
  }

  #createFilterProductCard(filt) {

    let filterArr = this.products;

    if (filt.noNuts === true) {
      filterArr = filterArr.filter(item => !item.nuts);
    }

    if (filt.vegeterianOnly === true) {
      filterArr = filterArr.filter(item => item.vegeterian);
    }

    if (filt.maxSpiciness) {
      filterArr = filterArr.filter(item => item.spiciness <= filt.maxSpiciness);
    }

    if (filt.category !== '') {
      filterArr = filterArr.filter(item => item.category === filt.category);
    }

    this.elem.querySelector('.products-grid__inner').innerHTML = '';
    this.#createProductCard(filterArr);
  }
}
