import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { ResetPasswordInitComponent } from './reset-password-init/reset-password-init.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password-init', component: ResetPasswordInitComponent },
  { path: 'activate-account/:userId', component: ActivateAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
