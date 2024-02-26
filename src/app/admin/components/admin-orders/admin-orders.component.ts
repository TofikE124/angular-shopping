import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription, of } from 'rxjs';
import { AngularComponentsModule } from '../../../shared/angular-components.module';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'admin-orders',
  standalone: true,
  imports: [AngularComponentsModule, RouterModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css',
})
export class AdminOrdersComponent {
  orders$: Observable<Order[] | null> = of(null);
  ordersSubscription?: Subscription;

  dataSource = new MatTableDataSource<Order>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  displayedColumns = ['customer', 'date', 'view'];

  constructor(private orderService: OrderService) {
    this.orders$ = orderService.getOrders();

    this.ordersSubscription = this.orders$.subscribe((orders) => {
      this.dataSource = new MatTableDataSource<Order>(orders || []);
      this.dataSource.paginator = this.paginator!;
    });
  }
  ngOnDestroy(): void {
    this.ordersSubscription?.unsubscribe();
  }

  getDateString(date: number) {
    return new Date(date).toLocaleDateString();
  }
}
