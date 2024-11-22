import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // authentication base url
  private AUTH_URL = "http://localhost:8081/v1/api/auth"
  private ADMIN_URL ="http://localhost:8081/v1/api/admin";

  constructor(private http:HttpClient) {}

  async login(email:string,password:string):Promise<any>{
    const loginUrl = `${this.AUTH_URL}/login`;
    try {
      const response = await lastValueFrom(this.http.post<any>(loginUrl,{email,password}));
      return response;
      
    } catch (error) {
      throw error
    }
  }

  async createUser(userData:any):Promise<any>{
    const registerUrl = `${this.AUTH_URL}/signup`;
    try {
      const response = await lastValueFrom(this.http.post<any>(registerUrl,userData));
      return response;

    } catch (error) {
      throw error
    }
  }

  async register(userData:any, token:string):Promise<any>{
    const registerUrl = `${this.ADMIN_URL}/register`;
    const headers = new HttpHeaders(
      {
        'Authorization':`Bearer ${token}`
      }
    );

    try {
      const response = await lastValueFrom(this.http.post<any>(registerUrl,userData,{headers}));
      return response;

    } catch (error) {
      throw error
    }
  }



  //  Authentication Methods
  logOut():void{
    if(typeof localStorage!=='undefined'){
      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
    }
  }

  isAuthenticated():boolean{
    if(typeof localStorage !=='undefined'){
      const token = localStorage.getItem('token')
      return !!token;
    }
    return false;
  }

  isAdmin():boolean{
    if(typeof localStorage !=='undefined'){
      const role = localStorage.getItem('userRole');
      return role == 'ADMIN';
    }
    return false;
  }

  isCustomer():boolean{
    if(typeof localStorage !=='undefined'){
      const role = localStorage.getItem('userRole');
      return role == 'CUSTOMER';
    }
    return false;
  }
}
