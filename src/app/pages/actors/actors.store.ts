import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { take } from 'rxjs';
import { Actor, ActorsService } from 'src/app/shared/services';

interface CurrentPage {
  pageNum: number;
  prevPage: string | null;
  nextPage: string | null;
  actors: Actor[];
}
interface ActorsState {
  IsLoading: boolean;
  currentPage: CurrentPage | null;
  totalPages: number;
  allPages: Array<CurrentPage>; // Pages arrays by index of page
}

@Injectable({ providedIn: 'root' })
export class ActorsStore extends ComponentStore<ActorsState> {
  readonly isLoading$ = this.select((state) => state.IsLoading);
  private readonly setIsLoading = this.updater(
    (state, IsLoading: boolean): ActorsState => ({ ...state, IsLoading })
  );

  readonly totalPages$ = this.select((state) => state.totalPages);
  private readonly setTotalPages = this.updater(
    (state, totalPages: number): ActorsState => ({ ...state, totalPages })
  );

  readonly currentPage$ = this.select((state) => state.currentPage);
  private readonly setCurrentPage = this.updater(
    (state, currentPage: CurrentPage): ActorsState => ({
      ...state,
      currentPage,
    })
  );

  private readonly allPages$ = this.select((state) => state.allPages);
  private readonly addToAllPages = this.updater(
    (state, newPage: CurrentPage): ActorsState => ({
      ...state,
      allPages: [
        ...state.allPages,
        (state.allPages[newPage.pageNum] = newPage),
      ],
    })
  );

  constructor(private service: ActorsService) {
    super({ currentPage: null, allPages: [], IsLoading: false, totalPages: 0 });

    this.initializeStore();
  }

  private initializeStore() {
    this.ShowActorsOnPageUrl();
  }

  ShowActorsOnPageUrl(url?: string): void {
    const pageNum = url ? Number(new URL(url).searchParams.get('page')) : 1;
    const pageAlreadyFound = this.checkIfPageAlreadyCached(pageNum);

    if (pageAlreadyFound) {
      this.setCurrentPage(pageAlreadyFound);
      return;
    }

    this.setIsLoading(true);
    this.service.fetchActorsFromPage(pageNum).subscribe({
      next: (details) => {
        const currentPage = {
          pageNum,
          prevPage: details.previous,
          nextPage: details.next,
          actors: details.results,
        };

        this.setCurrentPage(currentPage);
        this.addToAllPages(currentPage);
        this.setTotalPages(details.total_pages);

        this.setIsLoading(false);
      },
    });
  }

  private checkIfPageAlreadyCached(pageNum: number): CurrentPage | undefined {
    let pageFound;
    this.allPages$
      .pipe(take(1))
      .subscribe(
        (pages) => (pageFound = pages.find((page) => page.pageNum === pageNum))
      );

    return pageFound;
  }
}
