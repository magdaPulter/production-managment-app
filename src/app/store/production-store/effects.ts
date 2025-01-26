import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../../services/local-storage.service';
import { ProductionActions } from './actions';
import { EMPTY, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { ProductionState } from './state';
import { StockModel } from '../../models/stock.model';

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
        tap(([, products]) =>
          this.storage.setItem('stockProducts', { products })
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
        const productData = this.storage.getItem<StockModel[]>('stockProducts');
        if (productData && !state.stockProduct.length) {
          return of(
            ProductionActions.setProductToLocalStorage({
              stockProduct: productData,
            })
          );
        } else return EMPTY;
      })
    );
  });
}
