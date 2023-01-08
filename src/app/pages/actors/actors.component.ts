import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { ActorsStore } from './actors.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  selector: 'app-actors',
  standalone: true,
  styleUrls: ['actors.component.sass'],
  template: `
    <ng-container *ngIf="currentPage$ | async as currentPage">
      <div class="actors">
        <div
          class="actor"
          *ngFor="let actor of currentPage.actors"
          [routerLink]="['/actors/' + actor.uid]"
        >
          {{ actor.name }}
        </div>
      </div>
      <div class="actions">
        <button
          *ngIf="currentPage.prevPage"
          (click)="goToPage(currentPage.prevPage)"
          [disabled]="isLoading$ | async"
        >
          PREVIOUS
        </button>
        <button
          *ngIf="currentPage.nextPage"
          (click)="goToPage(currentPage.nextPage)"
          [disabled]="isLoading$ | async"
        >
          NEXT
        </button>
      </div>

      <div class="paginator">
        Jump to page:
        <a
          *ngFor="let number of amountPages | async"
          [ngClass]="{ active: number === currentPage.pageNum }"
          (click)="
            goToPage(
              'https://www.swapi.tech/api/people?page=' + number + '&limit=10'
            )
          "
        >
          {{ number }}</a
        >
      </div>
    </ng-container>
  `,
})
export class ActorsComponent {
  currentPage$ = this.store.currentPage$;
  isLoading$ = this.store.isLoading$;
  amountPages = this.store.totalPages$.pipe(
    map((number) => Array.from({ length: number }, (v, k) => k + 1))
  );

  constructor(private store: ActorsStore) {}

  goToPage(url: string) {
    this.store.ShowActorsOnPageUrl(url);
  }
}
