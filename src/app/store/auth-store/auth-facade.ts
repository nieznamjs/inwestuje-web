import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthState } from '@interfaces/ngrx/auth/auth-state.interface';
import {
  selectActivateError,
  selectInitPasswordResetError,
  selectIsActivating,
  selectIsInitializingPasswordReset,
  selectIsLogging,
  selectIsRegistering,
  selectIsResettingPassword,
  selectIsUserActivated,
  selectIsUserLogged,
  selectLoginError,
  selectRegisterError,
  selectResetPasswordError,
} from './auth-selectors';
import { ActivateAction, LoginAction, RegisterAction, ResetPasswordAction, ResetPasswordInitAction } from './auth-actions';
import { CreateUserBody } from '@interfaces/http/create-user-body.inteface';

@Injectable()
export class AuthFacade {
  public isUserLogged$ = this.store.select(selectIsUserLogged);
  public isLogging$ = this.store.select(selectIsLogging);
  public loginError$ = this.store.select(selectLoginError);
  public isRegistering$ = this.store.select(selectIsRegistering);
  public registerError$ = this.store.select(selectRegisterError);
  public isActivating$ = this.store.select(selectIsActivating);
  public userActivationError$ = this.store.select(selectActivateError);
  public isUserActivated$ = this.store.select(selectIsUserActivated);
  public isInitializingPasswordReset$ = this.store.select(selectIsInitializingPasswordReset);
  public initPasswordResetError$ = this.store.select(selectInitPasswordResetError);
  public isResettingPassword$ = this.store.select(selectIsResettingPassword);
  public resetPasswordError$ = this.store.select(selectResetPasswordError);

  constructor(private store: Store<AuthState>) {}

  public login(email: string, password: string): void {
    this.store.dispatch(new LoginAction({ email, password }));
  }

  public registerUser(newUser: CreateUserBody): void {
    this.store.dispatch(new RegisterAction({ newUser }));
  }

  public activateUser(userId: string, token: string): void {
    this.store.dispatch(new ActivateAction({ userId, token }));
  }

  public initPasswordReset(userEmail: string): void {
    this.store.dispatch(new ResetPasswordInitAction({ userEmail }));
  }

  public resetPassword(userId: string, newPassword: string, token: string): void {
    this.store.dispatch(new ResetPasswordAction({ userId, newPassword, token }));
  }
}
