import { inject, Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { map, Observable } from 'rxjs';
import { OrderModel } from '../models/order.model';
import { ProductModel } from '../models/product.model';
import { ProductQueryModel } from '../query-models/product.queryModel';
import { ProductSumQueryModel } from '../query-models/product-sum.queryModel';
import { ProductWithWeightQueryModel } from '../query-models/productWithWeight.queryModel';

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

  getAllProducts(): Observable<ProductModel[]> {
    return this.getOrders().pipe(
      map((orders) =>
        orders
          .map((order) => order.products)
          .reduce((prod, acc) => {
            return prod.concat(acc);
          }, [])
      )
    );
  }
  getAllProductsWithWeight(): Observable<ProductWithWeightQueryModel[]> {
    return this.getAllProducts().pipe(
      map((products) => {
        return products.map((product) => {
          return {
            name: product.name.trim(),
            weight: product.quantity * +product.value,
          };
        });
      })
    );
  }

  getAllProductsWithSumWeight(): Observable<ProductWithWeightQueryModel[]> {
    return this.getAllProductsWithWeight().pipe(
      map((products) => {
        return Object.values(
          products.reduce<Record<string, { name: string; weight: number }>>(
            (acc, prod) => {
              if (!acc[prod.name]) {
                acc[prod.name] = {
                  name: prod.name,
                  weight: 0,
                };
              }
              acc[prod.name].weight += prod.weight;
              return acc;
            },
            {}
          )
        );
      })
    );
  }

  getProductsWithFullname(): Observable<ProductQueryModel[]> {
    return this.getAllProducts().pipe(
      map((products) => {
        return products.map((product) => {
          return {
            id: product.id,
            quantity: product.quantity,
            orderName: product.orderName,
            fullname: `${product.value}kg ${product.name}`,
          };
        });
      })
    );
  }

  getProductSumWithTheSameName(): Observable<ProductSumQueryModel[]> {
    return this.getProductsWithFullname().pipe(
      map((products) => {
        return Object.values(
          products.reduce<Record<string, ProductSumQueryModel>>((acc, prod) => {
            if (!acc[prod.fullname]) {
              acc[prod.fullname] = {
                fullname: prod.fullname,
                quantity: 0,
                orderName: [],
              };
            }
            acc[prod.fullname].quantity += prod.quantity;
            acc[prod.fullname].orderName.push(prod.orderName);
            return acc;
          }, {})
        );
      })
    );
  }
}
