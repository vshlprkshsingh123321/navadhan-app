import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../services/loginServices/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  loginForm! : FormGroup;
  users : Array<any> = [];
  userIsAuthenticated: boolean = false;
  private authListenerSubs!: Subscription;

  constructor(private fb: FormBuilder, private _authService : AuthenticationService, private router: Router) { }

  ngOnInit(): void {

    this.authListenerSubs = this._authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      console.log(this.userIsAuthenticated);
    });

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.users = [
      {
        'username': 'sanku',
        'password': 'Sanku@678',
        'initials': 'S'
      },
      {
        'username': 'vishal',
        'password': 'xyz',
        'initials': 'VS'
      }
    ]

  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  };

  login() {
    // this.users.forEach(element => {
    //   console.log(element, this.username);
      
    //   if (element.username == this.username!.value && element.password == this.password!.value) {
    //     console.log('user present');
    //     this.router.navigate(['/dashboard']);
    //   }
    // });
    this._authService.postUser();
  };

  getusernameErrorMsg() {
		return this.username!.hasError('required') ? 'Please enter your username.' : '';
	}

  getPasswordErrorMsg() {
		return this.password!.hasError('required') ? 'Please enter your password.' : '';
	}

  get username() {
		return this.loginForm.get('username');
	}

  get password() {
    return this.loginForm.get('password');
  }

}
