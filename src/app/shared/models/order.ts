import { ShoppingItem } from './app-shopping-item';

export class Order {
  userId: string;
  shipping: any;
  items: ShoppingItem[];
  datePlaced: number;
  key?: string;

  constructor(
    userId: string,
    shipping: any,
    items: ShoppingItem[],
    key?: string
  ) {
    this.userId = userId;
    this.shipping = shipping;
    (this.items = items.map((i) => ({
      ...i,
      product: {
        ...i.product,
        key: null,
      },
      totalPrice: i.totalPrice,
    }))),
      (this.datePlaced = new Date().getTime());
    this.key = key;
  }

  get totalItemsCount() {
    return this.items.reduce((total, current) => total + current.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((total, current) => total + current.totalPrice, 0);
  }
}
