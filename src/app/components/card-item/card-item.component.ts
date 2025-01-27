import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StockViewModel } from '../../viewModels/stock.viewModel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [MatCardModule, FormsModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss',
})
export class CardItemComponent {
  @Input() item!: StockViewModel;
  roasted: number = 0;
}
