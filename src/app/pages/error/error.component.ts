import { ErrorFields } from './../../config/error.fields';
import { ErrorService } from './../../services/error.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  erroFields!: ErrorFields;

  constructor(public erroService: ErrorService) { }

  ngOnInit(): void {

    this.erroFields = this.erroService.erro;

  }

}
