import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'users', component: UsersListComponent },
      { path: '', pathMatch: 'full', redirectTo: '/admin/users' },
      { path: '**', redirectTo: '/admin/users' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
