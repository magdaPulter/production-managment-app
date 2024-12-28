import { inject, Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private firestoreService = inject(FirestoreService);

  getProducts(): Observable<ProductModel[]> {
    return this.firestoreService.get('products');
  }

  createProduct(product: ProductModel): Observable<string> {
    return this.firestoreService.post('products', product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.firestoreService.delete(id, 'products');
  }

  updateProduct(product: ProductModel): Observable<void> {
    return this.firestoreService.update('products', product, product.id);
  }
}
