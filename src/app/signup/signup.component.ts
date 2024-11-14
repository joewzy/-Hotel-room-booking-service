import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  errorMessage:string='';
  userData:any={
    name:'',
    email:'',
    password:''
  }
  password2:string='';

  constructor(
    private readonly userService:UsersService,
    private router:Router
  ){}

  async onCreateUser(){
    const isValidData = this.validUserData();

    if(!isValidData){
      return;
    }

    try {
      const response = await this.userService.createUser(this.userData);

      if(response.statusCode===201){
        this.router.navigate(['/login'])
      }
      else{
        this.showError(response.message)
      }

    } 
    catch (error:any) {
      this.showError(error.message)  
    }
  }

  toLogin(){
    this.router.navigate(['/login'])
  }

  validUserData(){
    if(!this.userData.name || !this.userData.email || !this.userData.password){
      this.showError("All fields are required");
      return false;
    }
    if (!(this.userData.password===this.password2)) {
      this.showError("Password deos not match, try again")
      return false;
    } else {
      return true;
    }
  }


  showError(msg:string){
    this.errorMessage=msg
    setTimeout(()=>{
      this.errorMessage=''
    },3000)
  }
}
