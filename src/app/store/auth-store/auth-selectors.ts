import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '@interfaces/ngrx/auth/auth-state.interface';

export const getIsLogging = (state: AuthState) => state.isLogging;
export const getIsRegistering = (state: AuthState) => state.isRegistering;
export const getLoginError = (state: AuthState) => state.loginError;
export const getRegisterError = (state: AuthState) => state.registerError;
export const getIsUserLogged = (state: AuthState) => state.isUserLogged;

export const authStateSelector = createFeatureSelector<AuthState>('auth');

export const selectIsLogging = createSelector(authStateSelector, getIsLogging);
export const selectIsRegistering = createSelector(authStateSelector, getIsRegistering);
export const selectLoginError = createSelector(authStateSelector, getLoginError);
export const selectRegisterError = createSelector(authStateSelector, getRegisterError);
export const selectIsUserLogged = createSelector(authStateSelector, getIsUserLogged);
