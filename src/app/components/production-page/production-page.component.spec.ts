import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionPageComponent } from './production-page.component';

describe('ProductionPageComponent', () => {
  let component: ProductionPageComponent;
  let fixture: ComponentFixture<ProductionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
