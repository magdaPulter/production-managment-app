import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { InventoryModel } from '../models/inventory.model';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private firestoreService = inject(FirestoreService);

  getInventory(): Observable<InventoryModel[]> {
    return this.firestoreService.get('inventory');
  }

  createInventory(inventory: InventoryModel): Observable<string> {
    return this.firestoreService.post('inventory', inventory);
  }

  deleteInventory(id: string): Observable<void> {
    return this.firestoreService.delete(id, 'inventory');
  }

  updateInventory(inventory: InventoryModel): Observable<void> {
    return this.firestoreService.update('inventory', inventory, inventory.id);
  }
}
