import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ErrorInterceptorProvider } from './interceptors/error-interceptor';
import { ErrorComponent } from './pages/error/error.component';
import { ErrorService } from './services/error.service';
import { LoginComponent } from './pages/login/login.component';
import { StorageService } from './services/storage.service';
import { AuthInterceptorProvider } from './interceptors/auth-interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule, //necessario para obter os dados de formularios
    HttpClientModule,
    NgbModule // ng-popover
  ],
  providers: [
    AuthInterceptorProvider, // importante: a ordem dos interceptor aqui interfere na aplicacao... AuthInterceptor deve ser chamado antes de tratamento de erros
    ErrorInterceptorProvider,
    ErrorService,
    AuthService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
