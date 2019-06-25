import { AuthState } from '@interfaces/ngrx/auth/auth-state.interface';
import { AuthActions, AuthActionsTypes } from './auth-actions';
import { authInitialState } from './auth-state';

export function authReducer(state: AuthState = authInitialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionsTypes.LOGIN: {
      return {
        ...state,
        login: {
          isUserLogged: false,
          isLoading: true,
          error: null,
        },
      };
    }

    case AuthActionsTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        login: {
          ...state.login,
          isUserLogged: true,
          isLoading: false,
        },
      };
    }

    case AuthActionsTypes.LOGIN_FAIL: {
      return {
        ...state,
        login: {
          isUserLogged: false,
          isLoading: false,
          error: action.payload.error,
        },
      };
    }

    case AuthActionsTypes.REGISTER: {
      return {
        ...state,
        userRegister: {
          isLoading: true,
          error: null,
        },
      };
    }

    case AuthActionsTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        userRegister: {
          ...state.userRegister,
          isLoading: false,
        },
      };
    }

    case AuthActionsTypes.REGISTER_FAIL: {
      return {
        ...state,
        userRegister: {
          isLoading: false,
          error: action.payload.error,
        },
      };
    }

    case AuthActionsTypes.ACTIVATE: {
      return {
        ...state,
        userActivation: {
          isUserActivated: false,
          isLoading: true,
          error: null,
        },
      };
    }

    case AuthActionsTypes.ACTIVATE_SUCCESS: {
      return {
        ...state,
        userActivation: {
          ...state.userActivation,
          isLoading: false,
          isUserActivated: true,
        },
      };
    }

    case AuthActionsTypes.ACTIVATE_FAIL: {
      return {
        ...state,
        userActivation: {
          ...state.userActivation,
          isLoading: false,
          error: action.payload.error,
        },
      };
    }

    case AuthActionsTypes.RESET_PASSWORD_INIT: {
      return {
        ...state,
        initPasswordReset: {
          isLoading: true,
          error: null,
        },
      };
    }

    case AuthActionsTypes.RESET_PASSWORD_INIT_SUCCESS: {
      return {
        ...state,
        initPasswordReset: {
          ...state.initPasswordReset,
          isLoading: false,
        },
      };
    }

    case AuthActionsTypes.RESET_PASSWORD_INIT_FAIL: {
      return {
        ...state,
        initPasswordReset: {
          isLoading: false,
          error: action.payload.error,
        },
      };
    }

    case AuthActionsTypes.RESET_PASSWORD: {
      return {
        ...state,
        passwordReset: {
          isLoading: true,
          error: null,
        },
      };
    }

    case AuthActionsTypes.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordReset: {
          ...state.passwordReset,
          isLoading: false,
        },
      };
    }

    case AuthActionsTypes.RESET_PASSWORD_FAIL: {
      return {
        ...state,
        passwordReset: {
          isLoading: false,
          error: action.payload.error,
        },
      };
    }

    default: {
      return state;
    }
  }
}
