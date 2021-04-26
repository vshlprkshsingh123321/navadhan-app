import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './services/loginServices/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'menu-framework';

  constructor( private _authService: AuthenticationService ) {}

  ngOnInit() {
    this._authService.autoAuthUser();
  }
}
