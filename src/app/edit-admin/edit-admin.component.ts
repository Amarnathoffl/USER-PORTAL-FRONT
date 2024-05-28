import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminAPIService } from '../adminAPIservices/admin-api.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  @Output() onAdminChange = new EventEmitter
editAdminStatus:boolean = false

adminProfile:string="https://cdn-icons-png.flaticon.com/512/9703/9703596.png"
adminDetails:any ={}

constructor(private adminAPI:AdminAPIService){}
ngOnInit(): void {
  this.adminAPI.getAdminDetails().subscribe((result:any)=>{
this.adminDetails = result
if(result.picture){
  this.adminProfile = result.picture
}
  })
}


editAdminBtn(){
  this.editAdminStatus = true
}
cancel(){
  this.editAdminStatus = false
}


getFile(event:any){
let uploadFile = event.target.files[0]
// this.adminDetails = URL.createObjectURL(uploadFile)
let fr = new FileReader()
fr.readAsDataURL(uploadFile)
fr.onload = (event:any)=>{
  this.adminProfile = event.target.result
  this.adminDetails.picture = this.adminProfile 
}
}

updateAdmin(){
  this.adminAPI.updateAdminDetails(this.adminDetails).subscribe({
    next:(result:any)=>{
      this.editAdminStatus = false
      alert("Updated successfully..!")
      sessionStorage.setItem("adminDetails",JSON.stringify(result))
      this.onAdminChange.emit(result.name)
    },
    error:(reason:any)=>{
      console.log(reason);
      alert(" Updation failed...Please try again after some time..!!!")
      
    }
  })
}
}
