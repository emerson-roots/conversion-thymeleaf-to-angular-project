import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  toggleActive:boolean = false;

  constructor(
    public sidebarService: SidebarService,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  toggleDrawer() {
    this.sidebarService.drawerToggle();
  }

  logout(){
    this.authService.logout();
  }

}
