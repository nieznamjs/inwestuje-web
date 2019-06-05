import { Action } from '@ngrx/store';
import { User } from '@interfaces/user.interface';

export enum UsersActionsTypes {
  GET_USERS = '[IW] Get Users',
  GET_USERS_SUCCESS = '[IW] Get Users Success',
  GET_USERS_FAIL = '[IW] Get Users Fail',
}

export class GetUsersAction implements Action {
  readonly type = UsersActionsTypes.GET_USERS;
}

export class GetUsersActionSuccess implements Action {
  readonly type = UsersActionsTypes.GET_USERS_SUCCESS;
  constructor(public payload: {
    users: User[],
    count: number,
  }) {}
}

export class GetUsersActionFail implements Action {
  readonly type = UsersActionsTypes.GET_USERS_FAIL;
  constructor(public payload: { error: string }) {}
}

export type UsersActions = GetUsersAction | GetUsersActionSuccess | GetUsersActionFail;
