import { Component } from '@angular/core';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VendorService } from '../../services/vendor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-raise-bill',
  templateUrl: './raise-bill.component.html',
  styleUrls: ['./raise-bill.component.css']
})
export class RaiseBillComponent {

  billForm: FormGroup;
  vendorProjectId: any;
  vendorId: any;
  workId: any;
  invoiceFile!: File;
  gstChallanFile!: File;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private vendorService: VendorService,
    private route: ActivatedRoute
  ) {
    this.billForm = this.fb.group({
      division: ['', Validators.required],
      nameOfTheWork: ['', Validators.required],
      agreementNumber: ['', Validators.required],
      agreementDate: ['', Validators.required],
      commencementDate: ['', Validators.required],
      completionDate: [''],
      agreementValue: ['', Validators.required],
      invoiceNumber: ['', Validators.required],
      billNumber: ['', Validators.required],
      billAmount: [null, Validators.required],
      billGSTPercentage: [null, [Validators.required, Validators.pattern(/^\d{0,2}$/)]],
      billGSTAmount: ['', Validators.required],
      billTotal: ['', Validators.required],
    });
  }

  // updateTitle() {
  //   this.titleService.setTitle('Raise Bill');
  // }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.vendorProjectId = +params['vendorProjectId'];
      this.vendorId = +params['vendorId'];
      this.workId = +params['workId'];
    });
    this.getWorkById();
  }

  calculateTotalAmount() {
    const billAmount = parseFloat(this.billForm.get('billAmount')?.value);
    const gstPercent = parseFloat(this.billForm.get('billGSTPercentage')?.value);

    const gstAmount = (billAmount * gstPercent) / 100;
    const totalAmount = billAmount + gstAmount;

    this.billForm.get('billGSTAmount')?.setValue(gstAmount);
    this.billForm.get('billTotal')?.setValue(totalAmount);
  }

  getWorkById() {
    this.vendorService.getWorkById(this.workId).subscribe(
      (response: any) => {
        console.log(response);
        this.billForm.patchValue(response);
      },
      (error: any) => {
        console.log("Error", error);
      }
    );
  }

  onInvoiceFileSelected(event: any) {
    this.invoiceFile = event.target.files[0];
  }

  onGstChallanFileSelected(event: any) {
    this.gstChallanFile = event.target.files[0];
  }

  createBill() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Submit Bill Confirmation',
        message: 'Are you sure you want to submit the bill?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // Convert invoice file to base64
        this.convertFileToBase64(this.invoiceFile).then((invoiceBase64: string) => {
          // Convert GST challan file to base64
          this.convertFileToBase64(this.gstChallanFile).then((gstChallanBase64: string) => {
            // Create data object
            const data = {
              invoiceFileBase64: invoiceBase64,
              gstChallanFileBase64: gstChallanBase64,
              bill: {
                "vendorProjectId": this.vendorProjectId,
                "vendorId": this.vendorId,
                "workId": this.workId,
                "invoiceNumber": this.billForm.get('invoiceNumber')?.value,
                "billNumber": this.billForm.get('billNumber')?.value,
                "billAmount": this.billForm.get('billAmount')?.value,
                "billGSTPercentage": this.billForm.get('billGSTPercentage')?.value,
                "billGSTAmount": this.billForm.get('billGSTAmount')?.value,
                "billTotal": this.billForm.get('billTotal')?.value,
                "billStatus": "Pending with AE",
                "billDivision": this.billForm.get('division')?.value,
                "billCreationDate": new Date()
              }
            };

            // Call API to create bill
            this.vendorService.createBill(data).subscribe(
              (response: any) => {
                console.log(response);
                this._snackBar.open('Bill Submitted Successfully!', 'Ok', {
                  horizontalPosition: 'end',
                  verticalPosition: 'top',
                });
              },
              (error: any) => {
                console.error('Error creating bill:', error);
                this._snackBar.open('Error while submitting bill', 'Ok', {
                  horizontalPosition: 'end',
                  verticalPosition: 'top',
                });
              }
            );
          });
        });
      } else {
        // Handle cancellation
      }
    });
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let base64String = reader.result as string;
        base64String = base64String.replace('data:application/pdf;base64,', ''); // Remove prefix
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  }



}
