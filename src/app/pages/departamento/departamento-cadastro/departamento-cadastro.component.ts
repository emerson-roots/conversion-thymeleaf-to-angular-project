import { Router } from '@angular/router';
import { DepartamentoService } from './../../../services/departamento.service';
import { DepartamentoDTO } from './../../../model/dto/departamento.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departamento-cadastro',
  templateUrl: './departamento-cadastro.component.html',
  styleUrls: ['./departamento-cadastro.component.css']
})
export class DepartamentoCadastroComponent implements OnInit {

  //injeta objeto para trabalhar com binding
  departamentoDTO: DepartamentoDTO = {
    nome: "",
  };

  constructor(
    public router: Router,
    public departamentoService: DepartamentoService) { }

  ngOnInit(): void {
  }

  salvar() {
    this.departamentoService.insert(this.departamentoDTO)
      .subscribe(response => {
        //se obtiver sucesso ao salvar, imprime url com o id do registro criado
        console.log(response.headers.get('location'))
        this.router.navigate(['departamentos/cadastrar'])
      }, error => {
        console.log('Erro ao salvar departamento: ' + error)
      });
  }

}
