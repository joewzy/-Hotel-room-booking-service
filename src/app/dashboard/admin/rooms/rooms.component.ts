import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../room.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {

  roomList:any[]=[];
  errorMessage:string ='';
  currentPage = 0;
  totalPages= 0 ;
  previous:boolean = false;

  constructor(
    private readonly router:Router,
    private readonly roomService:RoomService
  ){
    this.getRoomList();
  }



  async getRoomList(){
    try {
      const token:any = localStorage.getItem('token');
      const response = await this.roomService.getRooms(token,(this.currentPage).toString());
      // console.log(response);
      if(response.statusCode===200 && response.roomList){
        this.roomList = response.roomList;
        this.totalPages = response.totalPages;
      }

      
    } catch (error:any) {
      this.showError(error.message)
    }
  }

  async getNextPage(){
    let page = this.currentPage;
    this.previous=true;
    this.currentPage = page+1;
    if(this.currentPage >= this.totalPages){
      this.currentPage = this.totalPages-1;
    }
    this.getRoomList();
    console.log(this.totalPages,this.currentPage,page)
    

  }

  async getPrevPage(){
    let page = this.currentPage;
    this.currentPage=page-1;
    
    if(this.currentPage<=0){
      this.previous=false;
      this.currentPage=0;
    }
    this.getRoomList();
  }

  async deleteRoom(roomId:string){

    const deleteRoom = confirm('Delete Room');
    if(!deleteRoom){
      return;
    }

    try {
      const token = window.localStorage.getItem('token');
      if(!token){
        throw new Error('Token not found')
      }

      const response = await this.roomService.deleteRoom(token,roomId);
      // this.router.navigate(['/home/rooms']);
      this.getRoomList();

    } catch (error:any) {
      this.showError(error.message);
    }
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
