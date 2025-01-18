import { Routes } from '@angular/router';
import { InventoryComponent } from './components/inventory/inventory.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductionPageComponent } from './components/production-page/production-page.component';

export const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
  },
  {
    path: 'orders-page',
    component: OrdersComponent,
  },
  {
    path: 'production-page',
    component: ProductionPageComponent,
  },
];
