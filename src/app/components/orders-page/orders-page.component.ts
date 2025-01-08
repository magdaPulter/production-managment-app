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
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductQueryModel } from '../../query-models/product.queryModel';
import { InventoryService } from '../../services/inventory.service';
import { TitleViewModel } from '../../viewModels/title.viewModel';
import { ProductTableComponent } from '../product-table/product-table.component';

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
    ProductTableComponent,
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
  readonly inventoryService = inject(InventoryService);

  readonly orders$: Observable<OrderModel[]> = this.orderService.getOrders();
  readonly selectedOrder: WritableSignal<OrderModel> = signal({
    name: '',
    priority: 'low',
  });

  readonly selectedProduct: WritableSignal<ProductQueryModel> = signal({
    fullname: '',
    quantity: 0,
  });

  readonly products$: Observable<ProductQueryModel[]> =
    this.productService.getProductsWithFullname();

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

  onProductSelected(product: ProductQueryModel) {
    this.selectedProduct.set(product);
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

  createProduct(product: ProductModel) {
    this.productService.createProduct(product).subscribe();
  }

  deleteProduct(product: ProductQueryModel) {
    if (product.id) {
      this.productService.deleteProduct(product.id).subscribe();
    }
  }

  editProduct(product: ProductModel) {
    this.productService.updateProduct(product).subscribe();
  }
}
