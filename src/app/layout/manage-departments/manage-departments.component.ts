import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-departments',
  templateUrl: './manage-departments.component.html',
  styleUrl: './manage-departments.component.css'
})
export class ManageDepartmentsComponent {
showDeleteModal: boolean = false;
  showFormModal: boolean = false;
  isEditMode: boolean = false;
  deleteDepartment: any;
  selectedDepartment: any = {};

  departments = [
    { id: '#001', name: 'Cardiology', head: 'Dr.Anoja Pushpalingam', location: 'Building A - Floor 2', status: 'Active' },
    { id: '#002', name: 'Neurology', head: 'Dr. Eugin Benut', location: 'Building B - Floor 3', status: 'Active' },
    { id: '#003', name: 'Orthopedics', head: 'Dr. Keman Sharp', location: 'Building A - Floor 1', status: 'Active' },
    { id: '#004', name: 'Pediatrics', head: 'Dr. Jnuka Ramanathan', location: 'Building C - Floor 1', status: 'Inactive' }
  ];

  openDeleteModal(department: any): void {
    this.deleteDepartment = department;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deleteDepartment = undefined;
  }

  confirmDelete(): void {
    if (this.deleteDepartment) {
      this.departments = this.departments.filter(d => d !== this.deleteDepartment);
      this.closeDeleteModal();
    }
  }

  openViewModal(department: any): void {
    this.isEditMode = false;
    this.selectedDepartment = { ...department }; 
    this.showFormModal = true;
  }

  openEditModal(department: any): void {
    this.isEditMode = true;
    this.selectedDepartment = { ...department }; 
    this.showFormModal = true;
  }

  closeFormModal(): void {
    this.showFormModal = false;
    this.selectedDepartment = {};
  }

  saveDepartment(): void {
    const index = this.departments.findIndex(d => d.id === this.selectedDepartment.id);
    if (index > -1) {
      this.departments[index] = { ...this.selectedDepartment };
    }
    this.closeFormModal();
  }

}
