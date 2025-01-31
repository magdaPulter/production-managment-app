import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { OrderModel } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { OrderFormComponent } from '../order-form/order-form.component';
import { OrdersListComponent } from '../orders-list/orders-list.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { DeleteContentComponent } from '../delete-content/delete-content.component';
import { InventoryService } from '../../services/inventory.service';
import { TitleViewModel } from '../../viewModels/title.viewModel';
import { ProductTableComponent } from '../product-table/product-table.component';
import { ProductSumQueryModel } from '../../query-models/product-sum.queryModel';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    OrderFormComponent,
    OrdersListComponent,
    ModalComponent,
    DeleteContentComponent,
    ProductTableComponent,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  readonly order: OrderModel = {
    name: '',
    priority: 'low',
    products: [],
  };
  readonly orderService = inject(OrderService);
  readonly inventoryService = inject(InventoryService);

  readonly orders$: Observable<OrderModel[]> = this.orderService.getOrders();
  readonly selectedOrder: WritableSignal<OrderModel> = signal({
    name: '',
    priority: 'low',
    products: [],
  });

  readonly products$: Observable<ProductSumQueryModel[]> =
    this.orderService.getProductSumWithTheSameName();

  readonly inventory$: Observable<TitleViewModel[]> = this.inventoryService
    .getInventory()
    .pipe(
      map((inventories) =>
        inventories.map((inventory) => {
          return {
            title: inventory.name,
          };
        })
      )
    );

  onSelected(order: OrderModel) {
    this.selectedOrder.set(order);
  }

  deleteOrder(order: OrderModel) {
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
}
