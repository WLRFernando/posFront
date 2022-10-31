import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CustomerDto } from './dto/CustomerDto';
import { CustomerService } from './service/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  customerForm= new FormGroup({
    id: new FormControl(null,
      [Validators.required,
        Validators.maxLength(5), Validators.minLength(3)]),
    name: new FormControl(null,
      [Validators.required,
        Validators.maxLength(15), Validators.minLength(3)]),
    address: new FormControl(null,
      [Validators.required,
        Validators.maxLength(45), Validators.minLength(5)]),
    salary: new FormControl(null, Validators.required)
  });
  customerList:CustomerDto[]=[];
  constructor(private customerService:CustomerService, private toastr:ToastrService){
    this.loadCustomers();
  }
  loadCustomers() {
    this.customerService.loadAll().subscribe(
      response=>{
        if (response.code===200) {
          this.customerList=response.data.list;
        }
      }
    );
  }

  saveCustomer(){
    let dto = new CustomerDto(
      this.customerForm.get('id')?.value,
      this.customerForm.get('name')?.value,
      this.customerForm.get('address')?.value,
      this.customerForm.get('salary')?.value,
    );
    this.customerService.saveCustomer(dto).subscribe(response=>{
      console.log(response);
      this.viewAlert('success', dto.name+' saved!')
      this.loadCustomers();
    },error=>{
      console.log(error);
      
    })
  }
  viewAlert(type:string, message:string) {
    if(type==='success') {
      this.toastr.success(message, 'success!');
    }
    else if(type=='notfound') {
      this.toastr.error(message, 'ID not found')
    }
  }
  deleteCustomer(id:any){
    if(confirm('Are You Sure')){
      this.customerService.deleteCustomer(id).subscribe(response=>{
        if (response.code==204) {
          this.viewAlert('danger', 'Deleted!');
          this.loadCustomers();
        }
      })
    }
    
  }
  getCustomer() {
    this.customerService.getCustomer(
      this.customerForm.get('id')?.value
    ).subscribe(response=> {
      if(response.data != null){
        this.customerForm.patchValue({
          name:response.data.name,
          address:response.data.address,
          salary:response.data.salary,
          
        })
      }
      else{
        this.viewAlert('notfound', 'ID not found')
      }
    })
  }
}
