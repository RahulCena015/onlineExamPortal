import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
    password:''
  };

  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log("Login Button clicked");

    if(this.loginData.username.trim()=='' || this.loginData.username==null)
    {
       this.snack.open('username is required','',{
        duration: 2000,
       });
       return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null)
    {
       this.snack.open('password is required','',{
        duration: 2000,
       });
       return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("Success");
        console.log(data);

        //login...
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);

            //redirect: ADMIN: admin-dashboard
            //redirect: NORMAL: normal-dashboeard
            if(this.login.getUserRole()=="Admin"){
              //ADMIN DASHBOARD
              //window.location.href='/admin';
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
            }else if(this.login.getUserRole()=="Normal"){
              //NORMAL DASHBOARD
              //window.location.href='/user-dashboard';
              this.router.navigate(['user-dashboard/0']);
              this.login.loginStatusSubject.next(true);
            }else{
              this.login.logout();
              //location.reload();
            }
            
          }
        );
      },
      (error)=>{
        console.log("Error!");
        console.log(error);
        this.snack.open("Invalid credentials",'',{
          duration:2000,
        });
      }
    );

  }

}
