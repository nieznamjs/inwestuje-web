import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { PaymentFormComponent } from './register/payment-form/payment-form.component';
import { UserDataFormComponent } from './register/user-data-form/user-data-form.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PaymentFormComponent,
    UserDataFormComponent,
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
