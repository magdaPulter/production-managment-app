import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { combineLatest, map, Observable } from 'rxjs';
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
    orderId: '',
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
  readonly productSumWithTheSameName$: Observable<ProductSumQueryModel[]> =
    this.products$.pipe(
      map((products) => {
        return Object.values(
          products.reduce<Record<string, ProductSumQueryModel>>((acc, prod) => {
            if (!acc[prod.fullname]) {
              acc[prod.fullname] = {
                fullname: prod.fullname,
                quantity: 0,
                orderId: [],
              };
            }
            acc[prod.fullname].quantity += prod.quantity;
            acc[prod.fullname].orderId.push(prod.orderId);
            return acc;
          }, {})
        );
      })
    );

  readonly productSumWithTheSameNameWithOrdersName$: Observable<
    ProductSumQueryModel[]
  > = combineLatest([this.productSumWithTheSameName$, this.orders$]).pipe(
    map(([products, orders]) => {
      const orderMap = orders.reduce((acc, ord) => {
        return { ...acc, [ord.id!]: ord.name };
      }, {} as Record<string, string>);
      return products.map((product) => {
        return {
          fullname: product.fullname,
          quantity: product.quantity,
          orderId: product.orderId.map((order) => orderMap[order]),
        };
      });
    })
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
