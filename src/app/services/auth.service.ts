import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  registerVendor(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/auth/signup`, data, { responseType: 'text' });
  }

  authenticateVendor(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/auth/vendor/login`, data);
  }
}
