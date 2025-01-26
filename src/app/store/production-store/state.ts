import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StockModel } from '../../models/stock.model';

export interface ProductionState {
  readonly stockProduct: StockModel[];
}

export namespace ProductionState {
  export const INIT_STATE: ProductionState = {
    stockProduct: [],
  };

  export const selectProductionState =
    createFeatureSelector<ProductionState>('production');
  export const selectStockProduct = createSelector(
    selectProductionState,
    (state: ProductionState) => state.stockProduct
  );
}
