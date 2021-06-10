
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  @ViewChild('drawer', {static: true}) public drawer!: MatDrawer;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.sidebarService.setDrawer(this.drawer);
  }

}
