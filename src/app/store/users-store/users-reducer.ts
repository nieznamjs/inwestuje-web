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
      return usersAdapter.addAll(action.payload.data, {
        ...state,
        isLoading: false,
        error: null,
        count: action.payload.count,
      });
    }

    case UsersActionsTypes.GET_USERS_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }

    case UsersActionsTypes.UPDATE_USER: {
      return {
        ...state,
        updatingUsersId: [
          ...state.updatingUsersId,
          action.payload.user.id,
        ],
      };
    }

    case UsersActionsTypes.UPDATE_USER_SUCCESS: {
      return usersAdapter.updateOne({ id: action.payload.user.id, changes: action.payload.user }, {
        ...state,
        updatingUsersId: state.updatingUsersId.filter((id: string) => id !== action.payload.user.id),
      });
    }

    case UsersActionsTypes.UPDATE_USER_FAIL: {
      return {
        ...state,
        isLoading: false,
        updatingUsersId: state.updatingUsersId.filter((id: string) => id !== action.payload.userId),
      };
    }

    default: {
      return state;
    }
  }
}
