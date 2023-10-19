import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { routerNavigationAction } from '@ngrx/router-store';

import * as TrendsApiActions from '../actions/trends-api.actions';
import * as TrendsListPageActions from '../actions/trends-list-page.actions';
import * as TrendsEditPageActions from '../actions/trends-edit-page.actions';

import { TrendService } from '../../trend.service';
import { Trend } from '../../models/trend.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class TrendsEffects {
  loadTrends$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsListPageActions.loadTrends),
      mergeMap(() =>
        this.trendService.getAll().pipe(
          map((trends) => TrendsApiActions.loadTrendsSuccess({ trends })),
          catchError(() => of(TrendsApiActions.loadTrendsError()))
        )
      )
    );
  });

  loadOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigationAction),
      filter(({ payload }) => /^\/trends\/[a-z0-9]+$/.test(payload.event.url)),
      map(({ payload }) => payload.routerState.root.firstChild?.params['id']),
      switchMap((id: string) =>
        this.trendService.getOne(id).pipe(
          map((trend) => TrendsApiActions.loadOneTrendSuccess({ trend })),
          catchError(() => of(TrendsApiActions.loadOneTrendError()))
        )
      )
    );
  });


  editTrend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrendsEditPageActions.editTrend),
      switchMap(({ id, trend }) => {
        this.store.dispatch(TrendsEditPageActions.closeEditTrend());
        return this.trendService.edit(id, trend).pipe(
          map((success) => {
            this.store.dispatch(TrendsEditPageActions.openPopupAlert({ textAlert: 'Noticia editada correctamente'}));
            return success
            ? TrendsApiActions.editTrendSuccess({ trend })
            : TrendsApiActions.saveTrendError()
          }),
          catchError(() => of(TrendsApiActions.loadTrendsError()))
        );
      })
    )
  );

  deleteTrend$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TrendsEditPageActions.DeleteTrend),
    switchMap(({ trendId }) => {
        this.store.dispatch(TrendsEditPageActions.closeDeleteTrend())
        return this.trendService.delete(trendId).pipe(
          map(() => {
            this.router.navigate(['/trends'])
            this.store.dispatch(TrendsEditPageActions.openPopupAlert({ textAlert: 'Noticia eliminada correctamente'}));
            return TrendsApiActions.deleteTrendSuccess({ trendId})
          }),
          catchError(() => of(TrendsApiActions.saveTrendError()))
        );
      })
    )
  );


  createTrend$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TrendsEditPageActions.newTrend),
    switchMap(({ trend }) => {
        this.store.dispatch(TrendsEditPageActions.closeEditTrend())
        return this.trendService.add(trend).pipe(
          map((trend) => {
            this.router.navigate(['/trends'])
            this.store.dispatch(TrendsEditPageActions.openPopupAlert({ textAlert: 'Noticia creada correctamente' }));
            return TrendsApiActions.saveTrendSuccess({ trend})
          }),
          catchError(() => of(TrendsApiActions.saveTrendError()))
        );
      },)
  )
  );


  constructor(
    private actions$: Actions,
    private router: Router,
    private trendService: TrendService,
    private store: Store) {}
}
