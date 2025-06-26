import { Component } from '@angular/core';

@Component({
  selector: 'app-patient-management',
  templateUrl: './patient-management.component.html',
  styleUrl: './patient-management.component.css'
})
export class PatientManagementComponent {
showDeleteModal: boolean = false;
  showFormModal: boolean = false;
  isEditMode: boolean = false;

  deletePatient: any;
  selectedPatient: any = {};

  patients = [
    { 
      id: '#P001', 
      name: 'jack sparrow', 
      age: 45, 
      gender: 'Male', 
      phone: '+94 71 234 5678', 
      department: 'Cardiology', 
      status: 'Inpatient' 
    },
    { 
      id: '#P002', 
      name: 'sasee raj', 
      age: 32, 
      gender: 'Female', 
      phone: '+94 77 876 5432', 
      department: 'Neurology', 
      status: 'Outpatient' 
    },
    { 
      id: '#P003', 
      name: 'thuvarakan sivapalan', 
      age: 28, 
      gender: 'Male', 
      phone: '+94 70 345 6789', 
      department: 'Orthopedics', 
      status: 'Emergency' 
    },
    { 
      id: '#P004', 
      name: 'krithick bala', 
      age: 8, 
      gender: 'Female', 
      phone: '+94 76 987 6543', 
      department: 'Pediatrics', 
      status: 'Inpatient' 
    },
    { 
      id: '#P005', 
      name: 'bala kumar', 
      age: 67, 
      gender: 'Male', 
      phone: '+94 75 456 7890', 
      department: 'General Medicine', 
      status: 'Discharged' 
    }
  ];

  // Delete modal functions
  openDeleteModal(patient: any): void {
    this.deletePatient = patient;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deletePatient = undefined;
  }

  confirmDelete(): void {
    if (this.deletePatient) {
      this.patients = this.patients.filter(p => p !== this.deletePatient);
      this.closeDeleteModal();
    }
  }

  openViewModal(patient: any): void {
    this.isEditMode = false;
    this.selectedPatient = { ...patient }; 
    this.showFormModal = true;
  }

  openEditModal(patient: any): void {
    this.isEditMode = true;
    this.selectedPatient = { ...patient }; 
    this.showFormModal = true;
  }

  closeFormModal(): void {
    this.showFormModal = false;
    this.selectedPatient = {};
  }

  savePatient(): void {
    const index = this.patients.findIndex(p => p.id === this.selectedPatient.id);
    if (index > -1) {
      this.patients[index] = { ...this.selectedPatient };
    }
    this.closeFormModal();
  }
}
