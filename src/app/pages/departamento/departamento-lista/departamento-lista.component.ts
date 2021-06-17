import { AlertService } from './../../../fragments/alert/alert.service';
import { DepartamentoDTO } from './../../../model/dto/departamento.dto';
import { DepartamentoService } from './../../../services/departamento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departamento-lista',
  templateUrl: './departamento-lista.component.html',
  styleUrls: ['./departamento-lista.component.css']
})
export class DepartamentoListaComponent implements OnInit {

  departamentosDTO!: DepartamentoDTO[];

  constructor(
    public dptoService: DepartamentoService,
    public alertService: AlertService,
    public router: Router) { }

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

  delete(id: any){
    this.dptoService.delete(id)
      .subscribe(()=>{
        this.alertService.success("Departamento excluído com sucesso!")
    },error =>{
      this.alertService.error("Ocorreu um erro ao excluir o departamento: " + JSON.stringify(error.message))
    });
  }

  edit(id: any){
    this.router.navigate(['departamentos/editar', id])
  }

}
