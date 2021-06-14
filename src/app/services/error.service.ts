import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorFields } from './../config/error.fields';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ErrorService {

  erro!: ErrorFields;

  constructor() {}

  goToPageError(error?: any): ErrorFields{
    this.erro = new ErrorFields(error.timestamp, error.error, error.message, error.status)
    return this.erro;
  }
}
