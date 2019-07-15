import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTypeGuard } from './guards/user-type.guard';
import { AccountRoles } from '@constants/account-roles';
import { PageNotFoundComponent } from '@components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('../features/admin/admin.module').then(m => m.AdminModule),
    canLoad: [ UserTypeGuard ],
    data: {
      allowedUserRoles: [ AccountRoles.Admin ],
    },
  },
  { path: 'auth', loadChildren: () => import('../features/auth/auth.module').then(m => m.AuthModule) },
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }
