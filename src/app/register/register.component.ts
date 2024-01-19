import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MustMatch } from '../service/helpers/must-match.validators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

function validateContactNumber(control: AbstractControl): { [key: string]: any } | null {
  const isValid = /^\d{10}$/.test(control.value);
  return isValid ? null : { 'invalidContactNumber': { value: control.value } };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private titleService: Title, private fb: FormBuilder,private apiCall: ApiService, private _snackBar: MatSnackBar, private router: Router) {
    this.updateTitle();
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      nameOfContractor: ['', Validators.required],
      pan: ['', Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)],
      tan: ['', Validators.pattern(/^([a-zA-Z]){4}([0-9]){5}([a-zA-Z]){1}?$/)],
      gst: ['', Validators.pattern(/^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)],
      contactNumber: ['', [Validators.required, validateContactNumber]],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  updateTitle() {
    this.titleService.setTitle('Register');
  }
  get f() { return this.registerForm.controls; }

  submitForm() {
    if (this.registerForm.valid) {
      const payload = {
        "vendorUniqueId": null,
        "nameOfContractor": this.f['nameOfContractor'].value,
        "panNo": this.f['pan'].value,
        "panFile": "",
        "tanNo": this.f['tan'].value,
        "tanFile": "",
        "gstNo": this.f['gst'].value,
        "gstFile": "",
        "contactNo": this.f['contactNumber'].value,
        "emailId": this.f['email'].value,
        "password": this.f['password'].value,
        "confirmPassword": this.f['confirmPassword'].value,
        "userId": this.f['nameOfContractor'].value,
        "userType": "VENDOR"
      }
      this.apiCall.apiPostCall(payload, 'registerVendor').subscribe(data => {
        if (data.message === 'Data Saved SuccesFully.') {
          this._snackBar.open('Vendor registered Suceessfully', 'Ok', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.router.navigate(['/login']);
        }
      }, error => {
        console.log(error)
        this._snackBar.open(error, 'Ok', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      })

      console.log(payload)
    } else {
      this.markFormGroupTouched(this.registerForm);
      return;
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

}
