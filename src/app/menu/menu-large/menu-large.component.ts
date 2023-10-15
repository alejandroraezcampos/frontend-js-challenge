import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsCollapsedState } from 'src/app/store/selectors';
import { selectTrendsTotal } from 'src/app/trends/store/selectors';

@Component({
  selector: 'app-menu-large',
  template: `
    <a class="app-logo menu__logo" routerLink="/">
      <img *ngIf="!(isCollapsed$ | async)" src="assets/Logos/aTrendsPRO.svg" alt="Logo Avantio Trends PRO" />
      <img *ngIf="isCollapsed$ | async" src="assets/Iconos/Favicon/favicon_avantio.svg" alt="Logo Avantio Trends PRO" />
    </a>

    <div class="menu__trends-counter" *ngIf="!(isCollapsed$ | async)">
      <span class="trends-counter__label">Hoy</span>
      <span class="trends-counter__count"
        >{{ trendsTotal$ | async }} Noticias</span
      >
    </div>

    <a
      [routerLink]="['/trends', { provider: 'elpais' }]"
      routerLinkActive="router-link-active"
      [routerLinkActiveOptions]="{
        matrixParams: 'exact',
        queryParams: 'exact',
        paths: 'exact',
        fragment: 'exact'
      }"
      class="menu__option"
    >
      <img *ngIf="!(isCollapsed$ | async)" src="assets/Logos/El_Pais.svg" alt="Logo de EL PAÍS" />
      <img *ngIf="isCollapsed$ | async" src="assets/Iconos/Favicon/favicon_el_pais.svg" alt="Logo de EL MUNDO">
    </a>

    <a
      [routerLink]="['/trends', { provider: 'elmundo' }]"
      routerLinkActive="router-link-active"
      [routerLinkActiveOptions]="{
        matrixParams: 'exact',
        queryParams: 'exact',
        paths: 'exact',
        fragment: 'exact'
      }"
      class="menu__option"
    >
      <img *ngIf="!(isCollapsed$ | async)" src="assets/Logos/El_Mundo.svg" alt="Logo de EL MUNDO" />
      <img *ngIf="isCollapsed$ | async" src="assets/Iconos/Favicon/favicon_el_mundo.svg" alt="Logo de EL MUNDO">
    </a>

    <span class="menu__copyright" *ngIf="!(isCollapsed$ | async)">Copyright © 2018 Avantio Trends</span>
  `,
  styleUrls: ['./menu-large.component.scss'],
})
export class MenuLargeComponent {
  protected trendsTotal$ = this.store.select(selectTrendsTotal);
  protected isCollapsed$ = this.store.select(selectIsCollapsedState);

  constructor(private store: Store) {}
}
