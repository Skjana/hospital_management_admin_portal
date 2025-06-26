import { Component } from '@angular/core';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrl: './role-management.component.css'
})
export class RoleManagementComponent {
showDeleteModal: boolean = false;
  showFormModal: boolean = false;
  isEditMode: boolean = false;

  deleteRole: any;
  selectedRole: any = {};

  roles = [
    { id: '#001', description: 'Doctor', status: 'Active' },
    { id: '#002', description: 'Pharmacist', status: 'Active' }
  ];

  // Delete modal functions
  openDeleteModal(role: any): void {
    this.deleteRole = role;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deleteRole = undefined;
  }

  confirmDelete(): void {
    if (this.deleteRole) {
      this.roles = this.roles.filter(r => r !== this.deleteRole);
      this.closeDeleteModal();
    }
  }

  // View/Edit modal functions
  openViewModal(role: any): void {
    this.isEditMode = false;
    this.selectedRole = { ...role }; // clone to avoid editing original
    this.showFormModal = true;
  }

  openEditModal(role: any): void {
    this.isEditMode = true;
    this.selectedRole = { ...role }; // clone to allow changes before saving
    this.showFormModal = true;
  }

  closeFormModal(): void {
    this.showFormModal = false;
    this.selectedRole = {};
  }

  saveRole(): void {
    const index = this.roles.findIndex(r => r.id === this.selectedRole.id);
    if (index > -1) {
      this.roles[index] = { ...this.selectedRole };
    }
    this.closeFormModal();
  }

}
