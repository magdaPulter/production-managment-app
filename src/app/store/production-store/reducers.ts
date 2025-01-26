import { createReducer, on } from '@ngrx/store';
import { ProductionState } from './state';
import { ProductionActions } from './actions';

export const ProductionReducer = createReducer(
  ProductionState.INIT_STATE,
  on(ProductionActions.addProductToStock, (state, action) => {
    return {
      ...state,
      stockProduct: [...state.stockProduct, action.stockProduct],
    };
  }),
  on(ProductionActions.setProductToLocalStorage, (state, { stockProduct }) => {
    return { ...state, stockProduct };
  }),
  on(ProductionActions.clearLocalStorage, (state) => {
    return { ...state, stockProduct: [] };
  })
);
