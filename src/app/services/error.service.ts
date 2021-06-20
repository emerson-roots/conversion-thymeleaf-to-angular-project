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
    this.alertService.error(message
      + " | Erro: " + this.errorFields.error
      + " | Status: " + this.errorFields.status
      + " | Mensagem: " + this.errorFields.message,
      this.optionsAlert);
  }

  errorPage(erro: any) {
    this.errorFields = erro;
    // skipLocationChange faz com que a URL não seja alterada ao redirecionar
    this.router.navigate(['error'], { skipLocationChange: true });
  }

}
