import { inject, Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Observable } from 'rxjs';
import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private firestoreService = inject(FirestoreService);

  getOrders(): Observable<OrderModel[]> {
    return this.firestoreService.get('orders');
  }

  createOrder(order: OrderModel): Observable<string> {
    return this.firestoreService.post('orders', order);
  }

  deleteOrder(id: string): Observable<void> {
    return this.firestoreService.delete(id, 'orders');
  }

  updateOrder(order: OrderModel): Observable<void> {
    return this.firestoreService.update('orders', order, order.id);
  }
}
