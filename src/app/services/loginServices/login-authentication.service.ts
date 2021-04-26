import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginAuthenticationService {

  private loggedIn : boolean = false;
  private token! : string;

  constructor(private http: HttpClient) { }

  setLoggedIn(loggedIn: boolean, token? : string) {
    this.loggedIn = loggedIn;
    // if(this.token)
      // this.token = token;
  }

}
