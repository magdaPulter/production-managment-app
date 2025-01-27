import { createReducer, on } from '@ngrx/store';
import { ProductionState } from './state';
import { ProductionActions } from './actions';

export const ProductionReducer = createReducer(
  ProductionState.INIT_STATE,
  on(ProductionActions.addProductToStock, (state, action) => {
    return {
      ...state,
      stockProducts: [...state.stockProducts, action.stockProduct],
    };
  }),
  on(ProductionActions.setProductToLocalStorage, (state, { stockProducts }) => {
    return { ...state, stockProducts };
  }),
  on(ProductionActions.clearLocalStorage, (state) => {
    return { ...state, stockProduct: [] };
  })
);
