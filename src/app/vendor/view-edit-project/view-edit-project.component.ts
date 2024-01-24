import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-edit-project',
  templateUrl: './view-edit-project.component.html',
  styleUrl: './view-edit-project.component.css'
})
export class ViewEditProjectComponent {

  projectForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      division: ['', Validators.required],
      workName: ['', Validators.required],
      agreementNumber: ['', Validators.required],
      agreementValue: ['', Validators.required],
      agreementDate: ['', Validators.required],
      dateOfCommencement: ['', Validators.required],
      dateOfCompletion: ['', Validators.required],
      bankName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      accountHolderName: ['', Validators.required],
      ifscCode: ['', Validators.required],
      branchName: ['', Validators.required],
    });
  }
}
