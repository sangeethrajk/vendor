import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  raisedBill: any;
  total: any;
  cleared: any;
  pending: any;

  constructor(private titleService: Title, private apiCall: ApiService) {
    const payload = {}
    this.apiCall.apiPostCall(payload, 'getDashBoardCounts').subscribe(data => {
      this.raisedBill = data.data.raisedBills;
      this.total = data.data.totalProjects;
      this.cleared = data.data.approved;
      this.pending = data.data.pending;
    })
  }
  updateTitle() {
    this.titleService.setTitle('Home');
  }
}
