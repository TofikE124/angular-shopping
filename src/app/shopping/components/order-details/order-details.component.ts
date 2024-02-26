import { Component } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'shared/models/order';
import { Observable, of, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AngularComponentsModule } from '../../../shared/angular-components.module';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, AngularComponentsModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent {
  orderId: string;
  order$: Observable<Order | null> = of(null);

  constructor(orderService: OrderService, route: ActivatedRoute) {
    this.orderId = route.snapshot.paramMap.get('id') || '';
    this.order$ = orderService.getOrderById(this.orderId).pipe(take(1));
  }

  getDate(date: number) {
    return new Date(date).toLocaleDateString();
  }
}
