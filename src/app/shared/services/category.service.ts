import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { Category } from 'shared/models/app-category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getAll() {
    return this.db
      .list('/categories', (ref) => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((item) => {
            const value = item.payload.val() as Category;
            const key = item.key;
            return {
              ...value,
              key,
            };
          })
        )
      );
  }
}
