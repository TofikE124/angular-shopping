import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrdersTableComponent } from './my-orders-table.component';

describe('MyOrdersTableComponent', () => {
  let component: MyOrdersTableComponent;
  let fixture: ComponentFixture<MyOrdersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyOrdersTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
