import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../model/dto/credenciais.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) {
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
}
