import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StockViewModel } from '../../viewModels/stock.viewModel';
import { InventoryViewModel } from '../../viewModels/inventory.viewModel';

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
  };

  // @Output() onSubmitted: EventEmitter<StockViewModel> =
  //   new EventEmitter<StockViewModel>();

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(this.stockItem);
      // this.onSubmitted.emit(this.stockItem);
    }
  }
}
