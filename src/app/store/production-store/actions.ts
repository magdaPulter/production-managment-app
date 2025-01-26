import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { StockModel } from '../../models/stock.model';

export const ProductionActions = createActionGroup({
  source: 'Production',
  events: {
    'Add product to stock': props<{ stockProduct: StockModel }>(),
    'Remove product from stock': props<{ stockProductId: string }>(),
    'Set product to local storage': props<{ stockProduct: StockModel[] }>(),
    'Save product to local storage': emptyProps(),
    'Clear local storage': emptyProps(),
    'Load products from local storage': emptyProps(),
  },
});
