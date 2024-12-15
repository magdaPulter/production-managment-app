import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { InventoryModel } from '../models/inventory.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private firestore = inject(AngularFirestore);

  getInventory(): Observable<InventoryModel[]> {
    return this.firestore
      .collection<InventoryModel>('inventory')
      .valueChanges({ idField: 'id' });
  }
}
