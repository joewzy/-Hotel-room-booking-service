import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-updateroom',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './updateroom.component.html',
  styleUrl: './updateroom.component.scss'
})
export class UpdateroomComponent {

  constructor(
    private readonly roomService:RoomService,
    private router:Router,
    private readonly route:ActivatedRoute
  ){
    this.getRoomById();
  }

  errorMessage:string='';
  roomDetails:any={};
  roomId:any;

 

  async getRoomById() {
    this.roomId =this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');

    if(!this.roomId|| !token){
      this.showError("Room Id/Token required")
      return;
    }
    try {
      const roomDetailsResponse = await this.roomService.getRoom(token,this.roomId);
      this.roomDetails.name = roomDetailsResponse.name;
      this.roomDetails.roomType  = roomDetailsResponse.roomType;
      this.roomDetails.price = roomDetailsResponse.price;
      this.roomDetails.available = roomDetailsResponse.available;

    } catch (error:any) {
      this.showError(error.message)
    }
    
  }

  async updateRoom(){
    try{
      const token = localStorage.getItem('token');
      if(!token){
        throw new Error("Token not found");
      }
      const response = await this.roomService.updateRoom(this.roomId,token,this.roomDetails);
      if(response.statusCode===200){
        this.router.navigateByUrl("/rooms");
      }
      else{
        this.showError(response.message);
      }
    }
    catch(error:any){
      this.showError(error.message);
    }
  }

  showError(mesg:string){
    this.errorMessage=mesg;
    setTimeout(
      ()=>{this.errorMessage=''}
    ,3000)
  }

}
