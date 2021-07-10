import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "../services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let localUser = this.storage.getLocalUser();

    //pega o tamanho da string da base URL
    let N = API_CONFIG.baseUrl.length;

    //testa se o inicio da URL é igual a base da URL da API
    let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;

    /*somente acrescenta cabeçalho se houver um usuario autenticado
    e caso a requisição seja diretamente para a API
    caso seja implementado outras APIs como por exemplo um bucket no S3
    não não adiciona token */
    if (localUser && requestToAPI) {

      /* para entendimento, ler a fonte sugerida:
      https://angular.io/guide/http
      .
      .
      adiciona cabeçalho Authorizarion junto do token */
      const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + localUser.token) });
      return next.handle(authReq);

    } else {
      return next.handle(req)
    }
  }

}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
