import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FooterModule } from "src/app/fragments/footer/footer.module";
import { HeaderModule } from "src/app/fragments/header/header.module";
import { SidebarModule } from "src/app/fragments/sidebar/sidebar.module";
import { SidebarService } from "src/app/services/sidebar.service";
import { HomeComponent } from "./home.component";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeaderModule,
    SidebarModule,
    FooterModule

  ],
  exports: [
    HomeComponent
  ],
  providers: [
    SidebarService
  ],
})
export class HomeModule { }
