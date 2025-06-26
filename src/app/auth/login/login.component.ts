import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @ViewChild('otpModal') otpModal!: ElementRef;

  loginData = {
    emailAddress: '',
    password: ''
  };

  currentStep = 1;
  userId: string | null = null;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private http: HttpClient
  ) {}

  navigateForgot() {
    this.router.navigate(['/forgot-password']);
  }

  togglePassword(passwordField: HTMLInputElement, icon: HTMLElement): void {
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
      passwordField.type = 'password';
      icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
  }


onLoginClick(event: Event): void {
  event.preventDefault();

  const url = 'http://localhost:2125/2fa/send';

  this.http.post(url, this.loginData).subscribe({
    next: (response: any) => {
      if (response && response.id) {
        this.userId = response.id;
        this.showToast(response.message || 'OTP sent', 'success');
        this.showOtpModal();
      } else {
        this.showToast(response.message || 'Login failed.', 'error');
      }
    },
    error: (error) => {
      console.error('Login failed:', error);
      const errorMsg = error.error?.message || 'Login failed: Invalid Username or Password';
      this.showToast(errorMsg, 'error');
    }
  });
}


  showOtpModal(): void {
    const modalEl = this.otpModal.nativeElement;
    modalEl.classList.add('show');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const input = modalEl.querySelector('.otp-input') as HTMLElement;
      input?.focus();
    });
  }

  closeOtpModal(): void {
    const modalEl = this.otpModal.nativeElement;
    modalEl.classList.remove('show');
    document.body.style.overflow = 'auto';
    const inputs = modalEl.querySelectorAll('.otp-input') as NodeListOf<HTMLInputElement>;
    inputs.forEach(input => input.value = '');
  }

verifyOtp(): void {
  const modalEl = this.otpModal.nativeElement;
  const otpInputs = modalEl.querySelectorAll('.otp-input') as NodeListOf<HTMLInputElement>;

  const otp = Array.from(otpInputs).map(input => input.value).join('');

  if (otp.length !== 4 || !/^\d{4}$/.test(otp)) {
    this.showToast('Please enter a valid 4-digit OTP.', 'error');
    return;
  }

  const url = 'http://localhost:2125/2fa/verify';
  const payload = { otp };

  this.http.post(url, payload).subscribe({
    next: (response: any) => {
      if (response && response.id) {
        this.showToast(response.message || 'OTP verified successfully! Login successful.', 'success');
        this.closeOtpModal();
        this.router.navigate(['/layout']);
      } else {
        this.showToast(response.message || 'Verification failed.', 'error');
      }
    },
    error: (error) => {
      console.error('OTP Verification failed:', error);
      const errorMsg = error.error?.errors?.[0] || error.error?.message || 'OTP verification failed.';
      this.showToast(errorMsg, 'error');
    }
  });
}

onOtpInput(event: any, index: number): void {
  const input = event.target;
  const value = input.value;

  if (value.length === 1 && index < 3) {
    const nextInput = input.parentElement.children[index + 1];
    if (nextInput) {
      nextInput.focus();
    }
  }
}

  resendOtp(): void {
    alert('OTP Resent!');
  }

toastVisible = false;
toastMessage = '';
toastType: 'success' | 'error' = 'success';

showToast(message: string, type: 'success' | 'error' = 'success'): void {
  this.toastMessage = message;
  this.toastType = type;
  this.toastVisible = true;
  setTimeout(() => {
    this.toastVisible = false;
  }, 3000); 
}

}
