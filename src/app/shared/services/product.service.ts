import { Injectable } from '@angular/core';
import { Product } from 'shared/models/app-product';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: Product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db
      .list('/products')
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((item) => {
            const value: any = item.payload.val();
            const key = item.key;
            return {
              ...value,
              key,
            };
          })
        )
      );
  }

  get(productId: string) {
    return this.db
      .object(`/products/${productId}`)
      .valueChanges() as Observable<Product>;
  }

  update(productId: string, product: Product) {
    return this.db.object(`/products/${productId}`).update(product);
  }

  delete(productId: string) {
    return this.db.object(`/products/${productId}`).remove();
  }
}
