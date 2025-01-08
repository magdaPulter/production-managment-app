import { Routes } from '@angular/router';
import { InventoryComponent } from './components/inventory/inventory.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
  },
  {
    path: 'orders-page',
    component: OrdersComponent,
  },
];
