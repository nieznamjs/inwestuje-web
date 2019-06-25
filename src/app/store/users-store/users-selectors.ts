import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UsersState } from '@interfaces/ngrx/users/users-state.interface';
import { usersAdapter } from './users-state';
import { User } from '@interfaces/user.interface';

export const getError = (state: UsersState) => state.error;
export const getIsLoading = (state: UsersState) => state.isLoading;
export const getCount = (state: UsersState) => state.count;
export const getUpdatingUsersId = (state: UsersState) => state.updatingUsersId;

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectAllUsers = usersAdapter.getSelectors(selectUsersState).selectAll;
export const selectUserById = (id: string) => createSelector(selectAllUsers, (users: User[]) => {
  if (!users) { return null; }

  return users.find((user: User) => user.id === id);
});

export const selectUsersError = createSelector(selectUsersState, getError);
export const selectUsersIsLoading = createSelector(selectUsersState, getIsLoading);
export const selectUsersCount = createSelector(selectUsersState, getCount);
export const selectUpdatingUsersId = createSelector(selectUsersState, getUpdatingUsersId);
