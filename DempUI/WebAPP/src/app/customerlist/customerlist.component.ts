import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomerService } from '../customerlist/customer.service';
import { Customer } from '../Models/Customer';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {
  customerForm : any;
  massage = "";
  custId=0;
  manageCustomer = false;
  custometList=true;
  Customer?: Observable<Customer[]>;
  constructor(private formbulider: FormBuilder,
    private customerService: CustomerService,private router: Router,
    private jwtHelper : JwtHelperService,private toastr: ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('UserId')!=null){
      this.getList();
    }
    this.customerForm = this.formbulider.group({
      customersId:[0],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
        Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', [Validators.required]],
      additionalRequirement: [''],
      createdBy: [localStorage.getItem('UserId') as string, [Validators.required]],
    });
  }
  getList() {
    this.Customer = this.customerService.getList();
    this.manageCustomer=false;
    this.custometList=true;
  }
  deleteData(id: string) {
    this.customerService.deleteData(id).subscribe(customerResult => {
      this.getList();
    });

  }
  getCustomerForEdit(id: string) {
    this.customerService.getCustomerDataById(id).subscribe(customerResult => {
      this.custId = customerResult.customersId;
      this.customerForm.controls['firstName'].setValue(customerResult.firstName);
      this.customerForm.controls['lastName'].setValue(customerResult.lastName);
      this.customerForm.controls['email'].setValue(customerResult.email);
      this.customerForm.controls['phone'].setValue(customerResult.phone);
      this.customerForm.controls['address'].setValue(customerResult.address);
      this.customerForm.controls['additionalRequirement'].setValue(customerResult.additionalRequirement);
      this.manageCustomer=true;
      this.custometList=false;
    });
  }
  SubmitForm(customer: Customer) { debugger;
    const customerFormMaster = this.customerForm.value;
    customerFormMaster.createdBy=localStorage.getItem('UserId') as string
    if(this.custId==0){
      customerFormMaster.customersId=0;
      this.customerService.postData(customerFormMaster).subscribe(
        () => {
          this.customerForm.reset();
          this.toastr.success('Customr Saved Successfully');
          this.custId=0;
          this.getList();
        }
      );
    }
    else{
      customerFormMaster.customersId=this.custId;
      this.customerService.updateData(customerFormMaster).subscribe(
        () => {
          this.customerForm.reset();
          this.toastr.success('Customer Updatd Successfully');
          this.custId=0;
          this.getList();
        }
      );
    }
    
   
  }
  Clear(customer: Customer){
    this.customerForm.reset();
    this.manageCustomer=false;
    this.custometList=true;
  }
  addCustomer(){
    this.customerForm.reset();
    this.manageCustomer=true;
    this.custometList=false;
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
