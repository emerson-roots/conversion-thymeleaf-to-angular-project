import { AlertService } from './../fragments/alert/alert.service';
import { ErrorFields } from './../config/error.fields';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable()
export class ErrorService {

  errorFields!: ErrorFields;

  optionsAlert = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  constructor(private alertService: AlertService,
    private router: Router) { }

  errorAlert(erro: any, message: string) {
    this.errorFields = erro;

    let objErrors = Object(erro.errors);
    let msgFromatada: string = '';
    let qtdErros: number = 0;

    // verifica se o backend trouxe erros de validação
    // objErrors pode vir undefined, se for, nao itera o array de errors
    if (erro.errors != null) {

      objErrors.forEach((value: any, key: number) => {
        qtdErros = qtdErros + 1;
        msgFromatada = msgFromatada + '<br>' + (key + 1) + '° - ' + value['message']
      })

      this.alertService.error(message
        + " | Tipo: " + this.errorFields.error
        + " | Status: " + this.errorFields.status
        + " |<br><br> " + qtdErros + " erro(s) encontrado(s); " + msgFromatada,
        this.optionsAlert);

    } else {

      // monta alert simples
      this.alertService.error(message
        + " | Erro: " + this.errorFields.error
        + " | Status: " + this.errorFields.status
        + " | Mensagem: " + this.errorFields.message,
        this.optionsAlert);
    }

  }

  errorPage(erro: any) {
    this.errorFields = erro;
    // skipLocationChange faz com que a URL não seja alterada ao redirecionar
    this.router.navigate(['error'], { skipLocationChange: true });
  }

}
