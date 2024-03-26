import { Component } from '@angular/core';
import { VendorService } from '../../services/vendor.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

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
  selector: 'app-view-all-projects',
  templateUrl: './view-all-projects.component.html',
  styleUrl: './view-all-projects.component.css'
})
export class ViewAllProjectsComponent {

  username: any;

  displayedColumns: string[] = ['sno', 'workName', 'agreementValue', 'projectStatus', 'createBill', 'action'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private vendorService: VendorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    this.getVendorIdByUsername();
  }

  getVendorIdByUsername() {
    this.vendorService.getVendorIdByUsername(this.username).subscribe(
      (response: any) => {
        const vendorId = response.data;
        if (vendorId != null) {
          this.vendorService.getAllVendorProjectsByVendorId(vendorId).subscribe(
            (response: any) => {
              console.log(response);
              this.dataSource = response;
            },
            (error: any) => {
              console.error(error);
            }
          );
        } else {
          console.error("Vendor ID is null")
        }
      },
      (error: any) => {
        console.error("Error : ", error);
      }
    );
  }

  navigateToRaiseBill(element: any): void {
    try {
      this.router.navigate(['/vendor/raise-bill', element.vendorProjectId, element.vendorId, element.workId]);
    } catch (error) {
      // Handle the error gracefully, for example by logging it
      console.error('Error while navigating to raise bill:', error);
      // You can also display a toast message or any other appropriate error handling mechanism
    }
  }
}
