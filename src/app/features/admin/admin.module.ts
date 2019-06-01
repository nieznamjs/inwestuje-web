import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { UsersListComponent } from './users-list/users-list.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminNavComponent,
    UsersListComponent,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    MatToolbarModule,
  ],
})
export class AdminModule { }
