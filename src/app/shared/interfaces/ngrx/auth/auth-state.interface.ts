export interface AuthState {
  login: {
    isUserLogged: boolean;
    isLoading: boolean;
    error: string | null;
  };
  userRegister: {
    isLoading: boolean;
    error: string | null;
  };
  userActivation: {
    isUserActivated: boolean;
    isLoading: boolean;
    error: string | null;
  };
  passwordReset: {
    isLoading: boolean;
    error: string | null;
  };
  initPasswordReset: {
    isLoading: boolean;
    error: string | null;
  };
}
