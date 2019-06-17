import { Action } from '@ngrx/store';

export enum AuthActionsTypes {
  LOGIN = '[IW] Login',
  LOGIN_SUCCESS = '[IW] Login Success',
  LOGIN_FAIL = '[IW] Login Fail',
  REGISTER = '[IW] Register',
  REGISTER_SUCCESS = '[IW] Register Success',
  REGISTER_FAIL = '[IW] Register Fail',
}

export class LoginAction implements Action {
  readonly type = AuthActionsTypes.LOGIN;

  constructor(public payload: { email: string, password: string }) {}
}

export class LoginSuccessAction implements Action {
  readonly type = AuthActionsTypes.LOGIN_SUCCESS;
}

export class LoginFailAction implements Action {
  readonly type = AuthActionsTypes.LOGIN_FAIL;

  constructor(public payload: { error: string }) {}
}

export class RegisterAction implements Action {
  readonly type = AuthActionsTypes.REGISTER;
}

export class RegisterSuccessAction implements Action {
  readonly type = AuthActionsTypes.REGISTER_SUCCESS;
}

export class RegisterFailAction implements Action {
  readonly type = AuthActionsTypes.REGISTER_FAIL;

  constructor(public payload: { error: string }) {}
}

export type AuthActions =
  LoginAction
  | LoginSuccessAction
  | LoginFailAction
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailAction;
