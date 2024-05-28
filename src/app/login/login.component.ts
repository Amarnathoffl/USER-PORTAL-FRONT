import { Component } from '@angular/core';
import { AdminAPIService } from '../adminAPIservices/admin-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
email:string=""
password:string=""

constructor(private adminAPI:AdminAPIService){}

login(){
  if(this.email && this.password){
   //api call
   this.adminAPI.authenticateAPI(this.email,this.password)
  }else{
    alert("Please fill the form completely")
  }
}
}
