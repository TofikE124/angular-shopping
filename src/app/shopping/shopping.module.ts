import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckOutComponent } from './componnets/check-out/check-out.component';
import { MyOrdersComponent } from './componnets/my-orders/my-orders.component';
import { OrderSuccessComponent } from './componnets/order-success/order-success.component';
import { ShippingFormComponent } from './componnets/shipping-form/shipping-form.component';
import { ShoppingCartComponent } from './componnets/shopping-cart/shopping-cart.component';
import { ShoppingCartSummaryComponent } from './componnets/shopping-cart-summary/shopping-cart-summary.component';
import { Router } from 'express';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CheckOutComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ShippingFormComponent,
    ShoppingCartComponent,
    ShoppingCartSummaryComponent,
  ],
})
export class ShoppingModule {}
