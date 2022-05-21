import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl='http://localhost:8000/api/login';
  userUrl='http://localhost:8000/api/user';
  logoutUrl='http://localhost:8000/api/logout';
  httpOpts = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
    observe: 'response' as 'response'
  };
  constructor(private http:HttpClient, private router: Router) {

  }
  login(body:any){
    return this.http.post(this.loginUrl, body, this.httpOpts)
  }

  logout(){
    localStorage.removeItem('token')
  }
  loggedIn() {
    return localStorage.getItem('token') !== null;
  }
}