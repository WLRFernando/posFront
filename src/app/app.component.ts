import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  customerForm= new FormGroup({
    id: new FormControl(null, [Validators.required, Validators.maxLength(5),
      Validators.minLength(3)]),
    name: new FormControl(null, [Validators.required, Validators.maxLength(15),
      Validators.minLength(3)]),
    address: new FormControl(null, [Validators.required, Validators.maxLength(45),
      Validators.minLength(5)]),
    salary: new FormControl(null, Validators.required),
  })

  saveCustomer(){
    console.log(this.customerForm);
    
  }
}
