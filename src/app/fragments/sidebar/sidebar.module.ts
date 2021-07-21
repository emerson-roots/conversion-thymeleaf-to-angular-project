
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from './sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule
  ],
  exports: [SidebarComponent],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class SidebarModule { }
