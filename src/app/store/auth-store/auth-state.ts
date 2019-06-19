import { AuthState } from '@interfaces/ngrx/auth/auth-state.interface';

export const authInitialState: AuthState = {
  isUserLogged: false,
  loginError: null,
  registerError: null,
  isLogging: false,
  isRegistering: false,
  isUserActivated: false,
  isActivating: false,
  activateError: null,
  isInitializingPasswordReset: false,
  initResetPasswordError: null,
  isResettingPassword: false,
  resetPasswordError: null,
};
