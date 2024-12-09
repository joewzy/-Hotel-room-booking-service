import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private ROOM_URL = "http://localhost:8081/v1/api/admin/room"

  constructor(private http:HttpClient) { }

  // create add new rooms
  async addRoom(token:string, roomData:any):Promise<any>{
    const url =  `${this.ROOM_URL}/new` ;
    const headers = new HttpHeaders(
      {'Authorization':`Bearer ${token}`}
    );

    try {
      const response = await lastValueFrom(this.http.post<any>(url,roomData,{headers}))
      return response;

    } catch (error) {
      throw error;
    }

  }

  //fetch all rooms
  async getAllRooms(token:string):Promise<any>{
    const url =  `${this.ROOM_URL}/getrooms` ;
    const headers = new HttpHeaders(
      {'Authorization':`Bearer ${token}`}
    );

    try {
      const response = await lastValueFrom(this.http.get<any>(url,{headers}))
      return response;

    } catch (error) {
      throw error;
    }

  }

  //fetch specific room
  async getRoom(token:string, roomid:string):Promise<any>{
    const url =  `${this.ROOM_URL}/getrooms/${roomid}` ;
    const headers = new HttpHeaders(
      {'Authorization':`Bearer ${token}`}
    );

    try {
      const response = await lastValueFrom(this.http.get<any>(url,{headers}))
      return response;

    } catch (error) {
      throw error;
    }

  }

   // update existing room
   async updateRoom(token:string, roomid:string, roomData:any):Promise<any>{
    const url =  `${this.ROOM_URL}/getrooms/update/${roomid}` ;
    const headers = new HttpHeaders(
      {'Authorization':`Bearer ${token}`}
    );

    try {
      const response = await lastValueFrom(this.http.put<any>(url,roomData,{headers}))
      return response;

    } catch (error) {
      throw error;
    }

  }
  
  //delete room
  async deleteRoom(token:string, roomid:string):Promise<any>{
    const url =  `${this.ROOM_URL}/getrooms/delete/${roomid}` ;
    const headers = new HttpHeaders(
      {'Authorization':`Bearer ${token}`}
    );

    try {
      const response = await lastValueFrom(this.http.delete<any>(url,{headers}))
      return response;

    } catch (error) {
      throw error;
    }

  }


}

