import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthState } from '@interfaces/ngrx/auth/auth-state.interface';
import { selectIsLogging, selectIsRegistering, selectIsUserLogged, selectLoginError, selectRegisterError } from './auth-selectors';

@Injectable()
export class AuthFacade {
  public isLogging$ = this.store.select(selectIsLogging);
  public isRegistering$ = this.store.select(selectIsRegistering);
  public loginError$ = this.store.select(selectLoginError);
  public registerError$ = this.store.select(selectRegisterError);
  public isUserLogged = this.store.select(selectIsUserLogged);

  constructor(private store: Store<AuthState>) {}
}
