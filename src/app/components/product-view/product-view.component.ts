import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() itemDeleted: EventEmitter<ProductViewModel> =
    new EventEmitter<ProductViewModel>();

  onElementRemoved(item: ProductViewModel) {
    this.itemDeleted.emit(item);
  }
}
