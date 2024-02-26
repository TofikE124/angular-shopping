import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';
import { TableLoadingComponent } from 'shared/components/table-loading/table-loading.component';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AngularComponentsModule } from '../../../shared/angular-components.module';
import { ShoppingCartTableComponent } from './shopping-cart-table/shopping-cart-table.component';

@Component({
  selector: 'shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    AngularComponentsModule,
    ProductQuantityComponent,
    RouterModule,
    ShoppingCartTableComponent,
    TableLoadingComponent,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartSubscription?: Subscription;
  cart$: Observable<ShoppingCart | null> = of(null);
  cart?: ShoppingCart;
  loadingCart = true;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private cartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.cartSubscription = this.cart$.subscribe((cart) => {
      this.cart = cart!;
      this.loadingCart = false;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }
}
