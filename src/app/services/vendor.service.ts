import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private baseUrl = environment.apiURL;

  token = sessionStorage.getItem('token');
  headers = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };

  constructor(private http: HttpClient) { }

  getAllWorks(division: any): Observable<any> {
    const encodedDivision = encodeURIComponent(division);
    return this.http.post(`${this.baseUrl}/api/v1/bill/getAllWorksByDivision?division=${encodedDivision}`, { id: 1 }, this.headers);
  }

  getVendorIdByUsername(username: any): Observable<any> {
    const encodedUsername = encodeURIComponent(username);
    return this.http.post(`${this.baseUrl}/api/v1/bill/getVendorIdByUsername/${encodedUsername}`, { id: 1 }, this.headers);
  }

  getAllVendorProjectsByVendorId(id: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/bill/getAllVendorProjectsByVendorId/${id}`, { id: 1 }, this.headers);
  }

  createVendorProject(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/bill/addVendorProject`, data, this.headers);
  }

  getWorkById(id: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/bill/getWorkById/${id}`, { id: 1 }, this.headers);
  }

  createBill(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/bill/createBill`, data, this.headers);
  }

  getBillsByVendorId(vendorId: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/bill/getBillsByVendorId/${vendorId}`, { id: 1 }, this.headers);
  }

}
