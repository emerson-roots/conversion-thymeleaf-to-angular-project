import { NgModule } from '@angular/core';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
