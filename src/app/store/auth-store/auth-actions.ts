import { Action } from '@ngrx/store';
import { CreateUserBody } from '@interfaces/http/create-user-body.inteface';

export enum AuthActionsTypes {
  LOGIN = '[IW] Login',
  LOGIN_SUCCESS = '[IW] Login Success',
  LOGIN_FAIL = '[IW] Login Fail',
  REGISTER = '[IW] Register',
  REGISTER_SUCCESS = '[IW] Register Success',
  REGISTER_FAIL = '[IW] Register Fail',
  ACTIVATE = '[IW] Activate',
  ACTIVATE_SUCCESS = '[IW] Activate Success',
  ACTIVATE_FAIL = '[IW] Activate Fail',
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

  constructor(public payload: { newUser: CreateUserBody }) {}
}

export class RegisterSuccessAction implements Action {
  readonly type = AuthActionsTypes.REGISTER_SUCCESS;
}

export class RegisterFailAction implements Action {
  readonly type = AuthActionsTypes.REGISTER_FAIL;

  constructor(public payload: { error: string }) {}
}

export class ActivateAction {
  readonly type = AuthActionsTypes.ACTIVATE;

  constructor(public payload: { userId: string, token: string }) {}
}

export class ActivateSuccessAction {
  readonly type = AuthActionsTypes.ACTIVATE_SUCCESS;
}

export class ActivateFailAction {
  readonly type = AuthActionsTypes.ACTIVATE_FAIL;

  constructor(public payload: { error: string }) {}
}

export type AuthActions =
  LoginAction
  | LoginSuccessAction
  | LoginFailAction
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailAction
  | ActivateAction
  | ActivateSuccessAction
  | ActivateFailAction;
