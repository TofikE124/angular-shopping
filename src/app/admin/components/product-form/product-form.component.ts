import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AngularComponentsModule } from '../../../shared/angular-components.module';
import { Product } from 'shared/models/app-product';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { urlValidator } from '../../../validators';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    AngularComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  categories$;
  form: FormGroup;
  title: AbstractControl | null;
  price: AbstractControl | null;
  category: AbstractControl | null;
  imageUrl: AbstractControl | null;

  productId: string | null;

  constructor(
    categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categories$ = categoryService.getAll();

    this.form = this.getForm();
    this.title = this.form.get('title');
    this.category = this.form.get('category');
    this.price = this.form.get('price');
    this.imageUrl = this.form.get('imageUrl');

    this.productId = route.snapshot.params.id || null;
    if (this.productId)
      productService
        .get(this.productId)
        .pipe(take(1))
        .subscribe((p) => {
          this.setFormValues(p);
        });
  }

  getForm() {
    return this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.05)]],
      imageUrl: ['', [Validators.required, urlValidator()]],
    });
  }

  setFormValues(p: Product) {
    this.form.setValue({ ...p });
  }

  getErrorMessage(formControl: AbstractControl | null, name?: string) {
    console.log(formControl?.errors);
    if (!formControl) return '';
    // Required
    if (formControl.hasError('required')) {
      return name ? `${name} is required.` : 'This field is required';
    }

    // Min
    if (formControl.hasError('min')) {
      let minValue = formControl.errors?.min.min || 0;
      return name
        ? `Min ${name} value is ${minValue}`
        : `Min value is ${minValue}`;
    }

    // Email
    if (formControl.hasError('email')) return 'Not a valid email';

    //Url
    if (formControl.hasError('invalidUrl')) return 'Not a valid url.';

    return '';
  }

  create(product: Product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
  update(product: Product, productId: string) {
    this.productService.update(productId, product);
    this.router.navigate(['/admin/products']);
  }

  delete(productId: string) {
    if (!confirm('Are you sure you want to delete this product')) return;
    this.productService.delete(productId);
    this.router.navigate(['/admin/products']);
  }
}
