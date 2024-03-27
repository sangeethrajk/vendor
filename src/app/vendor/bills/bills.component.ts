import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../services/vendor.service';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  sno: string;
  projectName: string;
  projectValue: string;
  projectLocation: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { sno: '1', projectName: '14 Shops at Anna Nagar', projectValue: '50 Cr', projectLocation: 'Anna Nagar' },
];

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})
export class BillsComponent implements OnInit {

  username: any;
  vendorId: any;

  displayedColumns: string[] = ['sno', 'invoiceNumber', 'billNumber', 'billTotal', 'billStatus', 'lcpdf'];
  dataSource = new MatTableDataSource<any>();

  constructor(private vendorService: VendorService) { }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    this.getVendorId();
  }

  getVendorId() {
    this.vendorService.getVendorIdByUsername(this.username).subscribe(
      (response: any) => {
        this.vendorId = response.data;
        this.vendorService.getBillsByVendorId(this.vendorId).subscribe(
          (response: any) => {
            console.log("Response in bills component", response.data);
            this.dataSource = response.data;
          }, (error: any) => {
            console.error(error);
          }
        );
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  openPdfInNewTab(lcFormatFileName: string | null) {
    if (lcFormatFileName) {
      // Construct the URL of the PDF file
      const pdfUrl = `file:///c:/${lcFormatFileName}`;

      // Open the PDF in a new tab
      window.open(pdfUrl, '_blank');
    }
  }

}
