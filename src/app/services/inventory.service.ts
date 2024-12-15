import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, of } from 'rxjs';
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

  createInventory(inventory: InventoryModel): Observable<string> {
    const id = this.firestore.createId();
    this.firestore
      .collection('inventory')
      .doc(id)
      .set({ ...inventory, id });
    return of(id);
  }

  deleteInventory(id: string): Observable<InventoryModel> {
    return new Observable((observer) => {
      this.firestore
        .collection('inventory')
        .doc(id)
        .delete()
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  updateInventory(inventory: InventoryModel): Observable<void> {
    return new Observable((observer) => {
      this.firestore
        .collection('inventory')
        .doc(inventory.id)
        .update({ ...inventory })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
