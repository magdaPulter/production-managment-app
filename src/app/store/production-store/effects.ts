import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../../services/local-storage.service';
import { ProductionActions } from './actions';
import { EMPTY, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { ProductionState } from './state';
import { StockModel } from '../../models/stock.model';
import { ProductionModel } from '../../models/production.model';

@Injectable()
export class ProductionEffects {
  readonly actions$ = inject(Actions);
  readonly store = inject(Store);
  readonly storage = inject(LocalStorageService);
  setProductsToLocalStorage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductionActions.saveProductToLocalStorage),
        withLatestFrom(this.store.select(ProductionState.selectStockProduct)),
        tap(([, stockProducts]) =>
          this.storage.setItem('stockProducts', { stockProducts })
        )
      );
    },
    { dispatch: false }
  );

  clearLocalStorage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductionActions.clearLocalStorage),
        tap(() => this.storage.clear())
      );
    },
    {
      dispatch: false,
    }
  );

  loadStockFromLocalStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductionActions.loadProductsFromLocalStorage),
      withLatestFrom(this.store.select(ProductionState.selectProductionState)),
      switchMap(([action, state]) => {
        const productData =
          this.storage.getItem<ProductionModel>('stockProducts');
        if (productData && !state.stockProducts.length) {
          return of(
            ProductionActions.setProductToLocalStorage({
              stockProducts: productData.stockProducts,
            })
          );
        } else return EMPTY;
      })
    );
  });
}
