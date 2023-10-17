import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadTrends } from '../store/actions/trends-list-page.actions';
import { selectOpenedEditModal, selectTrendsByProvider } from '../store/selectors';
import { selectIsCollapsedState } from 'src/app/store/selectors/sidebar.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trends-list',
  template: `
    <article class="trend" *ngFor="let trend of trends$ | async">
      <a class="trend__link" routerLink="/trends/{{ trend.id }}">
        <figure class="trend__figure">
          <img class="trend__image" [src]="trend.image" [alt]="trend.title" />
          <figcaption class="trend__title">
            <h2>{{ trend.title }}</h2>
          </figcaption>
        </figure>
        <p class="trend__excerpt">{{ trend.body[0] }}</p>
      </a>
    </article>
    <app-trend-edit *ngIf="openedEditTrend$ | async"></app-trend-edit>
    <app-add-trend-btn></app-add-trend-btn>
  `,
  styleUrls: ['./trends-list.component.scss'],
})
export class TrendsListComponent implements OnInit {
  protected trends$ = this.store.select(selectTrendsByProvider);
  protected openedEditTrend$: Observable<boolean> = this.store.select(selectOpenedEditModal);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadTrends());
  }
}
