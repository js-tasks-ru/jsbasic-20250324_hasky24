import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  modal = new Modal();

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {

    if (product === null || product === undefined) {
      return;
    }

    let searchResult = this.cartItems.find(item => item.product.id == product.id);

    if (searchResult) {
      searchResult.count += 1;
    } else {
      let obj = {};
      obj.product = product;
      obj.count = 1;
      this.cartItems.push(obj);
    }

    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {

    let searchResult = this.cartItems.findIndex(item => item.product.id === productId);

    if (searchResult === -1) {
      return;
    }

    this.cartItems[searchResult].count += amount;

    if (this.cartItems[searchResult].count === 0) {
      document.body.querySelector(`[data-product-id="${this.cartItems[searchResult].product.id}"]`).remove();
      this.cartItems.splice(searchResult, 1);
    }

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let result = this.cartItems.reduce((sum, item) => sum + item.count, 0);
    return result;
  }

  getTotalPrice() {
    let result = this.cartItems.reduce((sum, item) => sum + (item.count * item.product.price), 0);
    return result;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {

    this.modal.setTitle("Your order");

    let div = document.createElement('div');

    for (let card of this.cartItems) {
      div.append(this.renderProduct(card.product, card.count));
    }

    div.append(this.renderOrderForm());

    this.modal.setBody(div);

    div.addEventListener('click', (event) => {

      if (event.target.closest('.cart-counter__button_minus')) {
        let elem = event.target.closest('.cart-product');
        this.updateProductCount(elem.dataset.productId, -1);
      }

      if (event.target.closest('.cart-counter__button_plus')) {
        let elem = event.target.closest('.cart-product');
        this.updateProductCount(elem.dataset.productId, 1);
      }
    });

    div.querySelector('.cart-form').addEventListener('submit', (event) => {
      this.onSubmit(event);
    });

    this.modal.open();
  }

  onProductUpdate(cartItems) {

    this.cartIcon.update(this);

    if (document.body.classList.contains('is-modal-open')) {
      if (this.isEmpty()) {
        this.modal.close();
      }

      for (let card of cartItems) {
        let productId = card.product.id;
        let modalBody = this.modal.elem;

        let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
        let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
        let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

        productCount.innerHTML = card.count;

        productPrice.innerHTML = `€${(card.product.price * card.count).toFixed(2)}`;
        infoPrice.innerHTML = `€${(this.getTotalPrice().toFixed(2))}`;
      }
    }
  }

  async onSubmit(event) {
    event.preventDefault();

    document.querySelector('[type="submit"]').classList.add('is-loading');

    try {
      let promise = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: new FormData(document.querySelector('.cart-form'))
      });

      if (!promise.ok) {
        throw new Error('Ошибка запроса!');
      }

      this.modal.setTitle('Success!');
      this.cartItems = [];

      let newModalBody = document.createElement('div');
      newModalBody.innerHTML = `
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) 
            <br>We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
        `;
      this.modal.setBody(newModalBody);
    } catch (error) { console.log(error); }

  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

