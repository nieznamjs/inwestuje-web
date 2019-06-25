import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PaymentFormComponent } from './register/payment-form/payment-form.component';
import { UserDataFormComponent } from './register/user-data-form/user-data-form.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { ResetPasswordInitComponent } from './reset-password-init/reset-password-init.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PaymentFormComponent,
    UserDataFormComponent,
    ActivateAccountComponent,
    ResetPasswordInitComponent,
    ResetPasswordComponent,
    AuthComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule,
  ],
  exports: [
    AuthRoutingModule,
  ],
})
export class AuthModule { }
