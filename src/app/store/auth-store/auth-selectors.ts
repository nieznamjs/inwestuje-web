import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '@interfaces/ngrx/auth/auth-state.interface';

export const getIsLogging = (state: AuthState) => state.isLogging;
export const getIsRegistering = (state: AuthState) => state.isRegistering;
export const getLoginError = (state: AuthState) => state.loginError;
export const getRegisterError = (state: AuthState) => state.registerError;
export const getIsUserLogged = (state: AuthState) => state.isUserLogged;
export const getIsActivating = (state: AuthState) => state.isActivating;
export const getActivateError = (state: AuthState) => state.activateError;
export const getIsUserActivated = (state: AuthState) => state.isUserActivated;
export const getIsInitializingPasswordReset = (state: AuthState) => state.isInitializingPasswordReset;
export const getInitPasswordResetError = (state: AuthState) => state.initResetPasswordError;
export const getIsResettingPassword = (state: AuthState) => state.isResettingPassword;
export const getResetPasswordError = (state: AuthState) => state.resetPasswordError;

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
