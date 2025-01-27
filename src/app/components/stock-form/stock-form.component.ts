import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StockViewModel } from '../../viewModels/stock.viewModel';
import { InventoryViewModel } from '../../viewModels/inventory.viewModel';
import { Store } from '@ngrx/store';
import { ProductionActions } from '../../store/production-store/actions';

@Component({
  selector: 'app-stock-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './stock-form.component.html',
  styleUrl: './stock-form.component.scss',
})
export class StockFormComponent {
  @Input() inventoryList!: InventoryViewModel[];

  @Input() stockItem: StockViewModel = {
    name: '',
    weight: 1,
    id: '',
  };
  readonly store = inject(Store);

  onSubmit(form: NgForm) {
    if (form.valid) {
      const id = this.stockItem.name.split(' ').join('');
      this.stockItem.id = id;
      this.store.dispatch(
        ProductionActions.addProductToStock({ stockProduct: this.stockItem })
      );
      this.stockItem = {
        name: '',
        weight: 1,
        id: '',
      };
      this.store.dispatch(ProductionActions.saveProductToLocalStorage());
    }
  }
}
