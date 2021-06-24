import { CargoDTO } from './../../../model/dto/cargo.dto';
import { ErrorService } from './../../../services/error.service';
import { CargoService } from './../../../services/cargo.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/fragments/alert/alert.service';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/utils/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-cargo-lista',
  templateUrl: './cargo-lista.component.html',
  styleUrls: ['./cargo-lista.component.css']
})
export class CargoListaComponent implements OnInit {

  cargosDTO!: CargoDTO[];

  constructor(
    public cargoService: CargoService,
    public errorService: ErrorService,
    public alertService: AlertService,
    public router: Router,
    private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.cargoService.findAll()
      .subscribe(response => {
        this.cargosDTO = response
      },
        error => {
          /* responsabilidade de mostrar erros transferida para o interceptor de erros criado
           posteriormente pode ser implementado uma forma de mostrar o erro para o usuario */
          this.errorService.errorAlert(error, "Ocorreu um erro ao listar os Cargos.")
        });
  }

  delete(id: any) {
    this.cargoService.delete(id)
      .subscribe(() => {
        this.alertService.success("Cargo excluído com sucesso!")
        this.findAll();
      }, error => {
        this.errorService.errorAlert(error, "Ocorreu um erro ao excluir o Cargo.")
      });
  }

  openConfirmationDialog(id: any) {
    this.confirmationDialogService.confirm('Confirmação de exclusão', 'Deseja confirmar a exclusão do item selecionado?')
      .then((confirmed) => {

        if (confirmed) {
          this.delete(id)
        }

      }).catch((error) =>
        this.errorService.errorAlert(error, "Erro ao confirmar exclusão de Cargo.")
      );
  }

}
