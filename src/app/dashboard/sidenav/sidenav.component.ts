import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.less']
})
export class SidenavComponent implements OnInit, OnChanges {

  userMenus: Array<any> = [];
  sidenavMenu: any;
  sidenavClosed : boolean = true;
  @Input('user') User!: Array<any>;
  @Input('menuArray') userMenuArray!: Array<any>;
  @ViewChild('userMenuNav') menuContainer!: MatSidenav;
  @ViewChild('matAcord') accordion!: MatAccordion;

  constructor(private router: Router) { }

  ngOnChanges() {
    console.log(this.userMenuArray);
    this.userMenus = this.userMenuArray;
  }

  ngOnInit(): void {

    console.log(this.userMenuArray);

    
  }

  openMenuSideNav(menu: any) {
      this.sidenavMenu = menu;
      this.sidenavMenu.user_submenu.map((element : any) => {
        element.open = false;
      });
      console.log('in sidenav:', this.sidenavMenu)
			this.menuContainer.open();
      this.sidenavClosed = false;
      console.log('opened');
	}

  closeMenuSideNav() {
    // this.accordion.closeAll();
    this.sidenavClosed = true;
    this.menuContainer.close();
    console.log('closed');
  }

  openPanel(i: number) {
		this.sidenavMenu.user_submenu.forEach((element: any, index: number) => {
			if (index == i)
				element.open = true;
			else
				element.open = false;
		});
	}

	closePanel(i: number) {
    console.log('in close panel', i)
		this.sidenavMenu.user_submenu.forEach((element: any, index: number) => {
			if (index == i)
				element.open = false;
		});
	}

  closeOpenedPanels() {
    if(!this.sidenavClosed){
      console.log('clicked outsode')
      this.sidenavMenu.user_submenu.forEach((element: any, index: number) => {
        console.log('element outside:', element.open)
        if (element.open == true)
          this.closePanel(index);
      });
    }
  }

  navigate(data: any) {
    this.closeMenuSideNav()
    let str: any = data.menu_name;
    str = str.replace(/\s+/g, '-').toLowerCase();
    console.log(str);
    this.router.navigate(['/dashboard/' + str]);
  }

}
