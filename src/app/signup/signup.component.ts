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

  toLogin(){
    this.router.navigate(['/login'])
  }


  showError(msg:string){
    this.errorMessage=msg
    setTimeout(()=>{
      this.errorMessage=''
    },3000)
  }
}
