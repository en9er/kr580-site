import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl='http://localhost:4200/api/login';
  logoutUrl='http://localhost:8000/api/logout';
  httpOpts = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
    observe: 'response' as 'response'
  };
  user: boolean;

  constructor(private http:HttpClient, private router: Router, private cookieService: CookieService) {
    this.user = false;
  }
  login(body:any): Observable<HttpResponse<string>>{
    return this.http.post<string>(this.loginUrl, body, this.httpOpts)
  }

  logout(){
    return this.http.post<string>(this.logoutUrl, this.httpOpts)
  }
  isAdmin(){
    const body = {}
    return this.http.post<string>("http://localhost:4200/api/isAdmin", body, this.httpOpts)
  }
}
