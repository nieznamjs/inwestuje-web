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
  RESET_PASSWORD_INIT = '[IW] Reset Password Init',
  RESET_PASSWORD_INIT_SUCCESS = '[IW] Reset Password Init Success',
  RESET_PASSWORD_INIT_FAIL = '[IW] Reset Password Init Fail',
  RESET_PASSWORD = '[IW] Reset Password',
  RESET_PASSWORD_SUCCESS = '[IW] Reset Password Success',
  RESET_PASSWORD_FAIL = '[IW] Reset Password Fail',
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

export class ActivateAction  implements Action {
  readonly type = AuthActionsTypes.ACTIVATE;

  constructor(public payload: { userId: string, token: string }) {}
}

export class ActivateSuccessAction  implements Action {
  readonly type = AuthActionsTypes.ACTIVATE_SUCCESS;
}

export class ActivateFailAction  implements Action {
  readonly type = AuthActionsTypes.ACTIVATE_FAIL;

  constructor(public payload: { error: string }) {}
}

export class ResetPasswordInitAction implements Action {
  readonly type = AuthActionsTypes.RESET_PASSWORD_INIT;

  constructor(public payload: { userEmail: string }) {}
}

export class ResetPasswordInitSuccessAction implements Action {
  readonly type = AuthActionsTypes.RESET_PASSWORD_INIT_SUCCESS;
}

export class ResetPasswordInitFailAction implements Action {
  readonly type = AuthActionsTypes.RESET_PASSWORD_INIT_FAIL;

  constructor(public payload: { error: string }) {}
}

export class ResetPasswordAction implements Action {
  readonly type = AuthActionsTypes.RESET_PASSWORD;

  constructor(public payload: { userId: string, newPassword: string, token: string }) {}
}

export class ResetPasswordSuccessAction implements Action {
  readonly type = AuthActionsTypes.RESET_PASSWORD_SUCCESS;
}

export class ResetPasswordFailAction implements Action {
  readonly type = AuthActionsTypes.RESET_PASSWORD_FAIL;

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
  | ActivateFailAction
  | ResetPasswordInitAction
  | ResetPasswordInitSuccessAction
  | ResetPasswordInitFailAction
  | ResetPasswordAction
  | ResetPasswordSuccessAction
  | ResetPasswordFailAction;
