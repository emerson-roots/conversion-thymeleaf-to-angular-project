import { DepartamentoDTO } from './../../../model/dto/departamento.dto';
import { DepartamentoService } from './../../../services/departamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departamento-lista',
  templateUrl: './departamento-lista.component.html',
  styleUrls: ['./departamento-lista.component.css']
})
export class DepartamentoListaComponent implements OnInit {

  departamentosDTO!: DepartamentoDTO[];

  constructor(
    public dptoService: DepartamentoService) { }

  ngOnInit(): void {
    this.dptoService.findAll()
      .subscribe(response => {
        this.departamentosDTO = response
      },
        error => {
          /* responsabilidade de mostrar erros transferida para o interceptor de erros criado
           posteriormente pode ser implementado uma forma de mostrar o erro para o usuario */
        });
  }

}
