import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { TableLoadingComponent } from 'shared/components/table-loading/table-loading.component';
import { Order } from 'shared/models/order';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { AngularComponentsModule } from '../../../shared/angular-components.module';
import { MyOrdersTableComponent } from './my-orders-table/my-orders-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'my-orders',
  standalone: true,
  imports: [
    AngularComponentsModule,
    RouterModule,
    MyOrdersTableComponent,
    TableLoadingComponent,
    CommonModule,
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent implements OnDestroy {
  myOrders$;
  myOrders?: Order[];
  myOrdersLoading = true;
  myOrdersSuscription?: Subscription;

  constructor(authService: AuthService, private orderService: OrderService) {
    this.myOrders$ = authService.getAuthState().pipe(
      switchMap((state) => {
        return orderService.getOrdersByUser(state?.uid!);
      })
    );

    this.myOrdersSuscription = this.myOrders$.subscribe((orders) => {
      this.myOrders = orders;
      this.myOrdersLoading = false;
    });
  }
  ngOnDestroy(): void {
    this.myOrdersSuscription?.unsubscribe();
  }
}
