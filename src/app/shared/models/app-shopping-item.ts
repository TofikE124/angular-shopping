import { Product } from './app-product';

export class ShoppingItem {
  quantity: number;
  product: Product;

  constructor(quantity: number, product: Product) {
    this.quantity = quantity;
    this.product = product;
  }

  get totalPrice() {
    return this.product.price * this.quantity;
  }
}
