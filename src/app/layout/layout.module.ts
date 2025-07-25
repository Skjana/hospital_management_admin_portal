import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { InquiresComponent } from './inquires/inquires.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { PatientManagementComponent } from './patient-management/patient-management.component';
import { ManageDepartmentsComponent } from './manage-departments/manage-departments.component';
import { StaffManagementComponent } from './staff-management/staff-management.component';
import { DoctorsManagementComponent } from './doctors-management/doctors-management.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    SettingsComponent,
    ProfileComponent,
    InquiresComponent,
    RoleManagementComponent,
    PatientManagementComponent,
    ManageDepartmentsComponent,
    StaffManagementComponent,
    DoctorsManagementComponent,
    DiagnosticComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
