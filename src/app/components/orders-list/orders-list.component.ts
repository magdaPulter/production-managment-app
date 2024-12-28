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

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [MatExpansionModule, OrderFormComponent],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
})
export class OrdersListComponent {
  readonly panelOpenState = signal(false);
  readonly elementSelectedToEdit: WritableSignal<ListItemViewModel | null> =
    signal(null);
  @Input() listItems!: ListItemViewModel[];
  @Output() listElementDeleted: EventEmitter<ListItemViewModel> =
    new EventEmitter<ListItemViewModel>();

  @Output() listElementEdited: EventEmitter<ListItemViewModel> =
    new EventEmitter<ListItemViewModel>();

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
}
