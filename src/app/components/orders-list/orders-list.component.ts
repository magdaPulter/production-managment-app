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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    MatExpansionModule,
    OrderFormComponent,
    ProductViewComponent,
    ProductFormComponent,
    CommonModule,
  ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
})
export class OrdersListComponent {
  readonly panelOpenState = signal(false);
  readonly elementSelectedToEdit: WritableSignal<ListItemViewModel | null> =
    signal(null);
  readonly toggleIcon: WritableSignal<boolean> = signal(true);
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
    this.toggleIcon.update((flag) => !flag);
    return this.toggleIcon()
      ? this.elementSelectedToEdit.set(null)
      : this.elementSelectedToEdit.set(element);
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
