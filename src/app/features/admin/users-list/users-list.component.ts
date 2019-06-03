import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { UsersDataService } from '@services/data-integration/users-data.service';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@constants/tables-options';
import { GetUsersResponse } from '@interfaces/http/get-users-response.interface';
import { User } from '@interfaces/user.interface';
import { DialogService } from '@services/utils/dialog.service';
import { ConfirmDialogMessages } from '@constants/confirm-dialog-messages';
import { SnackbarService } from '@services/utils/snackbar.service';
import { SnackbarMessages } from '@constants/snackbar-messages';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public isLoadingUsers = false;
  public pageSizes = PAGE_SIZE_OPTIONS;
  public defaultPageSize = DEFAULT_PAGE_SIZE;
  public lastPage = 1;
  public lastPageSize = PAGE_SIZE_OPTIONS[0];
  public displayedColumns = [ 'index', 'email', 'displayName', 'createdDate', 'actions' ];
  public usersData: GetUsersResponse;

  constructor(
    private usersService: UsersDataService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
  ) { }

  private getUsers(page: number, pageSize: number): Observable<GetUsersResponse> {
    this.isLoadingUsers = true;

    return this.usersService.getUsers(page, pageSize).pipe(
      finalize(() => this.isLoadingUsers = false),
    );
  }

  public ngOnInit(): void {
    this.getUsers(this.lastPage, this.defaultPageSize).subscribe((response: GetUsersResponse) => {
      this.usersData = response;
    });
  }

  public onPaginationChange(event: PageEvent): void {
    this.getUsers(event.pageIndex + 1, event.pageSize)
      .pipe(
        tap(() => {
          this.lastPageSize = event.pageSize;
          this.lastPage = event.pageIndex + 1;
        }),
      )
      .subscribe((response: GetUsersResponse) => this.usersData = response);
  }

  public editUser(user: User): void {
    const dialogRef = this.dialogService.openEditUserDialog(user);

    dialogRef.afterClosed().subscribe((editedUser: User) => {
      if (editedUser) {
        console.log(editedUser);
      }
    });
  }

  public deleteUser(user: User): void {
    const dialogRef = this.dialogService.openConfirmDialog(`${ConfirmDialogMessages.DeleteUser} ${user.email}`);

    dialogRef.afterClosed().subscribe((value: boolean) => {
      if (value) {
        this.usersService.deleteUser(user.id).subscribe(() => {
          this.snackbarService.showSuccess(SnackbarMessages.UserDeleted);

          this.getUsers(this.lastPage, this.lastPageSize)
            .subscribe((response: GetUsersResponse) => this.usersData = response);
        });
      }
    });
  }
}
