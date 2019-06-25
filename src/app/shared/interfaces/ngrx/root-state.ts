import { UsersState } from '@interfaces/ngrx/users/users-state.interface';
import { AuthState } from '@interfaces/ngrx/auth/auth-state.interface';

export interface State {
  users: UsersState;
  auth: AuthState;
}
