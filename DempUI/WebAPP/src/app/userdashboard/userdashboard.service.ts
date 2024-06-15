import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDashboard } from '../Models/UserDashboard';
import configurl from '../../assets/config/config.json'

@Injectable({
  providedIn: 'root'
})
export class UserdashboardService {

    url = configurl.apiServer.url + '/api/customers/';
    constructor(private http: HttpClient) { }
    getUserDashboardDetailsById(id: string): Observable<UserDashboard> {
      return this.http.get<UserDashboard>(this.url + 'UserDashboardDetails');
    }
  }
  