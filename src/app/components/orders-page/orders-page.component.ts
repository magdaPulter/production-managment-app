import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrderModel } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { OrderFormComponent } from '../order-form/order-form.component';
import { OrdersListComponent } from '../orders-list/orders-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [FormsModule, CommonModule, OrderFormComponent, OrdersListComponent],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
})
export class OrdersPageComponent {
  readonly orderService = inject(OrderService);

  readonly orders$: Observable<OrderModel[]> = this.orderService.getOrders();

  onDelete(order: OrderModel) {
    if (order.id) {
      this.orderService.deleteOrder(order.id).subscribe();
    }
  }

  createOrder(order: OrderModel) {
    this.orderService.createOrder(order);
  }
}
