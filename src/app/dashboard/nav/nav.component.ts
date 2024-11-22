import { Component } from '@angular/core';
import { UsersService } from '../../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

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
