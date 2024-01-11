import { Component } from '@angular/core';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-raise-bill',
  templateUrl: './raise-bill.component.html',
  styleUrls: ['./raise-bill.component.css']
})
export class RaiseBillComponent {

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  // updateTitle() {
  //   this.titleService.setTitle('Raise Bill');
  // }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

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
