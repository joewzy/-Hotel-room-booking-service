import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../room.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {

  roomList:any[]=[];
  errorMessage:string ='';
  currentPage = 1;

  constructor(
    private readonly router:Router,
    private readonly roomService:RoomService
  ){
    this.getRoomList();
  }



  async getRoomList(){
    try {
      const token:any = localStorage.getItem('token');
      const response = await this.roomService.getRooms(token,(this.currentPage-1).toString());
      // console.log(response);
      if(response.statusCode===200 && response.roomList){
        this.roomList = response.roomList;
      }

      
    } catch (error:any) {
      this.showError(error.message)
    }
  }

  deleteRoom(roomId:string){

  }

  navigateToUpdate(roomId:string){
    this.router.navigate(['/home/updateroom/',roomId]);
  }


  showError(msg:string){
    this.errorMessage=msg;
    setTimeout(
      ()=>{this.errorMessage=''}
      ,3000)
  }
}
