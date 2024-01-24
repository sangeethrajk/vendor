import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})

export class CreateProjectComponent {

  createForm: FormGroup;

  divisions = [
    "Anna Nagar",
    "JJ Nagar",
    "KK Nagar",
    "Besant Nagar",
    "Nandanam",
    "Maintenance",
    "SPD I",
    "SPD II",
    "CIT Nagar",
    "Foreshore Estate",
    "SAF Games Village",
    "Thirumazhisai Satellite Town",
    "SPD III",
    "Uchapatti Thoppur Satellite Town",
    "Coimbatore Housing Unit",
    "Erode Housing Unit ",
    "Salem Housing Unit ",
    "Hosur Housing Unit ",
    "Vellore Housing Unit ",
    "Madurai Housing Unit ",
    "Tirunelveli Housing Unit",
    "Ramanathapuram Housing Unit",
    "Trichy Housing Unit",
    "Thanjavur Housing Unit",
    "Villupuram Housing Unit"
  ];

  constructor(private fb: FormBuilder) {
    this.createForm = this.fb.group({
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
