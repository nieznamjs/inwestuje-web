import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UsersState } from '@interfaces/ngrx/users/users-state';
import { selectAllUsers, selectUsersCount, selectUsersIsLoading } from './users-selectors';
import { GetUsersAction } from './users-actions';

@Injectable()
export class UsersFacade {
  public users$ = this.store.select(selectAllUsers);
  public usersCount$ = this.store.select(selectUsersCount);
  public isLoadingUsers$ = this.store.select(selectUsersIsLoading);

  constructor(private store: Store<UsersState>) {}

  public getUsers(): void {
    this.store.dispatch(new GetUsersAction());
  }
}
