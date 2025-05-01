export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
  }

  updateProductCount(productId, amount) {

    let searchResult = this.cartItems.findIndex(item => item.product.id == productId);

    if (searchResult === -1) {
      return;
    }

    this.cartItems[searchResult].count += amount;

    if (this.cartItems[searchResult].count === 0) {
      this.cartItems.splice(searchResult, 1);
    }

    this.onProductUpdate(this.cartItem);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

