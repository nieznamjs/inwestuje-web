import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { UsersDataService } from '@services/data-integration/users-data.service';
import {
  GetUsersAction,
  GetUsersActionFail,
  GetUsersActionSuccess,
  UpdateUserAction, UpdateUserActionFail,
  UpdateUserActionSuccess,
  UsersActionsTypes
} from './users-actions';
import { GetAllResponse } from '@interfaces/http/get-all-response';
import { User } from '@interfaces/user.interface';
import { SnackbarService } from '@services/utils/snackbar.service';
import { SnackbarMessages } from '@constants/snackbar-messages';

@Injectable()
export class UsersEffects {
  constructor(
    private userService: UsersDataService,
    private actions$: Actions,
    private snackbarService: SnackbarService,
  ) {}

  @Effect()
  getUsersEffect$: Observable<Action> = this.actions$.pipe(
    ofType<GetUsersAction>(UsersActionsTypes.GET_USERS),
    switchMap((action: GetUsersAction) => {
      return this.userService.getUsers(action.payload)
        .pipe(
          map((response: GetAllResponse<User>) => new GetUsersActionSuccess({ data: response.data, count: response.count })),
          catchError(error => of(new GetUsersActionFail({ error: error.message }))),
        );
    }),
  );

  @Effect()
  updateUserEffect$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateUserAction>(UsersActionsTypes.UPDATE_USER),
    mergeMap((action: UpdateUserAction) => {
      return this.userService.updateUser(action.payload.user)
        .pipe(
          map((user: User) => {
            this.snackbarService.showSuccess(SnackbarMessages.UserUpdated);
            return new UpdateUserActionSuccess({ user });
          }),
          catchError(() => {
            this.snackbarService.showError(SnackbarMessages.UserUpdateFail);
            return of(new UpdateUserActionFail({ userId: action.payload.user.id }));
          }),
        );
    })
  );
}
