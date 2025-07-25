import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})

export class ForgotPasswordComponent {
  emailAddress = '';
  userId: string | null = null;

  currentStep = 1; 

  toastVisible = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(private http: HttpClient, private renderer: Renderer2) {}


  togglePassword(passwordField: HTMLInputElement, icon: HTMLElement): void {
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    passwordField.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

  showToast(message: string, type: 'success' | 'error' = 'success'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
    }, 3000);
  }

  onSubmitEmail(): void {
    const url = 'http://localhost:2125/2fa/resetPassword/sendOtp';
    const payload = { emailAddress: this.emailAddress };

    this.http.post(url, payload).subscribe({
      next: (response: any) => {
        if (response && response.id) {
          this.userId = response.id;
          this.showToast(response.message || 'OTP sent successfully!', 'success');
          this.currentStep = 2;
          this.highlightStep(this.currentStep);
        } else {
          this.showToast('Failed to send OTP. Try again.', 'error');
        }
      },
      error: (error) => {
        console.error('OTP sending failed:', error);
        const msg = error.error?.message || 'Error sending OTP.';
        this.showToast(msg, 'error');
      }
    });
  }

  highlightStep(step: number): void {
    const steps = ['step1', 'step2', 'step3'];
    const sections = ['emailSection', 'otpSection', 'passwordSection'];

    steps.forEach((id, index) => {
      const stepEl = document.getElementById(id);
      const sectionEl = document.getElementById(sections[index]);

      if (stepEl && sectionEl) {
        if (index + 1 === step) {
          stepEl.classList.add('active');
          sectionEl.classList.add('active');
        } else {
          stepEl.classList.remove('active');
          sectionEl.classList.remove('active');
        }
      }
    });
  }

otp: string[] = ['', '', '', ''];
newPassword: string = '';
confirmPassword: string = '';

resetPassword(): void {
  const otpCode = this.otp.join('');

  if (this.newPassword !== this.confirmPassword) {
    this.showToast("Passwords do not match.", "error");
    return;
  }

  if (otpCode.length !== 4 || !/^\d{4}$/.test(otpCode)) {
    this.showToast("Invalid OTP. Please enter a valid 4-digit code.", "error");
    return;
  }

  const url = 'http://localhost:2125/2fa/resetPassword/confirm';
  const payload = {
    otp: otpCode,
    newPassword: this.newPassword
  };

  this.http.post(url, payload).subscribe({
    next: (response: any) => {
      this.showToast(response.message || 'Password reset successful.', 'success');
      this.currentStep = 1;
      this.highlightStep(this.currentStep);
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    },
    error: (error) => {
      console.error('Reset failed:', error);
      const msg = error.error?.message || 'Failed to reset password.';
      this.showToast(msg, 'error');
    }
  });
}

focusNext(event: any, index: number): void {
  const input = event.target;
  const value = input.value;

  if (value && index < 3) {
    const nextInput = input.parentElement.children[index + 1];
    nextInput?.focus();
  }

  this.otp[index] = value;
}

onVerifyOtp(): void {
  const otpCode = this.otp.join('');

  if (otpCode.length !== 4 || !/^\d{4}$/.test(otpCode)) {
    this.showToast("Invalid OTP. Please enter a valid 4-digit code.", "error");
    return;
  }

  this.otp = otpCode.split('');
  this.currentStep = 3;
  this.highlightStep(this.currentStep);
}

handlePaste(event: ClipboardEvent): void {
  event.preventDefault();
  const pastedText = event.clipboardData?.getData('text') || '';
  const digits = pastedText.replace(/\D/g, '').slice(0, 4).split('');

  digits.forEach((digit, i) => {
    this.otp[i] = digit;

    const input = document.querySelector(`input[name="otp${i + 1}"]`) as HTMLInputElement;
    if (input) {
      input.value = digit;
    }
  });
  const lastIndex = Math.min(digits.length - 1, 3);
  const nextInput = document.querySelector(`input[name="otp${lastIndex + 1}"]`) as HTMLInputElement;
  nextInput?.focus();
}

resending = false;
resendCooldown = 0;
resendInterval: any;

resendOtp(): void {
  if (this.resending || this.resendCooldown > 0) return;

  this.resending = true;

  this.http.post('http://localhost:2125/2fa/resetPassword/sendOtp', { emailAddress: this.emailAddress })
    .subscribe({
      next: (response: any) => {
        this.showToast(response.message || 'OTP resent successfully!', 'success');
        this.startResendCooldown();
        this.resending = false;
      },
      error: (err) => {
        this.showToast(err.error?.message || 'Failed to resend OTP.', 'error');
        this.resending = false;
      }
    });
}

startResendCooldown(): void {
  this.resendCooldown = 50; // seconds
  this.resendInterval = setInterval(() => {
    this.resendCooldown--;
    if (this.resendCooldown <= 0) {
      clearInterval(this.resendInterval);
    }
  }, 1000);
}


// resendOtp(): void {
//   if (this.resending) return;

//   this.resending = true;

//   this.http.post('http://localhost:2125/2fa/resetPassword/sendOtp', { emailAddress: this.emailAddress })
//     .subscribe({
//       next: (response: any) => {
//         this.showToast('OTP resent successfully!', 'success');
//         this.resending = false;
//       },
//       error: (err) => {
//         this.showToast('Failed to resend OTP.', 'error');
//         this.resending = false;
//       }
//     });
// }

}