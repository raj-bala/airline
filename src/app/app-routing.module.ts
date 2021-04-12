import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './login/helper/auth.guard';


const routes: Routes = [{ path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
{
  path: '',
  pathMatch: 'full',
  redirectTo: '/login'
},
 { path: 'admin',
 canActivate: [AuthGuard],
  data: {
    allowedRoles: ['Admin']
  },
   loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'home',
  canActivate: [AuthGuard],
  data: {
    allowedRoles: ['Staff', 'User', 'Admin']
  },
   loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
{ path: 'staff',
canActivate: [AuthGuard],
  data: {
    allowedRoles: ['Staff', 'Admin']
  },
   loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
