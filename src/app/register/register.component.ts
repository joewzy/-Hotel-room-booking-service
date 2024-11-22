import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  errorMessage:string='';
  formData:any={
    name:'',
    email:'',
    password:'',
    userRole:''
  }

  constructor(
    private readonly userService:UsersService,
    private router:Router
  ){}

  async onRegister(){
    //register logic here
    if(!this.formData.name || !this.formData.email || !this.formData.password || !this.formData.userRole){
      this.showError("Please fill in all fields");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if(!token){
        throw new Error("Token not found");
      }
      const response = await this.userService.register(this.formData,token);
      if (response.statusCode===201){
        this.router.navigate(['/login'])
      }
      else{
        this.showError(response.message);
      }
    } catch (error:any) {
      this.showError(error.message)
    }
  }

  toLogin(){
    this.router.navigate(['/login']);
  }

  showError(msg:string){
    this.errorMessage=msg;
    setTimeout(()=>{
      this.errorMessage=''}
      ,3000)
  }
}
