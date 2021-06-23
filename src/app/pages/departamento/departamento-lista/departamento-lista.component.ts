import { ErrorService } from './../../../services/error.service';
import { AlertService } from './../../../fragments/alert/alert.service';
import { DepartamentoDTO } from './../../../model/dto/departamento.dto';
import { DepartamentoService } from './../../../services/departamento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/utils/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-departamento-lista',
  templateUrl: './departamento-lista.component.html',
  styleUrls: ['./departamento-lista.component.css']
})
export class DepartamentoListaComponent implements OnInit {

  departamentosDTO!: DepartamentoDTO[];

  constructor(
    public dptoService: DepartamentoService,
    public errorService: ErrorService,
    public alertService: AlertService,
    public router: Router,
    private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.findAll();
  }

  openConfirmationDialog(id: any) {
    this.confirmationDialogService.confirm('Confirmação de exclusão', 'Deseja confirmar a exclusão do item selecionado?')
      .then((confirmed) => {

        if (confirmed) {
          this.delete(id)
        }

      }).catch((error) =>
        this.errorService.errorAlert(error, "Erro ao confirmar exclusão de Departamento.")
      );
  }

  findAll() {
    this.dptoService.findAll()
      .subscribe(response => {
        this.departamentosDTO = response
      },
        error => {
          /* responsabilidade de mostrar erros transferida para o interceptor de erros criado
           posteriormente pode ser implementado uma forma de mostrar o erro para o usuario */
          this.errorService.errorAlert(error, "Ocorreu um erro ao listar os departamentos.")
        });
  }

  delete(id: any) {
    this.dptoService.delete(id)
      .subscribe(() => {
        this.alertService.success("Departamento excluído com sucesso!")
        this.findAll();
      }, error => {
        this.errorService.errorAlert(error, "Ocorreu um erro ao excluir o departamento.")
      });
  }

  edit(id: any) {
    this.router.navigate(['departamentos/editar', id])
  }

}
