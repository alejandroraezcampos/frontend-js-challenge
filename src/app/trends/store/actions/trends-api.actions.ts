import { createAction, props } from '@ngrx/store';

import { Trend, TrendEdited } from '../../models/trend.model';

export const loadTrendsSuccess = createAction(
  '[Trends/API] Load Trends Success',
  props<{ trends: Trend[] }>()
);

export const saveTrendSuccess = createAction(
  '[Trends/API] New Trend Success',
  props<{ trend: Trend }>()
);
export const editTrendSuccess = createAction(
  '[Trends/API] Edit Trend Success',
  props<{ trend: TrendEdited }>()
);

export const saveTrendError = createAction(
  '[Trends/API] Save Trend Error',
)

export const loadTrendsError = createAction('[Trends/API] Load Trends Error');

export const loadOneTrendSuccess = createAction(
  '[Trends/API] Load One Trend Success',
  props<{ trend: Trend }>()
);

export const loadOneTrendError = createAction(
  '[Trends/API] Load One Trend Error'
);

export const deleteTrendSuccess = createAction(
  '[Trends/API] Delete Trend Success',
  props<{ trendId: string }>()
)

export const deleteTrendError = createAction(
  '[Trends/API] Delete Trend Error',
)
