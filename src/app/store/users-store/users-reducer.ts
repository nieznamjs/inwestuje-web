import { usersAdapter, usersInitialState } from './users-state';
import { UsersActions, UsersActionsTypes } from './users-actions';
import { UsersState } from '@interfaces/ngrx/users/users-state';

export function usersReducer(state = usersInitialState, action: UsersActions): UsersState {
  switch (action.type) {
    case UsersActionsTypes.GET_USERS: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case UsersActionsTypes.GET_USERS_SUCCESS: {
      return usersAdapter.addAll(action.payload.users, {
        ...state,
        isLoading: false,
        error: null,
      });
    }

    case UsersActionsTypes.GET_USERS_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }

    default: {
      return state;
    }
  }
}
