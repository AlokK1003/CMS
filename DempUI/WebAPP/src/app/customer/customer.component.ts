import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormsModule, Validators,ReactiveFormsModule  } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomerService } from '../customerlist/customer.service';
import { Customer } from '../Models/Customer';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm : any;
  massage = "";
  constructor(private formbulider: FormBuilder,private formGroup:ReactiveFormsModule,
    private customerService: CustomerService,private router: Router,
    private jwtHelper : JwtHelperService,private toastr: ToastrService) { }


  ngOnInit(): void {
    this.customerForm = this.formbulider.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      additionalRequirement: [''],
      createdBy: [localStorage.getItem('UserId') as string, [Validators.required]],
    });
  }
  PostForm(customer: Customer) {
    const customerFormMaster = this.customerForm.value;
    customerFormMaster.createdBy=localStorage.getItem('UserId') as string
    this.customerService.postData(customerFormMaster).subscribe(
      () => {
        this.customerForm.reset();
        this.toastr.success('Data Saved Successfully');
        this.router.navigate(["/customerlist"]);
      }
    );
  }
  Clear(customer: Customer){
    this.customerForm.reset();
    this.router.navigate(["/customerlist"]);
  }
  public logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(["/"]);
  }
  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

}
