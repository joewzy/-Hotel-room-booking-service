import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AdminboardComponent } from './dashboard/admin/adminboard/adminboard.component';
import { RoomsComponent } from './dashboard/admin/rooms/rooms.component';
import { ViewroomsComponent } from './dashboard/customer/viewrooms/viewrooms.component';
import { CreateroomComponent } from './dashboard/admin/createroom/createroom.component';
import { UpdateroomComponent } from './dashboard/admin/updateroom/updateroom.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'signup',component:SignupComponent},
    {path:'home',component:HomeComponent,
        children:[
       {path:'adminboard',component:AdminboardComponent},
       {path:'rooms',component:RoomsComponent},
       {path:'createroom',component:CreateroomComponent},
       {path:'updateroom/:id',component:UpdateroomComponent},
       {path:'viewrooms',component:ViewroomsComponent}
    ]},
    {path:'',redirectTo:'/login',pathMatch:'full'},
];
