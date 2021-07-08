import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../model/dto/credenciais.dto";
import { LocalUser } from "../model/dto/local_user";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient,
    private storage: StorageService) {
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
      token: tok
    };

    //armazena no local storage o usuário com token valido
    this.storage.setLocalUser(user);

  }

  //basicamente remove o usuario do localStorage
  logout() {
    this.storage.setLocalUser(null as any);
  }
}
