import { Component, Input } from '@angular/core';
import { ProductViewModel } from '../../viewModels/product.viewModel';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
})
export class ProductViewComponent {
  @Input() listItemId!: string | undefined;
  @Input() items!: ProductViewModel[] | null;
}
