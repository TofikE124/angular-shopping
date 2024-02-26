import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { MaxNumber } from 'shared/pipes/max-number.pipe';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AngularComponentsModule } from '../../../shared/angular-components.module';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    AngularComponentsModule,
    NgFor,
    RouterModule,
    NgIf,
    CommonModule,
    MaxNumber,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [],
})
export class NavbarComponent implements OnDestroy, OnInit {
  userSubscription: Subscription;
  user: AppUser | null = null;
  loading: boolean = true;
  cart$: Observable<ShoppingCart | null> = of(null);

  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService
  ) {
    this.userSubscription = authService.getAppUser$().subscribe((user) => {
      this.user = user;
      this.loading = false;
    });
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async loginWithGoogle() {
    try {
      const user = await this.authService.signInWithPopUp();
    } catch (error) {}
  }

  async logOut() {
    this.authService.signOut();
  }
}
