import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  templateUrl: './inventory-form.component.html',
  styleUrl: './inventory-form.component.scss',
})
export class InventoryFormComponent {
  inventory = {
    name: '',
    weight: 0,
  };

  onSubmit(form: NgForm) {}
}
