import { Routes } from '@angular/router';
import { InventoryPageComponent } from './components/inventory-page/inventory-page.component';
import { OrdersPageComponent } from './components/orders-page/orders-page.component';

export const routes: Routes = [
  {
    path: '',
    component: InventoryPageComponent,
  },
  {
    path: 'orders-page',
    component: OrdersPageComponent,
  },
];
