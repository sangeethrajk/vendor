import { Component } from '@angular/core';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-raise-bill',
  templateUrl: './raise-bill.component.html',
  styleUrls: ['./raise-bill.component.css']
})
export class RaiseBillComponent {

  billForm: FormGroup;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.billForm = this.fb.group({
      division: ['', Validators.required],
      workName: ['', Validators.required],
      agreementNo: ['', Validators.required],
      agreementDate: ['', Validators.required],
      dateOfCommencement: ['', Validators.required],
      agreementValue: ['', Validators.required],
      invoiceNo: ['', Validators.required],
      billNo: ['', Validators.required],
      billAmount: [null, Validators.required],
      billGSTPercent: [null, [Validators.required, Validators.pattern(/^\d{0,2}$/)]],
      billGSTAmount: ['', Validators.required],
      billTotal: ['', Validators.required],
      billUpload: ['']
    });
  }

  // updateTitle() {
  //   this.titleService.setTitle('Raise Bill');
  // }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  calculateTotalAmount() {
    const billAmount = parseFloat(this.billForm.get('billAmount')?.value);
    const gstPercent = parseFloat(this.billForm.get('billGSTPercent')?.value);

    const gstAmount = (billAmount * gstPercent) / 100;
    const totalAmount = billAmount + gstAmount;

    this.billForm.get('billGSTAmount')?.setValue(gstAmount);
    this.billForm.get('billTotal')?.setValue(totalAmount);
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
        // Handle the logic for submitting the bill here
        this._snackBar.open('Bill Submitted Successfully!', 'Ok', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
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
