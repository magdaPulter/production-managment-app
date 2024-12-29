import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrderModel } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { OrderFormComponent } from '../order-form/order-form.component';
import { OrdersListComponent } from '../orders-list/orders-list.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { DeleteContentComponent } from '../delete-content/delete-content.component';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    OrderFormComponent,
    OrdersListComponent,
    ModalComponent,
    DeleteContentComponent,
  ],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
})
export class OrdersPageComponent {
  readonly order: OrderModel = {
    name: '',
    priority: 'low',
  };
  readonly orderService = inject(OrderService);
  readonly productService = inject(ProductService);

  readonly orders$: Observable<OrderModel[]> = this.orderService.getOrders();
  readonly selectedOrder: WritableSignal<OrderModel> = signal({
    name: '',
    priority: 'low',
  });
  readonly products$: Observable<ProductModel[]> =
    this.productService.getProducts();

  onSelected(order: OrderModel) {
    this.selectedOrder.set(order);
  }

  onDelete(order: OrderModel) {
    if (order.id) {
      this.orderService.deleteOrder(order.id).subscribe();
    }
  }

  createOrder(order: OrderModel) {
    this.orderService.createOrder(order);
  }

  editOrder(order: OrderModel) {
    this.orderService.updateOrder(order).subscribe();
  }

  createProduct(product: ProductModel) {
    this.productService.createProduct(product).subscribe();
  }
}
