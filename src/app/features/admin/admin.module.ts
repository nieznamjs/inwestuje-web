import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    MatToolbarModule,
  ],
})
export class AdminModule { }
