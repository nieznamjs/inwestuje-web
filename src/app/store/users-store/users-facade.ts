import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UsersState } from '@interfaces/ngrx/users/users-state';
import { selectAllUsers, selectUpdatingUsersId, selectUsersCount, selectUsersError, selectUsersIsLoading } from './users-selectors';
import { GetUsersAction, UpdateUserAction } from './users-actions';
import { GetAllRequestConfig } from '@interfaces/get-all-request-config';
import { User } from '@interfaces/user.interface';

@Injectable()
export class UsersFacade {
  public users$ = this.store.select(selectAllUsers);
  public usersCount$ = this.store.select(selectUsersCount);
  public isLoadingUsers$ = this.store.select(selectUsersIsLoading);
  public usersError$ = this.store.select(selectUsersError);
  public updatingUsersId$ = this.store.select(selectUpdatingUsersId);

  constructor(private store: Store<UsersState>) {}

  public getUsers(config: Partial<GetAllRequestConfig>): void {
    this.store.dispatch(new GetUsersAction(config));
  }

  public updateUser(user: User): void {
    this.store.dispatch(new UpdateUserAction({ user }));
  }
}
