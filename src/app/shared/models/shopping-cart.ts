import { ShoppingItem } from './app-shopping-item';

export interface ShoppingItemsMap {
  [key: string]: ShoppingItem;
}

export class ShoppingCart {
  private _items: ShoppingItem[] = [];
  private _itemsMap: ShoppingItemsMap = {};

  constructor(itemsMap: any) {
    this._itemsMap = itemsMap;
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this._items.push(new ShoppingItem(item.quantity, item.product));
    }
  }

  get items() {
    return this._items;
  }

  getProductQuantity(productKey: string) {
    return this._itemsMap[productKey]?.quantity || 0;
  }

  getTotalPrice() {
    return this._items.reduce(
      (total, current) => total + current.totalPrice,
      0
    );
  }

  get totalItemsCount() {
    return this._items.reduce((total, current) => total + current.quantity, 0);
  }
}
