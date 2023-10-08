import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSidebarReducer from '../reducers/sidebar.reducer';

export const selectLSidebarCollapsedState =
  createFeatureSelector<fromSidebarReducer.State>('sidebar');

export const selectIsCollapsedState = createSelector(
  selectLSidebarCollapsedState,
  fromSidebarReducer.selectIsCollapsedState
);
