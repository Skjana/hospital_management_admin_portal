import { Component, OnInit } from '@angular/core';

export interface Inquiry {
  id: number;
  date: Date;
  fullName: string;
  email: string;
  phone?: string;
  inquiryType: string;
  status: string;
  priority: string;
  message: string;
}

@Component({
  selector: 'app-inquires',
  templateUrl: './inquires.component.html',
  styleUrl: './inquires.component.css'
})
export class InquiresComponent {

  inquiries: Inquiry[] = [];
  filteredInquiries: Inquiry[] = [];

  selectedFilter: string = 'all';
  searchTerm: string = '';

  selectedInquiry?: Inquiry;
  showViewModal: boolean = false;
  showReplyModal: boolean = false;
  showDeleteModal: boolean = false;
  replyInquiry?: Inquiry;
  deleteInquiry?: Inquiry;
  replyMessage: string = '';

  constructor() {
    this.loadInquiries();
  }

  loadInquiries(): void {
    this.inquiries = [
      {
        id: 1,
        date: new Date('2025-06-10'),
        fullName: 'Januka Ramanathan',
        email: 'Januka@gmail.com',
        phone: '0766123456',
        inquiryType: 'general',
        status: 'Pending',
        priority: 'Medium',
        message: 'I would like to know more about your services and pricing options.'
      },
      {
        id: 2,
        date: new Date('2025-06-05'),
        fullName: 'Keman Sharp',
        email: 'keman@gmail.com',
        phone: '0766123456',
        inquiryType: 'appointment',
        status: 'In Progress',
        priority: 'High',
        message: 'I need to schedule an urgent appointment for next week.'
      }
    ];
    this.filteredInquiries = [...this.inquiries];
  }

  getTotalInquiries(): number {
    return this.inquiries.length;
  }

  getPendingCount(): number {
    return this.inquiries.filter(inquiry => inquiry.status === 'Pending').length;
  }

  getResolvedCount(): number {
    return this.inquiries.filter(inquiry => inquiry.status === 'Resolved').length;
  }

  applyFilter(): void {
    this.filterInquiries();
  }

  applySearch(): void {
    this.filterInquiries();
  }

  private filterInquiries(): void {
    let filtered = this.inquiries;

    if (this.selectedFilter !== 'all') {
      filtered = filtered.filter(inquiry => 
        inquiry.status.toLowerCase().replace(' ', '-') === this.selectedFilter
      );
    }

    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(inquiry =>
        inquiry.fullName.toLowerCase().includes(searchLower) ||
        inquiry.email.toLowerCase().includes(searchLower) ||
        inquiry.message.toLowerCase().includes(searchLower) ||
        inquiry.id.toString().includes(searchLower)
      );
    }

    this.filteredInquiries = filtered;
  }

  getInquiryTypeLabel(type: string): string {
    const typeLabels: { [key: string]: string } = {
      'general': 'General Inquiry',
      'appointment': 'Appointment',
      'billing': 'Billing',
      'medical': 'Medical',
      'careers': 'Careers',
      'feedback': 'Feedback',
      'other': 'Other'
    };
    return typeLabels[type] || 'Unknown';
  }

  viewInquiry(inquiry: Inquiry): void {
    this.selectedInquiry = inquiry;
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedInquiry = undefined;
  }

  replyToInquiry(inquiry: Inquiry): void {
    this.replyInquiry = inquiry;
    this.replyMessage = '';
    this.showReplyModal = true;
    this.showViewModal = false; 
  }

  closeReplyModal(): void {
    this.showReplyModal = false;
    this.replyInquiry = undefined;
    this.replyMessage = '';
  }

  sendReply(): void {
    if (!this.replyMessage.trim() || !this.replyInquiry) {
      return;
    }

    console.log('Sending reply to:', this.replyInquiry.email);
    console.log('Reply message:', this.replyMessage);

    alert('Reply sent successfully!');

    if (this.replyInquiry.status === 'Pending') {
      this.updateInquiryStatus(this.replyInquiry, 'In Progress');
    }

    this.closeReplyModal();
  }

  confirmDelete(inquiry: Inquiry): void {
    this.deleteInquiry = inquiry;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deleteInquiry = undefined;
  }

  deleteInquiryConfirm(): void {
    if (!this.deleteInquiry) return;

    const index = this.inquiries.findIndex(inq => inq.id === this.deleteInquiry!.id);
    if (index > -1) {
      this.inquiries.splice(index, 1);
      this.filterInquiries(); 
    }

    this.closeDeleteModal();
  }

  updateStatus(newStatus: string): void {
    if (this.selectedInquiry) {
      this.updateInquiryStatus(this.selectedInquiry, newStatus);
    }
  }

  private updateInquiryStatus(inquiry: Inquiry, newStatus: string): void {
    const index = this.inquiries.findIndex(inq => inq.id === inquiry.id);
    if (index > -1) {
      this.inquiries[index].status = newStatus;
      this.filterInquiries(); 

      if (this.selectedInquiry && this.selectedInquiry.id === inquiry.id) {
        this.selectedInquiry.status = newStatus;
      }
    }
  }
}
