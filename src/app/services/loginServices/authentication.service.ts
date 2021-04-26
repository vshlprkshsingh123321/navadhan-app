import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { shareReplay } from "rxjs/operators";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated: boolean = false;
  private token!: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken(){
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(user: any) {
    console.log(user);
    console.log(user.email, user.password);
    let email = user.email;
    let password = user.password;
    return this.http.post('/api/login', {email, password}).pipe(shareReplay())
  }

  getUser() {
    return this.http.get('http://localhost:3000/api/users');
  }

  postUser() {
    let data = {
      id : null,
      username: 'sanku',
      name : 'xyz', 
      password : 'Sanku@678'
    }
    this.http.post<{token: string, userid: number}>('http://localhost:3000/login', data).subscribe((response) => {
      console.log(response);
      const token = response.token; 
      this.token = token;
      if(token) {
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
      }
      console.log(token);
      this.saveAuthData(token, response.userid);
      this.router.navigate(['/dashboard']);
    });
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if(!authInfo) {
      return;
    }
    this.token = authInfo?.token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
  }

  private saveAuthData(token: string, userid: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('userid', userid);
    // localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    // localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userid');
    if(!token && !userid) {
      return;
    }
    return {
      token: token,
      userid: userid
    }
  }

  getUserMenu() {
    return this.http.get('http://localhost:3000/user/menu');
  }

}
 