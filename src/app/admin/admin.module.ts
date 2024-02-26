import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent,
  ],
})
export class AdminModule {}
