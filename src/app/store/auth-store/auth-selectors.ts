import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '@interfaces/ngrx/auth/auth-state.interface';

export const getIsUserLogged = (state: AuthState) => state.login.isUserLogged;
export const getIsLogging = (state: AuthState) => state.login.isLoading;
export const getLoginError = (state: AuthState) => state.login.error;
export const getIsRegistering = (state: AuthState) => state.userRegister.isLoading;
export const getRegisterError = (state: AuthState) => state.userRegister.error;
export const getIsUserActivated = (state: AuthState) => state.userActivation.isUserActivated;
export const getIsActivating = (state: AuthState) => state.userActivation.isLoading;
export const getActivateError = (state: AuthState) => state.userActivation.error;
export const getIsInitializingPasswordReset = (state: AuthState) => state.initPasswordReset.isLoading;
export const getInitPasswordResetError = (state: AuthState) => state.initPasswordReset.error;
export const getIsResettingPassword = (state: AuthState) => state.passwordReset.isLoading;
export const getResetPasswordError = (state: AuthState) => state.passwordReset.error;

export const authStateSelector = createFeatureSelector<AuthState>('auth');

export const selectIsLogging = createSelector(authStateSelector, getIsLogging);
export const selectIsRegistering = createSelector(authStateSelector, getIsRegistering);
export const selectLoginError = createSelector(authStateSelector, getLoginError);
export const selectRegisterError = createSelector(authStateSelector, getRegisterError);
export const selectIsUserLogged = createSelector(authStateSelector, getIsUserLogged);
export const selectIsActivating = createSelector(authStateSelector, getIsActivating);
export const selectActivateError = createSelector(authStateSelector, getActivateError);
export const selectIsUserActivated = createSelector(authStateSelector, getIsUserActivated);
export const selectIsInitializingPasswordReset = createSelector(authStateSelector, getIsInitializingPasswordReset);
export const selectInitPasswordResetError = createSelector(authStateSelector, getInitPasswordResetError);
export const selectIsResettingPassword = createSelector(authStateSelector, getIsResettingPassword);
export const selectResetPasswordError = createSelector(authStateSelector, getResetPasswordError);
