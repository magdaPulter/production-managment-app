import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ListItemViewModel } from '../../viewModels/listItem.viewModel';
import { PriorityLevels } from '../../utils';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
})
export class OrderFormComponent {
  @Input() listItem: ListItemViewModel = {
    name: '',
    priority: PriorityLevels.LOW,
  };
  readonly priorityLevels: string[] = [
    PriorityLevels.LOW,
    PriorityLevels.MEDIUM,
    PriorityLevels.HIGH,
  ];
  @Output() onSubmitted: EventEmitter<ListItemViewModel> =
    new EventEmitter<ListItemViewModel>();

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.onSubmitted.emit(this.listItem);
    }
  }
}
