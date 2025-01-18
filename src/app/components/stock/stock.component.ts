import { Component, Input } from '@angular/core';
import { StockFormComponent } from '../stock-form/stock-form.component';
import { InventoryViewModel } from '../../viewModels/inventory.viewModel';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [StockFormComponent],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss',
})
export class StockComponent {
  @Input() inventory!: InventoryViewModel[];
}
