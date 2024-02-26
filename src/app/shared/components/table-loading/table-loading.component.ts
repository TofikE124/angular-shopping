import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'table-loading',
  standalone: true,
  imports: [NgxSkeletonLoaderModule, NgIf],
  templateUrl: './table-loading.component.html',
  styleUrl: './table-loading.component.css',
})
export class TableLoadingComponent {}
