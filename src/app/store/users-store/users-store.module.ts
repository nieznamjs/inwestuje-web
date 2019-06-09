import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { usersReducer } from './users-reducer';
import { UsersEffects } from './users-effects';
import { UsersFacade } from './users-facade';

@NgModule({
  imports: [
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
  providers: [
    UsersEffects,
    UsersFacade,
  ],
})
export class UsersStoreModule { }
