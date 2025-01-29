import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private CUSTOMER_URL = "http://localhost:8081/v1/api/user"


  constructor(private http:HttpClient) { }


    async getRooms(token:string,pageNumber:string):Promise<any>{
      const url =  `${this.CUSTOMER_URL}/rooms?pageNumber=${pageNumber}` ;
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
  
}
