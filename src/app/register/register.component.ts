import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

function validateContactNumber(control: AbstractControl): { [key: string]: any } | null {
  const isValid = /^\d{10}$/.test(control.value);
  return isValid ? null : { 'invalidContactNumber': { value: control.value } };
}

function passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
  const password = control.get('password');
  const cnfPassword = control.get('cnfPassword');
  return password && cnfPassword && password.value !== cnfPassword.value ? { 'passwordMismatch': true } : null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup;

  panFileSizeMsg: any;
  tanFileSizeMsg: any;
  gstFileSizeMsg: any;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private vendorAuth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.updateTitle();
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cnfPassword: ['', Validators.required], // Add validation for confirm password field
      nameOfTheContractor: ['', Validators.required],
      panNumber: ['', Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)],
      tanNumber: ['', Validators.pattern(/^([a-zA-Z]){4}([0-9]){5}([a-zA-Z]){1}?$/)],
      gstNumber: ['', Validators.pattern(/^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z]){2}?$/)],
      contactNumber: ['', [Validators.required, validateContactNumber]],
      email: ['', [Validators.email, Validators.required]],
      creationTime: [this.getTodaysDate()],
      panFileBase64: ['', Validators.required],
      tanFileBase64: ['', Validators.required],
      gstFileBase64: ['', Validators.required]
    }, {
      validator: passwordMatchValidator // Add the password match validator to the form group
    });
  }

  getTodaysDate() {
    return new Date();
  }

  updateTitle() {
    this.titleService.setTitle('Register');
  }

  submitForm() {
    const password = this.registerForm.value.password;
    const cnfPassword = this.registerForm.value.cnfPassword;
    if (password === cnfPassword) {
      if (this.registerForm.valid) {
        console.log(this.registerForm.value);
        console.log('Form submitted successfully');
        this.vendorAuth.registerVendor(this.registerForm.value).subscribe(
          (response: any) => {
            this.showSuccessToast('Registration Successful');
            this.router.navigate(['/login']);
          },
          (error: any) => {
            console.error('Registration failed:', error);
            this.showErrorToast('Registration Failed');
          }
        );
      } else {
        this.markFormGroupTouched(this.registerForm);
        window.alert('Please check all the fields');
      }
    } else {
      window.alert('Passwords do not match');
    }
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    const maxFileSize = 2 * 1024 * 1024; // 2 MB in bytes

    if (file) {
      if (file.size > maxFileSize) {
        if (controlName === 'panFile') {
          this.panFileSizeMsg = 'File size exceeds the limit (2 MB)';
        } else if (controlName === 'tanFile') {
          this.tanFileSizeMsg = 'File size exceeds the limit (2 MB)';
        } else if (controlName === 'gstFile') {
          this.gstFileSizeMsg = 'File size exceeds the limit (2 MB)';
        }
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.registerForm.patchValue({
          [controlName + 'Base64']: reader.result?.toString().split(',')[1]
        });
      };
      reader.readAsDataURL(file);
    }
  }


  // Helper function to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Function to display a success toast message
  showSuccessToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      panelClass: ['toast-success'] // Custom CSS class for styling
    });
  }

  // Function to display an error toast message
  showErrorToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      panelClass: ['toast-error'] // Custom CSS class for styling
    });
  }

}
