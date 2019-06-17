import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthDataService } from '@services/data-integration/auth-data.service';
import { AuthActionsTypes, LoginAction, LoginFailAction, LoginSuccessAction } from './auth-actions';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthDataService,
    private actions$: Actions,
  ) {}

  @Effect()
  loginEffect$: Observable<Action> = this.actions$.pipe(
    ofType<LoginAction>(AuthActionsTypes.LOGIN),
    switchMap((action: LoginAction) => {
      return this.authService.login(action.payload.email, action.payload.password)
        .pipe(
          map(() => new LoginSuccessAction()),
          catchError((err: HttpErrorResponse) => of(new LoginFailAction({ error: err.message }))),
        );
    }),
  );
}
