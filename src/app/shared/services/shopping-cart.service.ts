import { ChangeDetectionStrategy, Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map, of, switchMap, take } from 'rxjs';
import { Product } from 'shared/models/app-product';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from './auth.service';
import { ShoppingItem } from 'shared/models/app-shopping-item';
import { changeToData } from '@angular/fire/database';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  user: AppUser | null = null;
  private uid?: string;

  private queryParams: any;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    authService.getAppUser$().subscribe((user) => {
      this.user = user;
    });

    authService.getAuthState().subscribe((state) => {
      this.uid = state?.uid;
    });

    this.route.queryParamMap.subscribe((queryParams) => {
      this.queryParams = {};
      queryParams.keys.forEach((key) => {
        this.queryParams[key] = queryParams.get(key);
      });
    });
  }

  async addItem(product: Product) {
    if (!this.user) this.authService.signInWithPopUp('/', this.queryParams);
    else {
      this.addToCart(product);
    }
  }

  async getCart() {
    return this.authService.getAppUser$().pipe(
      switchMap((user) => {
        if (!user || !user.shoppingCartId) return of(null);
        return this.db
          .object(`/shopping-carts/${user?.shoppingCartId}`)
          .valueChanges()
          .pipe(
            map((cart: any) => {
              return new ShoppingCart(cart?.items || {});
            })
          );
      })
    );
  }

  async clearCart() {
    let cartId = await this.createOrGetShoppingCartId();
    await this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  async removeItem(product: Product) {
    if (!this.user) this.authService.signInWithPopUp('/', this.queryParams);
    else this.removeFromCart(product);
  }

  private async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  private async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = (await this.createOrGetShoppingCartId()) || '';
    let item$ = this.getItem(cartId, product.key!);

    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe(async (item) => {
        if ((item?.quantity || 0) + change <= 0) await item$.remove();
        else
          item$.update({ product, quantity: (item?.quantity || 0) + change });
      });
  }

  private getItem(
    cartId: string,
    productId: string
  ): AngularFireObject<ShoppingItem> {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async createOrGetShoppingCartId() {
    if (this.user?.shoppingCartId) return this.user?.shoppingCartId;
    return this.createShoppingCart();
  }

  private async createShoppingCart() {
    let result = await this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
    this.db.object('/users/' + this.uid).update({ shoppingCartId: result.key });
    return result.key;
  }
}
