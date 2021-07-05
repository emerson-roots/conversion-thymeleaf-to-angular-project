import { CargoDTO } from './../../../model/dto/cargo.dto';
import { ErrorService } from './../../../services/error.service';
import { CargoService } from './../../../services/cargo.service';
import { Component, Input, OnInit } from '@angular/core';
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

  // configs de paginacao
  pageNumber: number = 0; //back-end trabalha com index 0
  @Input() linesPerPage: number = 5;
  totalPages: number = 0;
  orderBy: string = 'nome';
  directionOrdenation: string = 'ASC'

  constructor(
    public cargoService: CargoService,
    public errorService: ErrorService,
    public alertService: AlertService,
    public router: Router,
    private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.findAllPageable(this.pageNumber, this.linesPerPage, this.orderBy, this.directionOrdenation);
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

  findAllPageable(page: number,
    linesPerPage: number,
    orderBy: string,
    directionOrdenation: string) {

    this.pageNumber = page;
    this.directionOrdenation = directionOrdenation;

    this.cargoService.findAllPageable(page, linesPerPage, orderBy, directionOrdenation)

      .subscribe((response: CargoDTO[]) => {

        // a resposta é um objeto do tipo Page
        // armazena como genérico para fazer conversão
        let tes: any = response;

        // captura as chaves necessárias do objeto de resposta e converte
        this.totalPages = tes['totalPages']
        this.cargosDTO = tes['content'] as CargoDTO[];
      },
        error => {
          this.errorService.errorAlert(error, "Ocorreu um erro ao listar os Cargos por página.")
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

  edit(id: number) {
    this.router.navigate(['cargos/editar', id])
  }

}
