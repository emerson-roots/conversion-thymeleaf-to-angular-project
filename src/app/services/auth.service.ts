import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../model/dto/credenciais.dto";
import { LocalUser } from "../model/dto/local_user";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  localUser: LocalUser = {
    token: '',
    email: ''
  }

  constructor(public http: HttpClient,
    private storage: StorageService,
    private router: Router) {
  }

  authenticate(creds: CredenciaisDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`,
      creds,
      {
        //aguarda a resposta da requisição para capturar o header
        observe: 'response',
        /*como o endpoint de login retorna uma resposta de corpo vazio
        nós declaramos que a resposta sera um texto, para que o framework
        não tente fazer um parse no JSON, gerando erro de parse*/
        responseType: 'text'
      });
  }

  sucessfullLogin(authorizationValueBearerToken: string) {

    //recorta a string do token eliminando o sufixo bearer+space
    let tok = authorizationValueBearerToken.substring(7);

    //seta um usuario com token valido
    let user: LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub
    };

    //armazena no local storage o usuário com token valido
    this.storage.setLocalUser(user);

  }

  //basicamente remove o usuario do localStorage
  logout() {
    this.storage.setLocalUser(null as any);
  }

  expirationOfAuthentication(){
    this.localUser = this.storage.getLocalUser();

    if (this.localUser != null) {
      if (this.jwtHelper.isTokenExpired(this.localUser.token)) {
        // token expired
        alert("Seu login expirou. Você será redirecionado para página de login!")
        this.router.navigate(['']);
      } else {
        // token valid
        let tokenExpiration: number = this.jwtHelper.getTokenExpirationDate(this.localUser.token).getTime();
        let timerInMilliseconds: number = 5 * 1000;

        if (tokenExpiration - (new Date).getTime() < timerInMilliseconds) {
          // um possível refresh token pode ser implementado aqui
          console.log("O token expirará em menos de " + (timerInMilliseconds / 1000) + " segundos.  " + this.localUser.email)
        }

      }
    } else {
      this.router.navigate(['']);
    }
  }
}
