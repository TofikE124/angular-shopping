import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AngularComponentsModule } from 'shared/angular-components.module';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';
import { ShoppingItem } from 'shared/models/app-shopping-item';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import {
  ShoppingPriceSortingStrategy,
  ShoppingQuantitySortingStrategy,
  ShoppingSortingStrategy,
  ShoppingTitleSortingStrategy,
} from '../shopping-sorting-strategy';

@Component({
  selector: 'shopping-cart-table',
  standalone: true,
  imports: [AngularComponentsModule, CommonModule, ProductQuantityComponent],
  templateUrl: './shopping-cart-table.component.html',
  styleUrl: './shopping-cart-table.component.css',
})
export class ShoppingCartTableComponent implements OnInit, AfterViewInit {
  @Input('cart') cart?: ShoppingCart;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  sortingStrategies: { [key: string]: ShoppingSortingStrategy } = {
    price: new ShoppingPriceSortingStrategy(),
    productName: new ShoppingTitleSortingStrategy(),
    quantity: new ShoppingQuantitySortingStrategy(),
  };

  dataSource = new MatTableDataSource<ShoppingItem>(this.cart?.items || []);
  displayedColumns = ['productThumbnail', 'productName', 'quantity', 'price'];

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ShoppingItem>(this.cart?.items);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
    this.dataSource.sortData = this.sortData;
  }

  sortData = (data: ShoppingItem[], sort: MatSort) => {
    const sortingStrategy = this.sortingStrategies[sort.active];
    if (sortingStrategy) {
      return sortingStrategy.sort(data, sort.direction);
    }
    return data;
  };

  clearCart() {
    if (confirm('Are you sure you want to clear the cart?'))
      this.cartService.clearCart();
  }
}
