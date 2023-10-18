import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as TrendsApiActions from '../actions/trends-api.actions';
import * as TrendsEditActions from '../actions/trends-edit-page.actions';
import { Trend, TrendEdited } from '../../models/trend.model';

export const trendsFeatureKey = 'trends';
export interface PopupAlert {
  isShowPopup: boolean,
  textAlert?: string | null,
}
export interface State extends EntityState<Trend> {
  selectedTrend: Trend | TrendEdited | null;
  openedEditTrend: boolean;
  PopupAlert: PopupAlert;
  typeActionModal: string | null;
}

export const adapter: EntityAdapter<Trend> = createEntityAdapter<Trend>();

export const initialState: State = adapter.getInitialState({
  selectedTrend: null,
  typeActionModal: null,
  PopupAlert: {isShowPopup: false},
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
  on(TrendsEditActions.openEditTrend, (state, { typeAction: action }): State => {
    return { ...state, openedEditTrend: true, typeActionModal: action};
  }),
  on(TrendsEditActions.openNewTrend, ( state, { typeAction: action } ): State => {
    return { ...state, openedEditTrend: true, typeActionModal: action  }
  }),
  on(TrendsEditActions.openDeleteTrend, ( state, {typeAction: action }): State => {
    return { ...state, openedEditTrend: true, typeActionModal: action }
  }),
  on(TrendsEditActions.closeEditTrend, (state): State => {
    return { ...state,
      openedEditTrend: false,
      typeActionModal: null };
  }),
  on(TrendsApiActions.editTrendSuccess, ( state, { trend }): State => {
    return adapter.updateOne({id: trend.id, changes: trend }, state)
  }),
  on(TrendsApiActions.saveTrendSuccess, ( state, { trend }): State => {
    return adapter.addOne( trend, state);
  }),
  on(TrendsApiActions.deleteTrendSuccess, ( state, { trendId }): State => {
    return adapter.removeOne(trendId, state );
  }),
  on(TrendsEditActions.openPopupAlert, (state, { textAlert }): State => {
    return { ...state,
      PopupAlert: {
        isShowPopup: true,
        textAlert}};
  }),
  on(TrendsEditActions.closePopupAlert, (state ): State => {
    return { ...state,
      PopupAlert: {
        isShowPopup: false,
        textAlert: null }};
  })
);

export const selectSelectedTrend = (state: State) => state.selectedTrend;
export const selectOpenedEditTrend = (state: State) => state.openedEditTrend;
export const selectTypeActionModal = (state: State) => state.typeActionModal;
export const selectIsShowpopupAlert = (state: State) => state.PopupAlert.isShowPopup;
export const selectPopupAlert = (state: State) => state.PopupAlert;

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
