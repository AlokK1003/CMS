import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import configurl from '../../assets/config/config.json'
import { Customer } from '../Models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = configurl.apiServer.url + '/api/customers/';
  constructor(private http: HttpClient) { }
  getList(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url);
  }
  postData(customer: Customer): Observable<Customer> {debugger;
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Customer>(this.url, customer, httpHeaders);
  }
  updateData(customer: Customer): Observable<Customer> {debugger;
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.put<Customer>(this.url + customer.customersId, customer, httpHeaders);
  }
  deleteData(id: string): Observable<Customer> {
    debugger;
    let httpParams = new HttpParams().set('id', 5);
    let options = { params: httpParams };

    //return this.http.delete<Customer>(this.url,options);
    //const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    // return this.http.delete<Customer>(this.url + id,id,httpHeaders);
    return this.http.delete<Customer>(this.url + id, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
})
  }
  getCustomerDataById(id: string): Observable<Customer> {
    return this.http.get<Customer>(this.url + id);
  }

}
