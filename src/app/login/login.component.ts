import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email:string = '';
  password:string='';
  errorMessage:string='';

  constructor(
    private readonly userService:UsersService,
    private router:Router){}

  async onLogin(){
    if (!this.email || !this.password){
      this.showError("Email and password required");
      return;
    }
    try {
      const response = await this.userService.login(this.email,this.password);
      // console.log(response);
      if(response.statusCode===200){
        localStorage.setItem('token',response.token);
        localStorage.setItem('userRole',response.userRole);
        const role = localStorage.getItem('userRole');
        if(this.userService.isAdmin()){
          this.router.navigateByUrl('/home/adminboard');
        }
        else if(this.userService.isCustomer()){
          this.router.navigateByUrl('/home/rooms');
        }
        // console.log(response.message, localStorage.getItem('token'))
      }
      else{
        this.showError(response.message);
      }
      
    } catch (error:any) {
      this.showError("Request Failed!")
    }
  }

  toRegister(){
    this.router.navigate(['/signup']);
    }



  showError(msg:string){
    this.errorMessage = msg;
    setTimeout(
      ()=>{
        this.errorMessage=''
      },3000)
  }
}
