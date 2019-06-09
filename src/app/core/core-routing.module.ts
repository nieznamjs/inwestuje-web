import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTypeGuard } from './guards/user-type.guard';
import { AccountRoles } from '@constants/account-roles';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('../features/admin/admin.module').then(m => m.AdminModule),
    canLoad: [ UserTypeGuard ],
    data: {
      allowedUserRoles: [ AccountRoles.Admin ],
    },
  },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }
