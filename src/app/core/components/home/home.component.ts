import { Component } from '@angular/core';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { CategoryService } from 'shared/services/category.service';
import { AngularComponentsModule } from '../../../shared/angular-components.module';
import { CommonModule } from '@angular/common';
import { ProductService } from 'shared/services/product.service';
import { take } from 'rxjs';
import { Product } from 'shared/models/app-product';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
