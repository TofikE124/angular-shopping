import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/app-product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AngularComponentsModule } from '../../angular-components.module';

@Component({
  selector: 'product-quantity',
  standalone: true,
  imports: [AngularComponentsModule],
  templateUrl: './product-quantity.component.html',
  styleUrl: './product-quantity.component.css',
})
export class ProductQuantityComponent {
  @Input('product') product?: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart | null = null;

  constructor(
    private cartService: ShoppingCartService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}
  addToCart() {
    this.cartService.addItem(this.product!);
  }

  removeFromCart() {
    this.cartService.removeItem(this.product!);
  }

  getQuantity() {
    if (!this.product || !this.shoppingCart) return 0;
    return this.shoppingCart.getProductQuantity(this.product.key!);
  }
}
