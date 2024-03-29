import { NgModule } from '@angular/core';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [ProductCardComponent, ProductQuantityComponent],
  exports: [ProductCardComponent, ProductQuantityComponent,FormsModule],
  providers: [
    CategoryService,
    OrderService,
    ProductService,
    ShoppingCartService,
    UserService,
  ],
})
export class SharedModule {}
