import { ErrorService } from './../services/error.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // foi necessario instalar rxjs-compat para corrigir erro

/* esta classe tem a função de captar os erros da API backend e
 propagar para o frontend
=================================*/
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //caso ocorra tudo bem, continua com a requisição
    return next.handle(req)

      //caso ocorra algum erro, intercepta o erro e propaga
      .catch((error, caught) => {

        //testa se a requisição possui o campo erro
        let errorObj = error;
        if (errorObj.error) {
          errorObj = errorObj.error;
        }

        //converte o objeto de erro para JSON
        if (!errorObj.status) {
          errorObj = JSON.parse(errorObj);
        }

        switch (errorObj.status) {
          case 404:
            this.handleError404(errorObj)
            break
        }

        return Observable.throw(errorObj);
      }) as any;
  }

  handleError404(error: any) {
    this.errorService.errorPage(error)
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
