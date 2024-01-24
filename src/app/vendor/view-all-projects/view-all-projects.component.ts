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
  selector: 'app-view-all-projects',
  templateUrl: './view-all-projects.component.html',
  styleUrl: './view-all-projects.component.css'
})
export class ViewAllProjectsComponent {
  displayedColumns: string[] = ['sno', 'projectName', 'projectValue', 'projectLocation', 'projectStatus', 'createBill', 'action'];
  dataSource = ELEMENT_DATA;
}
