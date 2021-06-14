import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartamentoCadastroComponent } from './pages/departamento/departamento-cadastro/departamento-cadastro.component';
import { DepartamentoListaComponent } from './pages/departamento/departamento-lista/departamento-lista.component';
import { CargoCadastroComponent } from './pages/cargo/cargo-cadastro/cargo-cadastro.component';
import { CargoListaComponent } from './pages/cargo/cargo-lista/cargo-lista.component';
import { FuncionarioCadastroComponent } from './pages/funcionario/funcionario-cadastro/funcionario-cadastro.component';
import { FuncionarioListaComponent } from './pages/funcionario/funcionario-lista/funcionario-lista.component';
import { FooterComponent } from './fragments/footer/footer.component';
import { HeaderComponent } from './fragments/header/header.component';
import { SidebarComponent } from './fragments/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarService } from './services/sidebar.service';
import { NgxMaskModule } from 'ngx-mask';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DepartamentoService } from './services/departamento.service';
import { ErrorInterceptorProvider } from './interceptors/error-interceptor';
import { ErrorComponent } from './pages/error/error.component';
import { ErrorService } from './services/error.service';

@NgModule({
  declarations: [
    AppComponent,
    DepartamentoCadastroComponent,
    DepartamentoListaComponent,
    CargoCadastroComponent,
    CargoListaComponent,
    FuncionarioCadastroComponent,
    FuncionarioListaComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    AppRoutingModule,
    NgxMaskModule.forRoot({
      // dropSpecialCharacters: ao salvar mantem a mascara...
      // IMPORTANTE: ao levar os dados para a tela, por exemplo num get dados
      // é importante implementar uma forma de levar os dados ja com a mascara
      dropSpecialCharacters: false
    }),
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    FormsModule, //necessario para obter os dados de formularios
    HttpClientModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    SidebarService,
    DepartamentoService,
    ErrorInterceptorProvider,
    ErrorService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
