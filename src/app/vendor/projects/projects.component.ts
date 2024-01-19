import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
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
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'projectName', 'projectValue', 'projectLocation', 'action'];
  dataSource = ELEMENT_DATA;
  constructor(private apiCall: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.getProjectList();
  }

  getProjectList() {
    const payload = {}
    this.apiCall.apiPostCall(payload, 'getAllProjectsDetails').subscribe(data => {
      this.dataSource = data.data;
    })
  }
  edit(type, id) {
    this.router.navigate(['/' + type + '-project', id]);
  }
}
