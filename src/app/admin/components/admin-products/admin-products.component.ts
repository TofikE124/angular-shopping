import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, filter, switchMap } from 'rxjs';
import { AngularComponentsModule } from '../../../shared/angular-components.module';
import { Product } from 'shared/models/app-product';
import { ProductService } from 'shared/services/product.service';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  fda: NgModel;
}

@Component({
  selector: 'admin-products',
  standalone: true,
  imports: [AngularComponentsModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css',
})
export class AdminProductsComponent {
  products$: Observable<Product[]>;
  products: Product[] = [];
  displayedColumns: string[] = ['thumbnail', 'title', 'price', 'edit'];
  dataSource = new MatTableDataSource<Product>(this.products);

  search: string = '';
  category: string = '';

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private productService: ProductService,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.products$ = this.productService.getAll();

    this.products$
      .pipe(
        switchMap((products) => {
          this.products = products;
          this.dataSource = new MatTableDataSource(this.products);
          this.dataSource.paginator = this.paginator!;
          this.dataSource.sort = this.sort!;

          this.applyFilter();

          return route.queryParamMap;
        })
      )
      .subscribe((queryParams) => {
        this.search = queryParams.get('search') || '';
        this.category = queryParams.get('category') || 'bread';
        this.applyFilter();
      });
  }

  searchChange() {
    this.router.navigate(['/admin/products'], {
      queryParams: {
        search: this.search ? this.search : null,
      },
      queryParamsHandling: 'merge',
    });
  }

  applyFilter() {
    const searchValue = this.search.trim().toLowerCase();
    this.dataSource.filter = searchValue;
    this.dataSource.filterPredicate = (product: Product, filter: string) =>
      product.title.toLocaleLowerCase().includes(filter);
  }
}
