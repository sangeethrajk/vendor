import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-raise-bill',
  templateUrl: './raise-bill.component.html',
  styleUrls: ['./raise-bill.component.css']
})
export class RaiseBillComponent {
  billId = null;
  billRaise: FormGroup;
  projectId: any;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private activeRoute: ActivatedRoute, private router: Router, private apiCall: ApiService, private _snackBar: MatSnackBar) {
    this.activeRoute.paramMap.subscribe(params => {
      this.billId = params.get('id');
      if (this.billId) {
        const payload = {
          "id": this.billId
        }
        this.apiCall.apiPostCall(payload, 'getProjectBillsDetailById').subscribe(data => {
          if (data.data) {
            this.projectId = data.data.projectId
            this.billRaise.controls['division'].setValue(data.data.division)
            this.billRaise.controls['nameOfTheWork'].setValue(data.data.nameOfTheWork)
            this.billRaise.controls['agreeMentNo'].setValue(data.data.agreeMentNo)
            this.billRaise.controls['agreeMentDate'].setValue(data.data.agreeMentDate)
            this.billRaise.controls['dateOfCommencement'].setValue(data.data.dateOfCommencement)
            this.billRaise.controls['agreeMentValue'].setValue(data.data.agreeMentValue)
            this.billRaise.controls['inVoice'].setValue(data.data.inVoice)
            this.billRaise.controls['billNo'].setValue(data.data.billNo)
            this.billRaise.controls['billValue'].setValue(data.data.billValue)
          }
        })
      }

    })
  }
  // updateTitle() {
  //   this.titleService.setTitle('Raise Bill');
  // }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  // test commit

  ngOnInit(): void {
    this.billRaise = this.fb.group({
      division: [''],
      nameOfTheWork: [''],
      agreeMentNo: [''],
      agreeMentDate: [''],
      dateOfCommencement: [''],
      agreeMentValue: [''],
      inVoice: [''],
      billNo: [''],
      billValue: [''],
    })
  }

  get f() {
    return this.billRaise.controls;
  }
  back() {
    this.router.navigate(['/vendor/bills']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Submit Bill Confirmation',
        message: 'Are you sure you want to submit the bill?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        const venDet = JSON.parse(localStorage.getItem('vendorDet'))
        const payload = {
          "billUniqueId": this.billId,
          "vendorUniqueId": venDet.vendorUniqueId,
          "userId": venDet.username,
          "userType": "VENDOR",
          "projectId": this.projectId,
          "division": this.f['division']?.value,
          "nameOfTheWork": this.f['nameOfTheWork']?.value,
          "agreeMentNo": this.f['agreeMentNo']?.value,
          "agreeMentValue": this.f['agreeMentValue']?.value,
          "agreeMentDate": this.f['agreeMentDate']?.value,
          "dateOfCommencement": this.f['dateOfCommencement']?.value,
          "dateOfCompletion": this.f['dateOfCompletion']?.value,
          "inVoice": this.f['inVoice']?.value,
          "billNo": this.f['inVoice']?.value,
          "billValue": this.f['inVoice']?.value,
          "billFile": " ",
          "verificationStatus": "Approved"
        }
        this.apiCall.apiPostCall(payload, 'saveProjectBill').subscribe(data => {
          if (data.message === 'Data Saved SuccesFully.') {
            this._snackBar.open('Bill Submitted Successfully!', 'Ok', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.router.navigate(['/vendor/bills']);
          } else {
            this._snackBar.open('Bill Submission Canceled.', 'Ok', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }

        }, error => {
          this._snackBar.open(error, 'Ok', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        })

      } else {
        // Handle the logic for canceling the bill submission
        this._snackBar.open('Bill Submission Canceled.', 'Ok', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }
}
