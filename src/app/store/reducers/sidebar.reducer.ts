import { createReducer, on } from "@ngrx/store";
import * as SidebarActions from '../actions/sidebar.actions';

export interface State {
  isCollapsed: boolean;
}
export const initialState: State = {
  isCollapsed: false,
};
export const reducer = createReducer(
  initialState,
  on(
    SidebarActions.updateSidebarState,
    (state, { isCollapsed }): State => ({ ...state, isCollapsed })
  )
);

export const selectIsCollapsedState = (state: State) => state.isCollapsed;
