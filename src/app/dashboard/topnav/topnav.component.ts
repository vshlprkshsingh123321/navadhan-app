import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/loginServices/authentication.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.less']
})
export class TopnavComponent implements OnInit {

  @Input('user') user!: boolean;
  authenticatedUser: boolean = false; 

  constructor(private router: Router, private _authService: AuthenticationService) { }

  ngOnInit(): void {
    console.log(this.user);
  }

  logout() {
    this._authService.logout();
    this.router.navigate(['/']);
  }

}
