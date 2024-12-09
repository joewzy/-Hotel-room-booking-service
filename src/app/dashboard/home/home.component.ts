import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UsersService } from '../../users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor( private readonly userService:UsersService,private router:Router){}

  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isCustomer:boolean = false;

  ngOnInit():void{
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isCustomer = this.userService.isCustomer();

  }

  logout():void{
    this.userService.logOut();
    this.isAuthenticated=false;
    this.isAdmin =false;
    this.isCustomer= false;
    this.router.navigateByUrl("/login");
  }

}
