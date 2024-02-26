import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AngularComponentsModule } from 'shared/angular-components.module';
import { Order } from 'shared/models/order';

@Component({
  selector: 'my-orders-table',
  standalone: true,
  imports: [AngularComponentsModule, RouterModule],
  templateUrl: './my-orders-table.component.html',
  styleUrl: './my-orders-table.component.css',
})
export class MyOrdersTableComponent implements OnInit, AfterViewInit {
  @Input('orders') myOrders?: Order[];

  dataSource = new MatTableDataSource<Order>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  displayedColumns = ['customer', 'date', 'view'];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Order>(this.myOrders || []);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator!;
  }

  getDateString(date: number) {
    return new Date(date).toLocaleDateString();
  }
}
