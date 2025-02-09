import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductionsItemSummary } from '../../models/productionsItem.model';

export interface ProductionItemsState {
  readonly productionItems: ProductionsItemSummary[];
}

export namespace ProductionItemsState {
  export const INIT_STATE: ProductionItemsState = {
    productionItems: [],
  };
  export const selectProductionItemsState =
    createFeatureSelector<ProductionItemsState>('productionItems');

  export const selectProductionItem = createSelector(
    selectProductionItemsState,
    (state: ProductionItemsState) => state.productionItems
  );
}
