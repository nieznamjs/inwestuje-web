import { Action } from '@ngrx/store';
import { User } from '@interfaces/user.interface';
import { GetAllResponse } from '@interfaces/http/get-all-response';
import { GetAllRequestConfig } from '@interfaces/get-all-request-config';

export enum UsersActionsTypes {
  GET_USERS = '[IW] Get Users',
  GET_USERS_SUCCESS = '[IW] Get Users Success',
  GET_USERS_FAIL = '[IW] Get Users Fail',
  UPDATE_USER = '[IW] Update User',
  UPDATE_USER_SUCCESS = '[IW] Update User Success',
}

export class GetUsersAction implements Action {
  readonly type = UsersActionsTypes.GET_USERS;

  constructor(public payload: Partial<GetAllRequestConfig>) {}
}

export class GetUsersActionSuccess implements Action {
  readonly type = UsersActionsTypes.GET_USERS_SUCCESS;

  constructor(public payload: GetAllResponse<User>) {}
}

export class GetUsersActionFail implements Action {
  readonly type = UsersActionsTypes.GET_USERS_FAIL;

  constructor(public payload: { error: string }) {}
}

export class UpdateUserAction implements Action {
  readonly type = UsersActionsTypes.UPDATE_USER;

  constructor(public payload: { user: User }) {}
}

export class UpdateUserActionSuccess implements Action {
  readonly type = UsersActionsTypes.UPDATE_USER_SUCCESS;

  constructor(public payload: { user: User }) {}
}

export type UsersActions =
  GetUsersAction
  | GetUsersActionSuccess
  | GetUsersActionFail
  | UpdateUserAction
  | UpdateUserActionSuccess;
