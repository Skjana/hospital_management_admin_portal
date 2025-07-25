import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrl: './diagnostic.component.css'
})
export class DiagnosticComponent {

//   loginActivity: any[] = [];
//   selectedLogin: any = null;
//   showViewModal: boolean = false;

//   currentPage: number = 1; 
//   itemsPerPage: number = 5;
//   totalItems: number = 0;

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.getLoginActivities();
//   }

//   getLoginActivities(): void {
//     const url = `http://localhost:2125/userDetails/all?pageNumber=${this.currentPage}&pageSize=${this.itemsPerPage}`;

//     this.http.get<any>(url).subscribe({
//       next: (response) => {
//         this.loginActivity = response.content || [];
//         this.totalItems = response.totalElements || 0;
//       },
//       error: (error) => {
//         console.error('Failed to fetch login activity:', error);
//       }
//     });
//   }

//   get totalPages(): number {
//     return Math.ceil(this.totalItems / this.itemsPerPage);
//   }

//   nextPage(): void {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//       this.getLoginActivities();
//     }
//   }

//   prevPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.getLoginActivities();
//     }
//   }

// get successfulLogins(): number {
//   return this.loginActivity.filter(login => login.isSuccess === true).length;
// }

// get failedLogins(): number {
//   return this.loginActivity.filter(login => login.isSuccess === false).length;
// }

// get highInvalidAttempts(): number {
//   return this.loginActivity.filter(login => login.invalidLoginCount >= 3).length;
// }

//   viewLogin(login: any): void {
//     this.selectedLogin = login;
//     this.showViewModal = true;
//   }

//   closeViewModal(): void {
//     this.selectedLogin = null;
//     this.showViewModal = false;
//   }

//   deleteLogin(login: any): void {
//     if (confirm('Are you sure you want to delete this login entry?')) {
//       this.loginActivity = this.loginActivity.filter(item => item !== login);
//       if (this.loginActivity.length === 0 && this.currentPage > 1) {
//         this.currentPage--;
//         this.getLoginActivities();
//       }
//     }
//   }

  loginActivity: any[] = [];
  selectedLogin: any = null;
  showViewModal: boolean = false;

  currentPage: number = 1; 
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getLoginActivities();
  }

  getLoginActivities(): void {
    const url = `http://localhost:2125/userDetails/all?pageNumber=${this.currentPage}&pageSize=${this.itemsPerPage}`;
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.loginActivity = response.content || [];
        this.totalItems = response.totalElements || 0;
      },
      error: (error) => {
        console.error('Failed to fetch login activity:', error);
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getLoginActivities();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getLoginActivities();
    }
  }

  // New method for direct page navigation
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages && pageNumber !== this.currentPage) {
      this.currentPage = pageNumber;
      this.getLoginActivities();
    }
  }

  // Helper method to get visible page numbers for pagination
  getVisiblePages(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to max visible
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let startPage = Math.max(1, this.currentPage - 2);
      let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
      
      // Adjust start page if we're near the end
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

  // Check if a specific page is currently active
  isPageActive(pageNumber: number): boolean {
    return this.currentPage === pageNumber;
  }

  // Check if previous button should be disabled
  isPrevDisabled(): boolean {
    return this.currentPage === 1;
  }

  // Check if next button should be disabled
  isNextDisabled(): boolean {
    return this.currentPage === this.totalPages || this.totalPages === 0;
  }

  // Statistics getters
  get successfulLogins(): number {
    return this.loginActivity.filter(login => login.isSuccess === true).length;
  }

  get failedLogins(): number {
    return this.loginActivity.filter(login => login.isSuccess === false).length;
  }

  get highInvalidAttempts(): number {
    return this.loginActivity.filter(login => login.invalidLoginCount >= 3).length;
  }

  // Modal methods
  viewLogin(login: any): void {
    this.selectedLogin = login;
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.selectedLogin = null;
    this.showViewModal = false;
  }

  // Delete method with pagination adjustment
  deleteLogin(login: any): void {
    if (confirm('Are you sure you want to delete this login entry?')) {
      // Here you would typically make an API call to delete the item
      // For now, we'll just refresh the data
      this.loginActivity = this.loginActivity.filter(item => item !== login);
      
      // Adjust current page if current page becomes empty
      if (this.loginActivity.length === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      
      // Refresh data from server
      this.getLoginActivities();
    }
  }

  // Method to refresh data
  refreshData(): void {
    this.getLoginActivities();
  }

  // Method to reset pagination
  resetPagination(): void {
    this.currentPage = 1;
    this.getLoginActivities();
  }

}
