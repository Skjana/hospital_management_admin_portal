import { Component } from '@angular/core';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrl: './staff-management.component.css'
})
export class StaffManagementComponent {
 showDeleteModal: boolean = false;
  showFormModal: boolean = false;
  isEditMode: boolean = false;
  isNewMode: boolean = false;

  deleteStaff: any;
  selectedStaff: any = {};

  staffMembers = [
    { 
      id: '#S001', 
      name: 'Dr. anoja', 
      role: 'Doctor', 
      department: 'Cardiology', 
      phone: '+94 71 234 5678', 
      email: 'anojan@hospital.com',
      status: 'Active' 
    },
    { 
      id: '#S002', 
      name: 'nijanthan', 
      role: 'Nurse', 
      department: 'Emergency', 
      phone: '+94 77 876 5432', 
      email: 'nijanthan@hospital.com',
      status: 'Active' 
    },
    { 
      id: '#S003', 
      name: 'thivija', 
      role: 'Technician', 
      department: 'Laboratory', 
      phone: '+94 70 345 6789', 
      email: 'thivija@hospital.com',
      status: 'On Leave' 
    },
    { 
      id: '#S004', 
      name: 'Dr. thuvarakan', 
      role: 'Doctor', 
      department: 'Neurology', 
      phone: '+94 76 987 6543', 
      email: 'thuvarakan@hospital.com',
      status: 'Active' 
    },
    { 
      id: '#S005', 
      name: 'keman', 
      role: 'Admin', 
      department: 'Administration', 
      phone: '+94 75 456 7890', 
      email: 'keman@hospital.com',
      status: 'Active' 
    }
  ];

  // Delete modal functions
  openDeleteModal(staff: any): void {
    this.deleteStaff = staff;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deleteStaff = undefined;
  }

  confirmDelete(): void {
    if (this.deleteStaff) {
      this.staffMembers = this.staffMembers.filter(s => s !== this.deleteStaff);
      this.closeDeleteModal();
    }
  }

  // View modal functions
  openViewModal(staff: any): void {
    this.isEditMode = false;
    this.isNewMode = false;
    this.selectedStaff = { ...staff }; 
    this.showFormModal = true;
  }

  // Edit modal functions
  openEditModal(staff: any): void {
    this.isEditMode = true;
    this.isNewMode = false;
    this.selectedStaff = { ...staff }; 
    this.showFormModal = true;
  }

  // New staff modal functions
  openNewStaffModal(): void {
    this.isEditMode = false;
    this.isNewMode = true;
    this.selectedStaff = {
      id: '',
      name: '',
      role: 'Doctor',
      department: 'Cardiology',
      phone: '',
      email: '',
      status: 'Active'
    };
    this.showFormModal = true;
  }

  closeFormModal(): void {
    this.showFormModal = false;
    this.selectedStaff = {};
    this.isEditMode = false;
    this.isNewMode = false;
  }

  saveStaff(): void {
    if (this.isNewMode) {
      const maxId = Math.max(...this.staffMembers.map(s => parseInt(s.id.replace('#S', ''))));
      this.selectedStaff.id = `#S${String(maxId + 1).padStart(3, '0')}`;
      this.staffMembers.push({ ...this.selectedStaff });
    } else {
      const index = this.staffMembers.findIndex(s => s.id === this.selectedStaff.id);
      if (index > -1) {
        this.staffMembers[index] = { ...this.selectedStaff };
      }
    }
    this.closeFormModal();
  }
}
