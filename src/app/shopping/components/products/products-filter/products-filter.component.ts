import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Product } from 'shared/models/app-product';
import { CategoryService } from 'shared/services/category.service';
import { AngularComponentsModule } from '../../../../shared/angular-components.module';
import {
  ProductPriceSortingStrategy,
  ProductSortingStrategy,
  ProductTitleSortingStrategy,
} from './product-sorting-strategy';

@Component({
  selector: 'products-filter',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AngularComponentsModule,
    CommonModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.css',
})
export class ProductsFilterComponent {
  @Input('products') products: Product[] = [];
  @Output() filterChanged: EventEmitter<Product[]> = new EventEmitter<
    Product[]
  >();
  filteredProducts: Product[] = [];

  categories$;
  categoryFilter: string = '';

  search: string = '';

  sortBy: string = '';
  sortDirection: string = '';
  sortingOptions = [
    { label: 'Clear', sortActive: null, sortDirection: null },
    { label: 'Most Expensive', sortActive: 'price', sortDirection: 'desc' },
    { label: 'Least Expensive', sortActive: 'price', sortDirection: 'asc' },
    { label: 'Title (A to Z)', sortActive: 'title', sortDirection: 'asc' },
    { label: 'Title (Z to A)', sortActive: 'title', sortDirection: 'desc' },
  ];

  sortingStrategies: { [key: string]: ProductSortingStrategy } = {
    price: new ProductPriceSortingStrategy(),
    title: new ProductTitleSortingStrategy(),
  };

  constructor(
    categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categories$ = categoryService.getAll();

    route.queryParamMap.subscribe((queryParams) => {
      this.categoryFilter = queryParams.get('category') || '';
      this.search = queryParams.get('search') || '';
      this.sortBy = queryParams.get('sortBy') || '';
      this.sortDirection = queryParams.get('sortDirection') || '';
      this.filterChanged.emit(this.getFilteredProducts());
    });
  }

  searchChange() {
    this.router.navigate(['/'], {
      queryParams: {
        search: this.search ? this.search : null,
      },
      queryParamsHandling: 'merge',
    });
  }

  getFilteredProducts() {
    let filteredProducts = this.products.filter((p) => {
      return (
        (this.categoryFilter ? p.category === this.categoryFilter : true) &&
        p.title.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      );
    });
    const sortingStrategy = this.sortingStrategies[this.sortBy];
    if (sortingStrategy) {
      filteredProducts = sortingStrategy.sort(
        filteredProducts,
        this.sortDirection
      );
    }

    return filteredProducts;
  }
}
