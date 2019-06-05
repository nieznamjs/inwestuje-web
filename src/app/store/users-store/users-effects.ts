import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { UsersDataService } from '@services/data-integration/users-data.service';
import { GetUsersAction, GetUsersActionFail, GetUsersActionSuccess, UsersActionsTypes } from './users-actions';
import { GetUsersResponse } from '@interfaces/http/get-users-response.interface';

@Injectable()
export class UsersEffects {
  constructor(
    private userService: UsersDataService,
    private actions$: Actions,
  ) {}

  @Effect()
  getUsersEffect$: Observable<Action> = this.actions$.pipe(
    ofType<GetUsersAction>(UsersActionsTypes.GET_USERS),
    startWith(new GetUsersAction()),
    switchMap(() => {
      return this.userService.getUsers(1, 5)
        .pipe(
          map((response: GetUsersResponse) => new GetUsersActionSuccess({ users: response.data, count: response.count })),
          catchError(error => of(new GetUsersActionFail({ error }))),
        );
    }),
  );
}
