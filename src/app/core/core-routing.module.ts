import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserTypeGuard } from './guards/user-type.guard';
import { AccountRoles } from '@constants/account-roles';
import { AppGuard } from './guards/app.guard';
import { PageNotFoundComponent } from '@components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('../features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'app', loadChildren: () => import('../features/search/search.module').then(m => m.SearchModule), canLoad: [ AppGuard ] },
  {
    path: 'admin',
    loadChildren: () => import('../features/admin/admin.module').then(m => m.AdminModule),
    canLoad: [ UserTypeGuard ],
    data: {
      allowedUserRoles: [ AccountRoles.Admin ],
    },
  },
  { path: '', pathMatch: 'full', redirectTo: '/app' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }
