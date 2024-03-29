import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartTableComponent } from './shopping-cart-table.component';

describe('ShoppingCartTableComponent', () => {
  let component: ShoppingCartTableComponent;
  let fixture: ComponentFixture<ShoppingCartTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingCartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
