export interface AuthState {
  isUserLogged: boolean;
  isLogging: boolean;
  loginError: string | null;
  isRegistering: boolean;
  registerError: string | null;
  isActivating: boolean;
  activateError: string | null;
  isUserActivated: boolean;
}
