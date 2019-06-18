import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { MatSort, Sort } from '@angular/material';

import { UsersDataService } from '@services/data-integration/users-data.service';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@constants/tables-options';
import { User } from '@interfaces/user.interface';
import { SnackbarService } from '@services/utils/snackbar.service';
import { UsersFacade } from '@store/users-store';

@Component({
  selector: 'iw-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  private sortChangeSubscription: Subscription;

  public pageSizes = PAGE_SIZE_OPTIONS;
  public defaultPageSize = DEFAULT_PAGE_SIZE;
  public currentPage = 1;
  public currentPageSize = PAGE_SIZE_OPTIONS[0];
  public defaultSortActive = 'createdDate';
  public defaultSortDirection = 'asc';
  public displayedColumns = [
    'index', 'email', 'firstName', 'lastName', 'companyName', 'createdDate', 'type', 'roles', 'active', 'actions'
  ];
  public isLoadingUsers$: Observable<boolean>;
  public users$: Observable<User[]>;
  public usersCount$: Observable<number>;
  public usersError$: Observable<string>;
  public updatingUsersId$: Observable<string[]>;

  @ViewChild(MatSort, { static: true }) private sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) private paginator: MatPaginator;

  constructor(
    private usersService: UsersDataService,
    private snackbarService: SnackbarService,
    private usersFacade: UsersFacade,
  ) { }

  public ngOnInit(): void {
    this.users$ = this.usersFacade.users$;
    this.usersCount$ = this.usersFacade.usersCount$;
    this.isLoadingUsers$ = this.usersFacade.isLoadingUsers$;
    this.usersError$ = this.usersFacade.usersError$;
    this.updatingUsersId$ = this.usersFacade.updatingUsersId$;

    this.sortChangeSubscription = this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.usersFacade.getUsers({
      page: this.currentPage,
      pageSize: this.currentPageSize,
      orderBy: this.defaultSortActive,
      order: this.defaultSortDirection,
    });
  }

  public ngOnDestroy(): void {
    this.sortChangeSubscription.unsubscribe();
  }

  public onPaginationChange(event: PageEvent): void {
    this.usersFacade.getUsers({
      page: event.pageIndex + 1,
      pageSize: event.pageSize,
      order: this.sort.direction,
      orderBy: this.sort.active,
    });
  }

  public onSortChange(event: Sort): void {
    this.usersFacade.getUsers({
      page: this.paginator.pageIndex + 1,
      pageSize: this.paginator.pageSize,
      order: event.direction,
      orderBy: event.active,
    });
  }

  public changeActiveProperty(userToChange: User): void {
    const updatedUser = { ...userToChange, active: !userToChange.active };

    this.usersFacade.updateUser(updatedUser);
  }
}
