import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore = inject(AngularFirestore);

  public get<T>(collection: string): Observable<(T & { id: string })[]> {
    return this.firestore
      .collection<T>(collection)
      .valueChanges({ idField: 'id' });
  }

  public post<T>(collection: string, postData: T): Observable<string> {
    const id = this.firestore.createId();
    this.firestore
      .collection(collection)
      .doc(id)
      .set({ ...postData, id });
    return of(id);
  }

  public delete(id: string, collection: string): Observable<void> {
    return new Observable((observer) => {
      this.firestore
        .collection(collection)
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

  public update<T>(
    collection: string,
    updateData: Partial<T>,
    id: string | undefined
  ): Observable<void> {
    return new Observable((observer) => {
      this.firestore
        .collection(collection)
        .doc(id)
        .update({ ...updateData })
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
