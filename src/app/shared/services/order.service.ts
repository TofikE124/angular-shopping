import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Order } from 'shared/models/order';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
  ) {}

  async placeOrder(order: Order) {
    let result = await this.db.list('/orders/').push(order);
    await this.cartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db
      .list('/orders')
      .snapshotChanges()
      .pipe(
        map((snapshot) => {
          return snapshot.map((snapshotItem) => ({
            key: snapshotItem.key,
            ...(snapshotItem.payload.val() as any),
          }));
        })
      ) as Observable<Order[]>;
  }

  getOrdersByUser(uid: string) {
    return this.db
      .list('/orders', (ref) => ref.orderByChild('userId').equalTo(uid))
      .snapshotChanges()
      .pipe(
        map((snapshot) => {
          return snapshot.map((snapshotItem) => ({
            key: snapshotItem.key,
            ...(snapshotItem.payload.val() as any),
          }));
        })
      ) as Observable<Order[]>;
  }

  getOrderById(orderId: string) {
    return this.db
      .object('/orders/' + orderId)
      .snapshotChanges()
      .pipe(
        map((snapshot) => {
          let val = snapshot.payload.val() as Order;
          return new Order(val.userId, val.shipping, val.items, snapshot.key!);
        })
      ) as Observable<Order>;
  }
}
