import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/app-product';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    ProductQuantityComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
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

  getQuantity() {
    if (!this.product || !this.shoppingCart) return 0;
    return this.shoppingCart.getProductQuantity(this.product.key!);
  }
}
