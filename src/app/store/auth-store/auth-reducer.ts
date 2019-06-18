import { AuthState } from '@interfaces/ngrx/auth/auth-state.interface';
import { AuthActions, AuthActionsTypes } from './auth-actions';
import { authInitialState } from './auth-state';

export function authReducer(state: AuthState = authInitialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionsTypes.LOGIN: {
      return {
        ...state,
        isLogging: true,
      };
    }

    case AuthActionsTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isLogging: false,
        isUserLogged: true,
        loginError: null,
      };
    }

    case AuthActionsTypes.LOGIN_FAIL: {
      return {
        ...state,
        isLogging: false,
        loginError: action.payload.error,
      };
    }

    case AuthActionsTypes.REGISTER: {
      return {
        ...state,
        isRegistering: true,
      };
    }

    case AuthActionsTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        isRegistering: false,
        registerError: null,
      };
    }

    case AuthActionsTypes.REGISTER_FAIL: {
      return {
        ...state,
        isRegistering: false,
        registerError: action.payload.error,
      };
    }

    default: {
      return state;
    }
  }
}
