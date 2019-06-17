export interface AuthState {
  isLogging: boolean;
  isRegistering: boolean;
  loginError: string | null;
  registerError: string | null;
  isUserLogged: boolean;
}
