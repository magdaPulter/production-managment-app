import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
})
export class OrderFormComponent {
  readonly order: OrderModel = {
    name: '',
    priority: 'low',
  };
  readonly priorityLevels: string[] = ['low', 'medium', 'high'];
  @Output() onSubmitted: EventEmitter<OrderModel> =
    new EventEmitter<OrderModel>();

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.onSubmitted.emit(this.order);
    }
  }
}
