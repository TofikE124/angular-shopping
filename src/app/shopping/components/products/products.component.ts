import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Observable, Subscription, of } from 'rxjs';
import { Product } from 'shared/models/app-product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AngularComponentsModule } from '../../../shared/angular-components.module';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { ProductsFilterComponent } from './products-filter/products-filter.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'products',
  standalone: true,
  imports: [
    AngularFireAuthModule,
    AngularComponentsModule,
    CommonModule,
    ProductsFilterComponent,
    ProductCardComponent,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnDestroy, AfterViewInit {
  cart$: Observable<ShoppingCart | null> = of(null);
  cart: ShoppingCart | null = null;
  loadingCarts = true;
  loadingElements = new Array(6);
  cartSubscription?: Subscription;

  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {}

  async ngAfterViewInit() {
    this.populateProducts();
    this.cart$ = await this.cartService.getCart();
    this.cartSubscription = this.cart$.subscribe((cart) => {
      this.cart = cart;
      this.loadingCarts = false;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  populateProducts() {
    this.productService.getAll().subscribe((p) => {
      this.products = p;
      this.filteredProducts = p;
    });
  }

  filterChange(filterdProducts: Product[]) {
    this.filteredProducts = filterdProducts;
  }
}
