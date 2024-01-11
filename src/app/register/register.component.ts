import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

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

  constructor(private titleService: Title, private fb: FormBuilder) {
    this.updateTitle();
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      contractorName: ['', Validators.required],
      pan: ['', Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)],
      tan: ['', Validators.pattern(/^([a-zA-Z]){4}([0-9]){5}([a-zA-Z]){1}?$/)],
      gst: ['', Validators.pattern(/^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)],
      contactNumber: ['', [Validators.required, validateContactNumber]]
    });
  }

  updateTitle() {
    this.titleService.setTitle('Register');
  }

  submitForm() {
    if (this.registerForm.valid) {
      // Handle form submission
      console.log('Form submitted successfully');
    } else {
      // Mark all fields as touched to display validation messages
      this.markFormGroupTouched(this.registerForm);
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
