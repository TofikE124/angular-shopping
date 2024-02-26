import { Product } from 'shared/models/app-product';

export interface ProductSortingStrategy {
  sort(products: Product[], order: string): Product[];
}

export class ProductPriceSortingStrategy implements ProductSortingStrategy {
  sort(products: Product[], order: string): Product[] {
    return products.sort((a, b) =>
      order === 'asc' ? a.price - b.price : b.price - a.price
    );
  }
}

export class ProductTitleSortingStrategy implements ProductSortingStrategy {
  sort(products: Product[], order: string): Product[] {
    return products.sort((a, b) =>
      order === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  }
}
