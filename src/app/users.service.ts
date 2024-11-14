import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // authentication base url
  private AUTH_URL = "http://localhost:8081/v1/api/auth"
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

  async register(userData:any):Promise<any>{
    const registerUrl = `${this.AUTH_URL}/signup`;
    try {
      const response = await lastValueFrom(this.http.post<any>(registerUrl,userData));
      return response;

    } catch (error) {
      throw error
    }
  }
}
