import { Component, inject, OnInit } from '@angular/core';
import { StockComponent } from '../stock/stock.component';
import { CardsListComponent } from '../cards-list/cards-list.component';
import { ProductionSummaryComponent } from '../production-summary/production-summary.component';
import { combineLatest, map, Observable } from 'rxjs';
import { InventoryModel } from '../../models/inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProductionActions } from '../../store/production-store/actions';
import { StockModel } from '../../models/stock.model';
import { ProductionState } from '../../store/production-store/state';
import { OrderService } from '../../services/order.service';
import { ProductWithWeightQueryModel } from '../../query-models/productWithWeight.queryModel';
import {
  ProductionsItem,
  ProductionsItemCounted,
} from '../../models/productionsItem.model';

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
  readonly orderService = inject(OrderService);

  readonly inventory$: Observable<InventoryModel[]> =
    this.inventoryService.getInventory();

  readonly orderedProducts$: Observable<ProductWithWeightQueryModel[]> =
    this.orderService.getAllProductsWithSumWeight();

  readonly store = inject(Store);

  readonly productsInStock$: Observable<StockModel[]> = this.store.select(
    ProductionState.selectStockProduct
  );

  readonly productionsItem$: Observable<ProductionsItem[]> = combineLatest([
    this.orderedProducts$,
    this.inventory$,
    this.productsInStock$,
  ]).pipe(
    map(([orderedProducts, inventory, productsInStock]) => {
      const orderMap = new Map(
        orderedProducts.map((ordered) => [ordered.name, ordered.weight])
      );
      const stockMap = new Map(
        productsInStock.map((inStock) => [inStock.name, inStock.weight])
      );
      return inventory.map((inventory) => ({
        name: inventory.name,
        orderedWeight: orderMap.get(inventory.name) ?? 0,
        inStockWeight: stockMap.get(inventory.name) ?? 0,
        batchLost: inventory.batchLost,
      }));
    })
  );

  readonly productionsItemConted$: Observable<ProductionsItemCounted[]> =
    this.productionsItem$.pipe(
      map((items) =>
        items.map((item) => {
          const planned = Math.ceil(
            item.orderedWeight / item.batchLost - item.inStockWeight
          );
          return {
            name: item.name,
            orderedWeight: item.orderedWeight,
            inStockWeight: item.inStockWeight,
            batchLost: item.batchLost,
            planned: item.orderedWeight === 0 ? 0 : planned,
            roasted: 0,
            left: 0,
          };
        })
      )
    );

  ngOnInit(): void {
    if (this.store.select(ProductionState.selectProductionState)) {
      this.store.dispatch(ProductionActions.loadProductsFromLocalStorage());
    }
  }
}
