import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';

import { UsersDataService } from '@services/data-integration/users-data.service';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@constants/tables-options';
import { User } from '@interfaces/user.interface';
import { SnackbarService } from '@services/utils/snackbar.service';
import { UsersFacade } from '../../../store/users-store/users-facade';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public pageSizes = PAGE_SIZE_OPTIONS;
  public defaultPageSize = DEFAULT_PAGE_SIZE;
  public lastPage = 1;
  public lastPageSize = PAGE_SIZE_OPTIONS[0];
  public displayedColumns = [ 'index', 'email', 'firstName', 'lastName', 'companyName', 'createdDate', 'active', 'actions' ];
  public isLoadingUsers$: Observable<boolean>;
  public users$: Observable<User[]>;
  public usersCount$: Observable<number>;

  constructor(
    private usersService: UsersDataService,
    private snackbarService: SnackbarService,
    private usersFacade: UsersFacade,
  ) { }

  // private getUsers(page: number, pageSize: number): Observable<GetUsersResponse> {
  //   this.isLoadingUsers = true;
  //
  //   return this.usersService.getUsers(page, pageSize).pipe(
  //     finalize(() => this.isLoadingUsers = false),
  //   );
  // }

  public ngOnInit(): void {
    this.users$ = this.usersFacade.users$;
    this.usersCount$ = this.usersFacade.usersCount$;
    this.isLoadingUsers$ = this.usersFacade.isLoadingUsers$;

    this.usersFacade.getUsers();
    // this.getUsers(this.lastPage, this.defaultPageSize).subscribe((response: GetUsersResponse) => {
    //   this.usersData = response;
    // });
  }

  public onPaginationChange(event: PageEvent): void {
    // this.getUsers(event.pageIndex + 1, event.pageSize)
    //   .pipe(
    //     tap(() => {
    //       this.lastPageSize = event.pageSize;
    //       this.lastPage = event.pageIndex + 1;
    //     }),
    //   )
    //   .subscribe((response: GetUsersResponse) => this.usersData = response);
  }

  public changeActiveProperty(userToChange: User): void {
  //   const updatedUser = { ...userToChange, active: !userToChange.active };
  //
  //   this.usersService.updateUser(updatedUser).subscribe((returnedUser: User) => {
  //     const updatedUsersData = this.usersData.data.map((user: User) => {
  //       return returnedUser.id === user.id ? returnedUser : user;
  //     });
  //
  //     this.usersData.data = updatedUsersData;
  //
  //     this.snackbarService.showSuccess(SnackbarMessages.UserUpdated);
  //   });
  }
}
