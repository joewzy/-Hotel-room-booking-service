import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './dashboard/home/home.component';
import path from 'path';
import { NavComponent } from './dashboard/nav/nav.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'signup',component:SignupComponent},
    {path:'home',component:HomeComponent,
        children:[
       {path:'navbar',component:NavComponent},
    ]}
];
