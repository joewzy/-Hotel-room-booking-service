import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewrooms',
  standalone: true,
  imports: [],
  templateUrl: './viewrooms.component.html',
  styleUrl: './viewrooms.component.scss'
})
export class ViewroomsComponent {

  roomList:any[]=[];
  errorMessage:string ='';
  currentPage = 0;
  totalPages= 0 ;
  previous:boolean = false;

  constructor(
      private readonly router:Router,
      private readonly customerService:CustomerService){
      this.getRoomList();
    }
  
  
  
    async getRoomList(){
      try {
        const token:any = localStorage.getItem('token');
        const response = await this.customerService.getRooms(token,(this.currentPage).toString());
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
  
    async bookRoom(){}


    showError(mesg:string){
      this.errorMessage=mesg;
    setTimeout(
      ()=>{this.errorMessage=''}
      ,3000)

    }

}
