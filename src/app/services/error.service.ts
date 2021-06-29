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

    let obj = Object(this.errorFields.errors);
    let msgFromatada: string = '';
    let qtdErros: number = 0 ;

    obj.forEach((value: any, key: number) => {
      qtdErros = qtdErros + 1;
      msgFromatada = msgFromatada + '<br>'+ (key + 1) + '° - ' + value['message']
    })
    this.alertService.error(message
      + " | Tipo: " + this.errorFields.error
      + " | Status: " + this.errorFields.status
      + " |<br><br> " + qtdErros + " erro(s) encontrado(s); " + msgFromatada,
      this.optionsAlert);
  }

  errorPage(erro: any) {
    this.errorFields = erro;
    // skipLocationChange faz com que a URL não seja alterada ao redirecionar
    this.router.navigate(['error'], { skipLocationChange: true });
  }

}
