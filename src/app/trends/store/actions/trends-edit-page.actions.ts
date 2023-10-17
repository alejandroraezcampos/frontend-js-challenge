import { createAction, props } from "@ngrx/store";
import { Trend, TrendModified } from "../../models/trend.model";

export const openEditTrend = createAction(
  '[Trend/Open Edit Trend]',
)
export const closeEditTrend = createAction(
  `[Trend/Close Edit Trend]`,
)

export const editTrend = createAction(
  `[Trend/Save edit Trend]`,
  props<{ id: string, trend: TrendModified }>()
)

export const newTrend = createAction(
  `[Trend/Save new Trend]`,
  props<{ trend: Trend }>()
)

