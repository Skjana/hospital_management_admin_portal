import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { InquiresComponent } from './inquires/inquires.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { ManageDepartmentsComponent } from './manage-departments/manage-departments.component';
import { PatientManagementComponent } from './patient-management/patient-management.component';
import { StaffManagementComponent } from './staff-management/staff-management.component';
import { DoctorsManagementComponent } from './doctors-management/doctors-management.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    children:[
      {
        path:'',
        component:DashboardHomeComponent
      },
      {
        path:'role-management',
        component:RoleManagementComponent
      },
      {
        path:'manage-departments',
        component:ManageDepartmentsComponent
      },
      {
        path:'patient-management',
        component:PatientManagementComponent
      },
      {
        path:'staff-management',
        component:StaffManagementComponent
      },
      {
        path:'doctors-management',
        component:DoctorsManagementComponent
      },
      {
        path:'inquires',
        component:InquiresComponent
      },
      {
        path:'diagnostic',
        component:DiagnosticComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'settings',
        component:SettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
