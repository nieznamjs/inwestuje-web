import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthDataService } from '@services/data-integration/auth-data.service';
import {
  AuthActionsTypes,
  LoginAction,
  LoginFailAction,
  LoginSuccessAction,
  RegisterAction,
  RegisterFailAction,
  RegisterSuccessAction
} from './auth-actions';
import { USER_ROLES_KEY } from '@constants/local-storage-keys';
import { LocalStorageService } from '@services/utils/local-storage.service';
import { LoginResponse } from '@interfaces/http/login-response.interface';
import { SnackbarMessages } from '@constants/snackbar-messages';
import { SnackbarService } from '@services/utils/snackbar.service';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthDataService,
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private router: Router,
    private snackbarService: SnackbarService,
  ) {}

  @Effect()
  loginEffect$: Observable<Action> = this.actions$.pipe(
    ofType<LoginAction>(AuthActionsTypes.LOGIN),
    switchMap((action: LoginAction) => {
      return this.authService.login(action.payload.email, action.payload.password)
        .pipe(
          map((response: LoginResponse) =>  {
            this.localStorageService.set<string[]>(USER_ROLES_KEY, response.userRoles);
            this.router.navigate(['/admin']);
            return new LoginSuccessAction();
          }),
          catchError((err: HttpErrorResponse) => of(new LoginFailAction({ error: err.message }))),
        );
    }),
  );

  @Effect()
  registerEffect$: Observable<Action> = this.actions$.pipe(
    ofType<RegisterAction>(AuthActionsTypes.REGISTER),
    switchMap((action: RegisterAction) => {
      return this.authService.register(action.payload.newUser)
        .pipe(
          map(() => {
            this.snackbarService.showSuccess(SnackbarMessages.AccountCreated);
            this.router.navigate(['/login']);
            return new RegisterSuccessAction();
          }),
          catchError((err: HttpErrorResponse) => of(new RegisterFailAction({ error: err.message }))),
        );
    }),
  );
}
