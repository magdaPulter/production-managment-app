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
import { TitleViewModel } from '../../viewModels/title.viewModel';
import { CommonModule } from '@angular/common';
import { ProductModel } from '../../models/product.model';

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
  @Input() titles!: TitleViewModel[];
  @Output() listElementDeleted: EventEmitter<ListItemViewModel> =
    new EventEmitter<ListItemViewModel>();

  @Output() listElementEdited: EventEmitter<ListItemViewModel> =
    new EventEmitter<ListItemViewModel>();

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
      const productId: string = Math.floor(Math.random() * 1000).toString();
      const productAdded = {
        ...product,
        orderName: element.name,
        id: productId,
      };
      const elementWithProduct: ListItemViewModel = {
        ...element,
        products: [...element.products, productAdded],
      };
      this.listElementEdited.emit(elementWithProduct);
    }
  }

  onProductDeleted(product: ProductViewModel, listItem: ListItemViewModel) {
    if (product.id) {
      const removedIndex = listItem.products.findIndex(
        (prod) => prod.id === product.id
      );

      const updatedProduct = [...listItem.products];
      updatedProduct.splice(removedIndex, 1);
      const elementWithouthProduct = { ...listItem, products: updatedProduct };
      this.listElementEdited.emit(elementWithouthProduct);
    }
  }
}
