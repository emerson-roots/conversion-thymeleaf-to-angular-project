import { ErrorFields } from './../../config/error.fields';
import { ErrorService } from './../../services/error.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  erroFields: ErrorFields = {
    error: '',
    message: '',
    status: 0,
    timestamp: 0,
  };

  constructor(public erroService: ErrorService) { }

  ngOnInit(): void {
    this.erroFields = this.erroService.errorFields;
  }

}
