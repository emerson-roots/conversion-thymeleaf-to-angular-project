
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public isDesktop: boolean = true;

  @ViewChild('drawer', {static: true})
  public drawer!: MatDrawer;

  constructor(private sidebarService: SidebarService,
    private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.sidebarService.setDrawer(this.drawer);
    this.checkTypeDevice();
  }

  // caso seja mobile, inicia com sidebar recuado
  checkTypeDevice(): boolean {
    const isMobile = this.deviceService.isMobile();

    if(isMobile){
      this.isDesktop = false;
      return this.isDesktop;
    } else {
      this.isDesktop = true;
      return this.isDesktop;
    }
  }

}
