import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { CustomerDto } from '../dto/CustomerDto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  saveCustomer(customer:CustomerDto):Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/v1/customer', {
      id:customer.id,
      name:customer.name,
      address:customer.address,
      salary:Number(customer.salary),
    })
  }

  loadAll():Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/v1/customer/list');
  }

  deleteCustomer(id:any):Observable<any> {
    return this.http.delete<any>('http://localhost:8080/api/v1/customer?id='+id)
  }

  getCustomer(id:any):Observable<any> {
    return this.http.get<CustomerDto>('http://localhost:8080/api/v1/customer/'+id)
  }
}
