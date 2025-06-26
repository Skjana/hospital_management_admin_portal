import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  {
     path: 'login', 
     component:LoginComponent
  },
  {
    path:'forgot-password',
    component:ForgotPasswordComponent,
  },
  {
    path:'layout',
    loadChildren: () =>
    import('./layout/layout.module').then((m) => m.LayoutModule),
  } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
