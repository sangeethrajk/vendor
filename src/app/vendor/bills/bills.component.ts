import { Component } from '@angular/core';

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
export class BillsComponent {
  displayedColumns: string[] = ['sno', 'projectName', 'projectValue', 'projectLocation', 'billStatus'];
  dataSource = ELEMENT_DATA;
}
