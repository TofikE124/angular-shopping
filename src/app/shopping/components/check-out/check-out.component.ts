import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AngularComponentsModule } from '../../../shared/angular-components.module';
import { CommonModule } from '@angular/common';
import { phoneValidator } from '../../../validators';
import { Observable, Subscription, of } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Order } from 'shared/models/order';
import { Router } from '@angular/router';
import { ShoppingCartSummaryComponent } from '../shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from '../shipping-form/shipping-form.component';

@Component({
  selector: 'check-out',
  standalone: true,
  imports: [
    AngularComponentsModule,
    CommonModule,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
  ],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart | null> = of(null);
  cartSubscription?: Subscription;
  cart: ShoppingCart | null = null;

  constructor(private cartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = (await this.cartService.getCart()) || {};
  }
}
