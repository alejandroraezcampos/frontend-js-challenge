import { createAction, props } from '@ngrx/store';

export const updateSidebarState = createAction(
  '[Loader] Update Sidebar Collapse state',
  props<{ isCollapsed: boolean }>()
);
