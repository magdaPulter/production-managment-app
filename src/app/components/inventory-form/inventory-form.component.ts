import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { InventoryViewModel } from '../../viewModels/inventory.viewModel';
import { InventoryValue } from '../../utils';

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  templateUrl: './inventory-form.component.html',
  styleUrl: './inventory-form.component.scss',
})
export class InventoryFormComponent {
  readonly inventoryValues: number[] = [
    InventoryValue.QUARTER,
    InventoryValue.WHOLE,
  ];
  @Input() inventory: InventoryViewModel = {
    name: '',
    weight: 0,
    value: 0.25,
  };

  @Output() onFormSubmitted: EventEmitter<InventoryViewModel> =
    new EventEmitter<InventoryViewModel>();

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.onFormSubmitted.emit(this.inventory);
    }
  }
}
