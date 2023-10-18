import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadTrends } from '../store/actions/trends-list-page.actions';
import { selectOpenedEditModal, selectTrendsByProvider, selectTypeActionModal } from '../store/selectors';
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
    <ng-container *ngIf="openedEditTrend$ | async">
      <app-add-trend-modal
        *ngIf="(typeAction$ | async) === 'new'"></app-add-trend-modal>
    </ng-container>
    <app-add-trend-btn></app-add-trend-btn>
    <app-trend-popup-alert></app-trend-popup-alert>
  `,
  styleUrls: ['./trends-list.component.scss'],
})
export class TrendsListComponent implements OnInit {
  protected trends$ = this.store.select(selectTrendsByProvider);
  protected openedEditTrend$ =this.store.select(selectOpenedEditModal);
  protected typeAction$ = this.store.select(selectTypeActionModal);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadTrends());
  }
}
