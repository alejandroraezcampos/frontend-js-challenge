import { createAction, props } from '@ngrx/store';

export const updateSidebarCollapsedState = createAction(
  '[Loader] Update Sidebar Collapse state',
  props<{ isCollapsed: boolean }>()
);
