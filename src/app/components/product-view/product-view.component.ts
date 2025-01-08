import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductQueryModel } from '../../query-models/product.queryModel';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
})
export class ProductViewComponent {
  @Input() listItemId!: string | undefined;
  @Input() items!: ProductQueryModel[] | null;
  @Output() itemDeleted: EventEmitter<ProductQueryModel> =
    new EventEmitter<ProductQueryModel>();

  onElementRemoved(item: ProductQueryModel) {
    this.itemDeleted.emit(item);
  }
}
