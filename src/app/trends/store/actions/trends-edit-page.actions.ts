import { createAction, props } from "@ngrx/store";
import { CreatedTrend, TrendEdited } from "../../models/trend.model";


export const openEditTrend = createAction(
  '[Trend/Open Edit Trend]',
  props<{ typeAction: string }>()
)

export const openNewTrend = createAction(
  '[Trend/Open New Trend]',
  props<{ typeAction: string }>()
)

export const closeEditTrend = createAction(
  `[Trend/Close Edit Trend]`,
)

export const editTrend = createAction(
  `[Trend/Save edit Trend]`,
  props<{ id: string, trend: TrendEdited }>()
)

export const newTrend = createAction(
  `[Trend/Save new Trend]`,
  props<{ trend: CreatedTrend }>()
)

export const openDeleteTrend = createAction(
  '[Trend/Open Delete Trend]',
  props<{ typeAction: string }>()
)

export const closeDeleteTrend = createAction(
  '[Trend/Close Delete Trend]',
)

export const DeleteTrend = createAction(
  '[Trend/Send Delete Trend]',
  props<{ trendId: string }>()
)

