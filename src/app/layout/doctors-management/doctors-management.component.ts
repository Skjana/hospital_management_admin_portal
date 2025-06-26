import { Component } from '@angular/core';

@Component({
  selector: 'app-doctors-management',
  templateUrl: './doctors-management.component.html',
  styleUrl: './doctors-management.component.css'
})
export class DoctorsManagementComponent {
 showDeleteModal: boolean = false;
  showFormModal: boolean = false;
  isEditMode: boolean = false;
  isNewMode: boolean = false;

  deleteDoctor: any;
  selectedDoctor: any = {};

  doctors = [
    { 
      id: '#D001', 
      name: 'Dr.Jack sparrow', 
      specialization: 'Cardiologist', 
      department: 'Cardiology', 
      phone: '+94 71 234 5678', 
      email: 'sparrow@hospital.com',
      licenseNumber: 'LIC001234',
      experience: 15,
      status: 'Available' 
    },
    { 
      id: '#D002', 
      name: 'Dr. Thivija thankarasu', 
      specialization: 'Neurologist', 
      department: 'Neurology', 
      phone: '+94 77 876 5432', 
      email: 'thivija@hospital.com',
      licenseNumber: 'LIC002345',
      experience: 12,
      status: 'On Duty' 
    },
    { 
      id: '#D003', 
      name: 'Dr. Kumar ponampalam', 
      specialization: 'Orthopedic Surgeon', 
      department: 'Orthopedics', 
      phone: '+94 70 345 6789', 
      email: 'ponampalam@hospital.com',
      licenseNumber: 'LIC003456',
      experience: 8,
      status: 'Available' 
    },
    { 
      id: '#D004', 
      name: 'Dr. Thivakaran', 
      specialization: 'Pediatrician', 
      department: 'Pediatrics', 
      phone: '+94 76 987 6543', 
      email: 'thiva@hospital.com',
      licenseNumber: 'LIC004567',
      experience: 20,
      status: 'On Leave' 
    },
    { 
      id: '#D005', 
      name: 'Dr.bavishan', 
      specialization: 'Emergency Medicine', 
      department: 'Emergency', 
      phone: '+94 75 456 7890', 
      email: 'bavishan@hospital.com',
      licenseNumber: 'LIC005678',
      experience: 10,
      status: 'On Duty' 
    },
    { 
      id: '#D006', 
      name: 'Dr.robert juliet', 
      specialization: 'General Practitioner', 
      department: 'General Medicine', 
      phone: '+94 78 123 4567', 
      email: 'robert@hospital.com',
      licenseNumber: 'LIC006789',
      experience: 6,
      status: 'Available' 
    }
  ];

  // Delete modal functions
  openDeleteModal(doctor: any): void {
    this.deleteDoctor = doctor;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deleteDoctor = undefined;
  }

  confirmDelete(): void {
    if (this.deleteDoctor) {
      this.doctors = this.doctors.filter(d => d !== this.deleteDoctor);
      this.closeDeleteModal();
    }
  }

  // View modal functions
  openViewModal(doctor: any): void {
    this.isEditMode = false;
    this.isNewMode = false;
    this.selectedDoctor = { ...doctor }; 
    this.showFormModal = true;
  }

  // Edit modal functions
  openEditModal(doctor: any): void {
    this.isEditMode = true;
    this.isNewMode = false;
    this.selectedDoctor = { ...doctor }; 
    this.showFormModal = true;
  }

  // New doctor modal functions
  openNewDoctorModal(): void {
    this.isEditMode = false;
    this.isNewMode = true;
    this.selectedDoctor = {
      id: '',
      name: '',
      specialization: 'Cardiologist',
      department: 'Cardiology',
      phone: '',
      email: '',
      licenseNumber: '',
      experience: 0,
      status: 'Available'
    };
    this.showFormModal = true;
  }

  closeFormModal(): void {
    this.showFormModal = false;
    this.selectedDoctor = {};
    this.isEditMode = false;
    this.isNewMode = false;
  }

  saveDoctor(): void {
    if (this.isNewMode) {
      // Generate new ID
      const maxId = Math.max(...this.doctors.map(d => parseInt(d.id.replace('#D', ''))));
      this.selectedDoctor.id = `#D${String(maxId + 1).padStart(3, '0')}`;
      this.doctors.push({ ...this.selectedDoctor });
    } else {
      // Update existing doctor
      const index = this.doctors.findIndex(d => d.id === this.selectedDoctor.id);
      if (index > -1) {
        this.doctors[index] = { ...this.selectedDoctor };
      }
    }
    this.closeFormModal();
  }
}
