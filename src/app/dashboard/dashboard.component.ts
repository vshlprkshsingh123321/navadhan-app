import { Component, OnDestroy, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../services/loginServices/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userIsAuthenticated: boolean = false;
  userMenu: Array<any> = [];
  finalMenuArray: Array<any> = [];
  private authListenerSubs!: Subscription;

  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this._authenticationService.getIsAuth();
    this.authListenerSubs = this._authenticationService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      console.log(this.userIsAuthenticated);
    });
    this._authenticationService.getUser().subscribe((res) => {
      console.log(res);
    });
    this._authenticationService.getUserMenu().subscribe((response:any) => {
      let data = response.result;
      data.map((element:any) => {
        element.user_submenu = [];
      });
      console.log('added submenu empty:', data)
      this.structureMenuData(data);
    });
    console.log(this.authListenerSubs);

  };

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  };

  structureMenuData = (response: any) => {
    // console.log(response.result);
    this.userMenu = response;
    response.forEach((element: any, index: any) => {
      // console.log('each:',element);
      switch(element.menu_level){
        case 3:
         this.userMenu.find((el) => {
           return el.menu_id == element.parent_menu_id
         }).user_submenu.push(element);
         console.log()
        //  this.userMenu.find((el) => {
        //   return el.menu_id == element.menu_id
        // }).splice(element,1);
        break;
        case 2:
         this.userMenu.find((el) => {
           return el.menu_id == element.parent_menu_id
         }).user_submenu.push(element);
        //  this.userMenu.find((el) => {
        //   return el.menu_id == element.menu_id
        // }).splice(element,1);
        break;
        case 1:
         this.userMenu.find((el) => {
           return el.menu_id == element.parent_menu_id
         }).user_submenu.push(element);
         
        //  this.userMenu.find((el) => {
        //   return el.menu_id == element.menu_id
        // }).splice(element,1);
        break;
        // case 0:
        //  this.userMenu.find((el) => {
        //    el.menu_id == element.parent_menu_id
        //  }).user_submenu.push(element);
        //  this.userMenu.find((el) => {
        //   el.menu_id == element.menu_id
        // }).splice(element,1);
        // break;
        default: 
          console.log('no such menu');
        break;
      }
    });
    this.finalMenuArray = this.userMenu.filter((el) => {
      return el.menu_level == 0;
    });
    console.log('structured data:', this.userMenu, this.finalMenuArray)
  };

}
