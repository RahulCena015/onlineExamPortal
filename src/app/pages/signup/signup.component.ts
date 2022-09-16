import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private snack:MatSnackBar) { }

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.user.username==''||this.user.username==null){
     // alert("Mandatory field");
     this.snack.open("username is required",'ok',{
      duration:3000,
      verticalPosition:'top'
     });
      return;
    }
    //addUser: userservic
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        //success
        console.log(data);
        //alert("Success");
        Swal.fire("Success","user is registered successfully","success");
      },
      (error)=>{
        //error
        console.log(error);
        //alert("Something went wrong");
        if(this.user.username!=null){
        this.snack.open("Username already exist..",'ok',{
          duration: 2000
        })
        }
      }
      );

  }


  


}
