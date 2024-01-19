import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent implements OnInit {
  projectCreation: FormGroup;
  edit = false;
  view = false;
  projectId = null;
  crud = 'Create'
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fb: FormBuilder, private activeRoute: ActivatedRoute, private router: Router, private apiCall: ApiService, private _snackBar: MatSnackBar) {
    this.activeRoute.paramMap.subscribe(params => {
      this.projectId = params.get('id');
      if (this.projectId && this.router.url.includes('edit')) {
        this.edit = true;
        this.crud = 'Update';
        this.getProDetails();
      } else if (this.router.url.includes('view')) {
        this.view = true;
        this.getProDetails();
        this.crud = 'View';
        this.projectCreation.disable();
      }
    })
  }

  getProDetails() {
    const payload = {
      "projectId": this.projectId
    }
    this.apiCall.apiPostCall(payload, 'getProjectsDetailByProjectId').subscribe(data => {
      this.projectCreation.patchValue(data.data)
    })


  }
  back() {
    this.router.navigate(['/vendor/projects']);

  }

  ngOnInit(): void {
    this.projectCreation = this.fb.group({
      division: ['', Validators.required],
      nameOfTheWork: ['', Validators.required],
      agreeMentNo: ['', Validators.required],
      agreeMentValue: ['', Validators.required],
      agreeMentDate: ['', Validators.required],
      dateOfCommencement: ['', Validators.required],
      dateOfCompletion: ['', Validators.required],
      bankName: ['', Validators.required],
      bankAccNo: ['', Validators.required],
      bankIfscCode: ['', Validators.required],
      branchName: ['', Validators.required],
      inVoice: ['', Validators.required],

    })
  }

  get f() {
    return this.projectCreation.controls;
  }
  createProject() {
    if (this.projectCreation.invalid) {
      return;
    } else {
     const venDet=JSON.parse(localStorage.getItem('vendorDet'))

      const payload = {
        "projectId": this.projectId,
        "vendorUniqueId": venDet.vendorUniqueId,
        "userId": venDet.username,
        "verificationStatus": "Pending",
        "division": this.f['division']?.value,
        "nameOfTheWork": this.f['nameOfTheWork']?.value,
        "agreeMentNo": this.f['agreeMentNo']?.value,
        "agreeMentValue": this.f['agreeMentValue']?.value,
        "agreeMentDate": this.f['agreeMentDate']?.value,
        "dateOfCommencement": this.f['dateOfCommencement']?.value,
        "dateOfCompletion": this.f['dateOfCompletion']?.value,
        "inVoice": this.f['inVoice']?.value,
        "bankName": this.f['bankName']?.value,
        "bankAccNo": this.f['bankAccNo']?.value,
        "bankIfscCode": this.f['bankIfscCode']?.value,
        "branchName": this.f['branchName']?.value
      }
      this.apiCall.apiPostCall(payload, 'registerVendorProjects').subscribe(data => {
        this._snackBar.open('Data saved Successfully', 'Ok', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.router.navigate(['/vendor/projects']);
      }, error => {
        this._snackBar.open(error, 'Ok', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      })
    }

  }
}
