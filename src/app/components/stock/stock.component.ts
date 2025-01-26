import { Component, inject, Input } from '@angular/core';
import { StockFormComponent } from '../stock-form/stock-form.component';
import { InventoryViewModel } from '../../viewModels/inventory.viewModel';
import { Store } from '@ngrx/store';
import { ProductionActions } from '../../store/production-store/actions';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [StockFormComponent],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss',
})
export class StockComponent {
  @Input() inventory!: InventoryViewModel[];
  readonly store = inject(Store);

  onStockCleared() {
    this.store.dispatch(ProductionActions.clearLocalStorage());
  }
}
