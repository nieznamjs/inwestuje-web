import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';

import { AuthDataService } from '@services/data-integration/auth-data.service';
import {
  ActivateAction,
  ActivateFailAction,
  ActivateSuccessAction,
  AuthActionsTypes,
  LoginAction,
  LoginFailAction,
  LoginSuccessAction,
  RegisterAction,
  RegisterFailAction,
  RegisterSuccessAction,
  ResetPasswordAction,
  ResetPasswordFailAction,
  ResetPasswordInitAction,
  ResetPasswordInitFailAction,
  ResetPasswordInitSuccessAction,
  ResetPasswordSuccessAction
} from './auth-actions';
import { USER_ROLES_KEY } from '@constants/local-storage-keys';
import { LocalStorageService } from '@services/utils/local-storage.service';
import { LoginResponse } from '@interfaces/http/login-response.interface';
import { SnackbarMessages } from '@constants/snackbar-messages';
import { SnackbarService } from '@services/utils/snackbar.service';
import { ErrorMessages } from '@constants/error-messages';
import { INVALID_UUID_SYNTAX_ERROR_REGEX } from '@constants/regexes';

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
  public loginEffect$: Observable<Action> = this.actions$.pipe(
    ofType<LoginAction>(AuthActionsTypes.LOGIN),
    switchMap((action: LoginAction) => {
      return this.authService.login(action.payload.email, action.payload.password)
        .pipe(
          map((response: LoginResponse) =>  {
            this.localStorageService.set<string[]>(USER_ROLES_KEY, response.userRoles);
            this.router.navigate(['/admin']);
            return new LoginSuccessAction();
          }),
          catchError((err: HttpErrorResponse) => {
            let errorMessage = ErrorMessages.GeneralServerError;

            if (err.error.statusCode === 401) {
              errorMessage = ErrorMessages.Unauthorized;
            }

            return of(new LoginFailAction({ error: errorMessage }));
          }),
        );
    }),
  );

  @Effect()
  public registerEffect$: Observable<Action> = this.actions$.pipe(
    ofType<RegisterAction>(AuthActionsTypes.REGISTER),
    switchMap((action: RegisterAction) => {
      return this.authService.registerUser(action.payload.newUser)
        .pipe(
          map(() => {
            this.snackbarService.showSuccess(SnackbarMessages.AccountCreated);
            this.router.navigate(['/auth/login']);
            return new RegisterSuccessAction();
          }),
          catchError((err: HttpErrorResponse) => {
            let errorMessage = ErrorMessages.GeneralServerError;

            if (err.error.statusCode === 409) {
              errorMessage = ErrorMessages.UserAlreadyExists;
            }

            return of(new RegisterFailAction({ error: errorMessage }));
          }),
        );
    }),
  );

  @Effect()
  public activateUserEffect$: Observable<Action> = this.actions$.pipe(
    ofType<ActivateAction>(AuthActionsTypes.ACTIVATE),
    switchMap((action: ActivateAction) => {
      return this.authService.activateUser(action.payload.userId, action.payload.token)
        .pipe(
          map(() => new ActivateSuccessAction()),
          catchError((err: HttpErrorResponse) => {
            let errorMessage = ErrorMessages.GeneralServerError;

            if (err.error.statusCode === 401) {
              errorMessage = ErrorMessages.BadUrl;
            }

            return of(new ActivateFailAction({ error: errorMessage }));
          }),
        );
    }),
  );

  @Effect()
  public initPasswordReset$: Observable<Action> = this.actions$.pipe(
    ofType<ResetPasswordInitAction>(AuthActionsTypes.RESET_PASSWORD_INIT),
    switchMap((action: ResetPasswordInitAction) => {
      return this.authService.initPasswordReset(action.payload.userEmail)
        .pipe(
          map(() => new ResetPasswordInitSuccessAction()),
          catchError((err: HttpErrorResponse) => of(new ResetPasswordInitFailAction({ error: err.message }))),
          finalize(() => {
            this.snackbarService.showSuccess(SnackbarMessages.SentEmailWithPasswordReset);
            this.router.navigate(['/auth/login']);
          }),
        );
    }),
  );

  @Effect()
  public resetPassword$: Observable<Action> = this.actions$.pipe(
    ofType<ResetPasswordAction>(AuthActionsTypes.RESET_PASSWORD),
    switchMap((action: ResetPasswordAction) => {
      return this.authService.resetPassword(action.payload.userId, action.payload.newPassword, action.payload.token)
        .pipe(
          map(() => {
            this.snackbarService.showSuccess(SnackbarMessages.PasswordChanged);
            this.router.navigate(['/auth/login']);
            return new ResetPasswordSuccessAction();
          }),
          catchError((err: HttpErrorResponse) => {
            let errorMessage = ErrorMessages.GeneralServerError;

            if (err.error.statusCode === 404 || err.error.message.match(INVALID_UUID_SYNTAX_ERROR_REGEX)) {
              errorMessage = ErrorMessages.BadUrl;
            }

            return of(new ResetPasswordFailAction({ error: errorMessage }));
          }),
        );
    }),
  );
}
