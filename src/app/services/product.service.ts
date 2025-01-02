import { inject, Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { map, Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { ProductQueryModel } from '../query-models/product.queryModel';

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

  getProductsWithFullname(): Observable<ProductQueryModel[]> {
    return this.getProducts().pipe(
      map((products) => {
        return products.map((product) => {
          return {
            id: product.id,
            quantity: product.quantity,
            orderId: product.orderId,
            fullname: `${product.value}kg ${product.name}`,
          };
        });
      })
    );
  }
}
