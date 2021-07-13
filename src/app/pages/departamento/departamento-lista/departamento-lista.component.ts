import { AuthService } from './../../../services/auth.service';
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
    private confirmationDialogService: ConfirmationDialogService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.findAll();
  }

  openConfirmationDialog(id: any) {
    this.authService.checkPermission()
      .subscribe(() => {
        this.confirmationDialogService.confirm('Confirmação de exclusão', 'Deseja confirmar a exclusão do item selecionado?')
          .then((confirmed) => {

            if (confirmed) {
              this.delete(id)
            }

          }).catch((error) =>
            this.errorService.errorHandler(error, "Erro ao confirmar exclusão de Departamento.")
          );
      }, error => {
        this.errorService.errorHandler(error, "Departamento/Lista - Erro ao checar permissão para deletar.")
      })

  }

  findAll() {
    this.dptoService.findAll()
      .subscribe(response => {
        this.departamentosDTO = response
      },
        error => {
          this.errorService.errorHandler(error, "Ocorreu um erro ao listar os departamentos.")
        });
  }

  delete(id: any) {
    this.dptoService.delete(id)
      .subscribe(() => {
        this.alertService.success("Departamento excluído com sucesso!")
        this.findAll();
      }, error => {
        this.errorService.errorHandler(error, "Ocorreu um erro ao excluir o departamento.")
      });
  }

  edit(id: any) {
    this.router.navigate(['departamentos/editar', id])
  }

}
