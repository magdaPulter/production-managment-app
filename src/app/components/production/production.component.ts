import { Component, inject, OnInit } from '@angular/core';
import { StockComponent } from '../stock/stock.component';
import { CardsListComponent } from '../cards-list/cards-list.component';
import { ProductionSummaryComponent } from '../production-summary/production-summary.component';
import { Observable } from 'rxjs';
import { InventoryModel } from '../../models/inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProductionActions } from '../../store/production-store/actions';
import { StockModel } from '../../models/stock.model';
import { ProductionState } from '../../store/production-store/state';

@Component({
  selector: 'app-production',
  standalone: true,
  imports: [
    StockComponent,
    CardsListComponent,
    ProductionSummaryComponent,
    CommonModule,
  ],
  templateUrl: './production.component.html',
  styleUrl: './production.component.scss',
})
export class ProductionComponent implements OnInit {
  readonly inventoryService = inject(InventoryService);

  readonly inventory$: Observable<InventoryModel[]> =
    this.inventoryService.getInventory();

  readonly store = inject(Store);

  readonly productsInStock$: Observable<StockModel[]> = this.store.select(
    ProductionState.selectStockProduct
  );

  constructor() {
    this.productsInStock$.subscribe((val) => console.log(val));
  }

  ngOnInit(): void {
    if (this.store.select(ProductionState.selectProductionState)) {
      this.store.dispatch(ProductionActions.loadProductsFromLocalStorage());
    }
  }
}
