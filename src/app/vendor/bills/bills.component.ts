import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

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
  displayedColumns: string[] = ['sno', 'projectName', 'projectValue','status' ,'action'];
  dataSource = ELEMENT_DATA;
  constructor(private apiCall: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.getBillList();
  }

  getBillList() {
    const payload = {}
    this.apiCall.apiPostCall(payload, 'getProjectBillsView').subscribe(data => {
      this.dataSource = data.data;
    })
  }
}
