import { ShoppingItem } from 'shared/models/app-shopping-item';

export interface ShoppingSortingStrategy {
  sort(products: ShoppingItem[], order: string): ShoppingItem[];
}

export class ShoppingPriceSortingStrategy implements ShoppingSortingStrategy {
  sort(products: ShoppingItem[], order: string): ShoppingItem[] {
    return products.sort(
      ({ totalPrice: totalPriceA }, { totalPrice: totalPriceB }) =>
        order === 'asc' ? totalPriceA - totalPriceB : totalPriceB - totalPriceA
    );
  }
}

export class ShoppingTitleSortingStrategy implements ShoppingSortingStrategy {
  sort(products: ShoppingItem[], order: string): ShoppingItem[] {
    return products.sort(
      ({ product: { title: titleA } }, { product: { title: titleB } }) =>
        order === 'asc'
          ? titleA.localeCompare(titleB)
          : titleB.localeCompare(titleA)
    );
  }
}

export class ShoppingQuantitySortingStrategy
  implements ShoppingSortingStrategy
{
  sort(products: ShoppingItem[], order: string): ShoppingItem[] {
    return products.sort(({ quantity: quantityA }, { quantity: quantityB }) =>
      order === 'asc' ? quantityA - quantityB : quantityB - quantityA
    );
  }
}
