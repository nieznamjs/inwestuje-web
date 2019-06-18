import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UsersStoreModule } from './users-store/users-store.module';
import { AuthStoreModule } from './auth-store/auth-store.module';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    UsersStoreModule,
    AuthStoreModule,
  ],
})
export class RootStoreModule { }
