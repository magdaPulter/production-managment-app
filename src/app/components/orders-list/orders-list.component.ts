import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListItemViewModel } from '../../viewModels/listItem.viewModel';
import { OrderFormComponent } from '../order-form/order-form.component';
import { ProductViewComponent } from '../product-view/product-view.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductViewModel } from '../../viewModels/product.viewModel';
import { ProductQueryModel } from '../../query-models/product.queryModel';
import { TitleViewModel } from '../../viewModels/title.viewModel';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    MatExpansionModule,
    OrderFormComponent,
    ProductViewComponent,
    ProductFormComponent,
  ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
})
export class OrdersListComponent {
  readonly panelOpenState = signal(false);
  readonly elementSelectedToEdit: WritableSignal<ListItemViewModel | null> =
    signal(null);
  @Input() listItems!: ListItemViewModel[];
  @Input() listElements!: ProductQueryModel[] | null;
  @Input() titles!: TitleViewModel[];
  @Output() listElementDeleted: EventEmitter<ListItemViewModel> =
    new EventEmitter<ListItemViewModel>();

  @Output() listElementEdited: EventEmitter<ListItemViewModel> =
    new EventEmitter<ListItemViewModel>();

  @Output() productAdded: EventEmitter<ProductViewModel> =
    new EventEmitter<ProductViewModel>();

  onElementRemoved(element: ListItemViewModel) {
    this.listElementDeleted.emit(element);
  }
  onElementEditted(element: ListItemViewModel) {
    this.elementSelectedToEdit.set(element);
  }
  onCloseEditForm(element: ListItemViewModel) {
    this.listElementEdited.emit(element);
    this.elementSelectedToEdit.set(null);
  }

  onProductAdded(product: ProductViewModel, element: ListItemViewModel) {
    if (element.id) {
      const newProduct = { ...product, orderId: element.id };
      this.productAdded.emit(newProduct);
    }
  }
}
