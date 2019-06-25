import { AuthState } from '@interfaces/ngrx/auth/auth-state.interface';

export const authInitialState: AuthState = {
  login: {
    isUserLogged: false,
    isLoading: false,
    error: null,
  },
  userRegister: {
    isLoading: false,
    error: null,
  },
  userActivation: {
    isUserActivated: false,
    isLoading: false,
    error: null,
  },
  initPasswordReset: {
    isLoading: false,
    error: null,
  },
  passwordReset: {
    isLoading: false,
    error: null,
  },
};
