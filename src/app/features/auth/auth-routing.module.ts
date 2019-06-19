import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { ResetPasswordInitComponent } from './reset-password-init/reset-password-init.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'init-reset-password', component: ResetPasswordInitComponent },
  { path: 'reset-password/:userId', component: ResetPasswordComponent },
  { path: 'activate-account/:userId', component: ActivateAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
