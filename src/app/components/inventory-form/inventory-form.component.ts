import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { InventoryViewModel } from '../../viewModels/inventory.viewModel';

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  templateUrl: './inventory-form.component.html',
  styleUrl: './inventory-form.component.scss',
})
export class InventoryFormComponent {
  @Input() inventory: InventoryViewModel = {
    name: '',
    weight: 0,
    batchLost: 0,
  };

  @Output() onFormSubmitted: EventEmitter<InventoryViewModel> =
    new EventEmitter<InventoryViewModel>();

  onSubmit(form: NgForm) {
    if (form.valid) {
      const inventory = {
        name: this.inventory.name.trim(),
        weight: this.inventory.weight,
        batchLost: this.inventory.batchLost,
      };
      this.onFormSubmitted.emit(inventory);
    }
  }
}
