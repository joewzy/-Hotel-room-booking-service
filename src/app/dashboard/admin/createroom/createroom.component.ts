import { Component } from '@angular/core';
import { RoomService } from '../../room.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { timeout } from 'rxjs';


@Component({
  selector: 'app-createroom',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './createroom.component.html',
  styleUrl: './createroom.component.scss'
})
export class CreateroomComponent {

  errorMessage:string= '';

  roomData:any={
    name:'',
    roomType:'',
    price:'',
    available:'',
  };

  constructor(
    private roomService:RoomService,
    private router:Router
  ){}

  async createRoom(){
    if(!this.roomData.name || !this.roomData.roomType || !this.roomData.price || !this.roomData.available){
      this.showError("Please fill in all fields")
      return;
    }

    const addroom = confirm('Add new Room');
    if(!addroom){
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if(!token){
        throw new Error('Token not found')
      }

      const response = await this.roomService.addRoom(token,this.roomData);
      if(response.statusCode===201){
        this.router.navigateByUrl("/adminboard");
      }
      else{
        this.showError(response.message)
      }
    } catch (error:any) {
      this.showError(error.message);
    }
   
  }

  showError(msg:string){
    this.errorMessage= msg;
    setTimeout(
      ()=>{this.errorMessage=''}
      ,5000)
  }

}
