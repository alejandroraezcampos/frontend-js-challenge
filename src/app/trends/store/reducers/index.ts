import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as TrendsApiActions from '../actions/trends-api.actions';
import * as TrendsEditActions from '../actions/trends-edit-page.actions';
import { Trend, TrendModified } from '../../models/trend.model';

export const trendsFeatureKey = 'trends';

export interface State extends EntityState<Trend> {
  selectedTrend: Trend | TrendModified | null;
  openedEditTrend: Boolean;
}

export const adapter: EntityAdapter<Trend> = createEntityAdapter<Trend>();

export const initialState: State = adapter.getInitialState({
  selectedTrend: null,
  openedEditTrend: false
});

export const trendsReducer = createReducer(
  initialState,
  on(TrendsApiActions.loadTrendsSuccess, (state, { trends }) => {
    return adapter.setAll(trends, state);
  }),
  on(TrendsApiActions.loadTrendsError, (state) => {
    return adapter.removeAll(state);
  }),
  on(
    TrendsApiActions.loadOneTrendSuccess,
    (state, { trend: selectedTrend }): State => {
      return { ...state, selectedTrend };
    }
  ),
  on(TrendsApiActions.loadOneTrendError, (state): State => {
    return { ...state, selectedTrend: null };
  }),
  on(TrendsEditActions.openEditTrend, (state): State => {
    return { ...state, openedEditTrend: true};
  }),
  on(TrendsEditActions.closeEditTrend, (state): State => {
    return { ...state, openedEditTrend: false};
  }),
  on(TrendsApiActions.editTrendSuccess, ( state, { trend: editedTrend }): State => {
    return {
      ...state,
      selectedTrend: {...state.selectedTrend, ...editedTrend},
      openedEditTrend: false,
    };
  })
);

export const selectSelectedTrend = (state: State) => state.selectedTrend;
export const selectOpenedEditTrend = (state: State) => state.openedEditTrend;

const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

// select the array of trend ids
export const selectTrendIds = selectIds;

// select the dictionary of trend entities
export const selectTrendEntities = selectEntities;

// select the array of trends
export const selectAllTrends = selectAll;

// select the total trend count
export const selectTrendTotal = selectTotal;
