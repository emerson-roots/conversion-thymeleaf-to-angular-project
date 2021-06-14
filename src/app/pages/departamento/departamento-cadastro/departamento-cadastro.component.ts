import { ErrorService } from './../../../services/error.service';
import { ErrorFields } from './../../../config/error.fields';
import { Router } from '@angular/router';
import { DepartamentoService } from './../../../services/departamento.service';
import { DepartamentoDTO } from './../../../model/dto/departamento.dto';
import { Component, ErrorHandler, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-departamento-cadastro',
  templateUrl: './departamento-cadastro.component.html',
  styleUrls: ['./departamento-cadastro.component.css']
})
export class DepartamentoCadastroComponent implements OnInit {

  //injeta objeto para trabalhar com binding
  departamentoDTO: DepartamentoDTO = {
    id: "",
    nome: ""
  };

  constructor(
    public router: Router,
    public departamentoService: DepartamentoService,
    public errorService: ErrorService) { }

  ngOnInit(): void {
  }

  salvar() {
    this.departamentoService.insert(this.departamentoDTO)
      .subscribe(response => {
        //se obtiver sucesso ao salvar, imprime url com o id do registro criado
        console.log(response.headers.get('location'))
        this.router.navigate(['departamentos/cadastrar'])
      }, error => {

        this.errorService.goToPageError(error);

        this.router.navigate(['error']);

      });
  }

}
