import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProductionsItemSummary } from '../../models/productionsItem.model';

export const ProductionItemsAction = createActionGroup({
  source: 'ProductionItems',
  events: {
    'Set production items': props<{
      productionItems: ProductionsItemSummary[];
    }>(),
    'Update production item': emptyProps(),
    'Set production ites to local storage': props<{
      productionItems: ProductionsItemSummary[];
    }>(),
    'Save production item to local storage': emptyProps(),
    'Clear local storage': emptyProps(),
    'Load production item from local storage': emptyProps(),
  },
});
