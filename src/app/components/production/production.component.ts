import { Component, inject } from '@angular/core';
import { StockComponent } from '../stock/stock.component';
import { CardsListComponent } from '../cards-list/cards-list.component';
import { ProductionSummaryComponent } from '../production-summary/production-summary.component';
import { Observable } from 'rxjs';
import { InventoryModel } from '../../models/inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';

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
export class ProductionComponent {
  readonly inventoryService = inject(InventoryService);

  readonly inventory$: Observable<InventoryModel[]> =
    this.inventoryService.getInventory();
}
