import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AngularComponentsModule } from '../../../shared/angular-components.module';
import { Order } from 'shared/models/order';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { phoneValidator } from '../../../validators';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shipping-form',
  standalone: true,
  imports: [AngularComponentsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.css',
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart | null = null;
  stateSubscription?: Subscription;
  uid?: string;

  form: FormGroup;
  name: AbstractControl;
  phone: AbstractControl;
  city: AbstractControl;
  street: AbstractControl;

  constructor(
    private authService: AuthService,
    fb: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, phoneValidator]],
      city: ['', Validators.required],
      street: ['', Validators.required],
    });

    this.name = this.form.get('name')!;
    this.phone = this.form.get('phone')!;
    this.city = this.form.get('city')!;
    this.street = this.form.get('street')!;
  }

  ngOnInit() {
    this.stateSubscription = this.authService
      .getAuthState()
      .subscribe((state) => {
        this.uid = state?.uid;
      });
  }
  ngOnDestroy() {
    this.stateSubscription?.unsubscribe();
  }

  getErrorMessage(formControl: AbstractControl | null, name?: string) {
    if (!formControl) return '';
    // Required
    if (formControl.hasError('required')) {
      return name ? `${name} is required.` : 'This field is required';
    }

    // Phone
    if (formControl.hasError('phone')) return 'Not a valid phone number';

    return '';
  }

  async placeOrder(value: any) {
    let order = new Order(this.uid!, value, this.cart!.items);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success/', result.key]);
  }
}
