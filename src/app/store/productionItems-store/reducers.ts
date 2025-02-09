import { createReducer, on } from '@ngrx/store';
import { ProductionItemsState } from './state';
import { ProductionItemsAction } from './actions';

export const ProductionItemsReducer = createReducer(
  ProductionItemsState.INIT_STATE,
  on(ProductionItemsAction.setProductionItems, (state, { productionItems }) => {
    return { ...state, productionItems };
  })
);
