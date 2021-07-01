import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/fragments/alert/alert.service';
import { CargoDTO } from 'src/app/model/dto/cargo.dto';
import { FuncionarioDTO } from 'src/app/model/dto/funcionario.dto';
import { CargoService } from 'src/app/services/cargo.service';
import { ErrorService } from 'src/app/services/error.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { ConfirmationDialogService } from 'src/app/utils/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-funcionario-lista',
  templateUrl: './funcionario-lista.component.html',
  styleUrls: ['./funcionario-lista.component.css']
})
export class FuncionarioListaComponent implements OnInit {

  funcionariosDTO!: FuncionarioDTO[];
  cargosDTO!: CargoDTO[];

  constructor(
    public funcionarioService: FuncionarioService,
    public errorService: ErrorService,
    public alertService: AlertService,
    private confirmationDialogService: ConfirmationDialogService,
    public router: Router,
    private cargoService: CargoService) { }

  // variaveis para trabalhar em conjunto do ng-boostrap-collapse do html
  public nomeCollapsed = true;
  public cargoCollapsed = true;
  public departamentoCollapsed = true;

  // captura o valor do input ou select de pesquisa
  @Input() searchNome!: string;
  @Input() searchCargo!: number;

  ngOnInit(): void {
    this.findAll();
    this.getCargos()
  }

  findAll() {
    this.funcionarioService.findAll()
      .subscribe(response => {
        this.funcionariosDTO = response
      },
        error => {
          /* responsabilidade de mostrar erros transferida para o interceptor de erros criado
           posteriormente pode ser implementado uma forma de mostrar o erro para o usuario */
          this.errorService.errorAlert(error, "Ocorreu um erro ao listar os Funcionários.")
        });
  }

  findAllByName(nomeParam: string) {
    this.funcionarioService.findAllByName(nomeParam)
      .subscribe(response => {
        this.funcionariosDTO = response
      },
        error => {
          this.errorService.errorAlert(error, "Ocorreu um erro ao buscar os Funcionários por nome.")
        });
  }

  findAllByOffice(idParam: number) {

    this.funcionarioService.findAllByOffice(idParam)
      .subscribe(response => {
        this.funcionariosDTO = response
      },
        error => {
          this.errorService.errorAlert(error, "Ocorreu um erro ao buscar os Funcionários pelo Cargo.")
        });
  }

  getCargos() {
    return this.cargoService.findAll().subscribe(res => {
      this.cargosDTO = res;
    })
  }

  delete(id: number) {
    this.funcionarioService.delete(id)
      .subscribe(() => {
        this.alertService.success("Funcionario excluído com sucesso!")
        this.findAll();
      }, error => {
        this.errorService.errorAlert(error, "Ocorreu um erro ao excluir o Funcionário.")
      });
  }

  edit(id: number) {
    this.router.navigate(['funcionarios/editar', id])
  }

  openConfirmationDialog(id: number) {
    this.confirmationDialogService.confirm('Confirmação de exclusão', 'Deseja confirmar a exclusão do item selecionado?')
      .then((confirmed) => {

        if (confirmed) {
          this.delete(id)
        }

      }).catch((error) =>
        this.errorService.errorAlert(error, "Erro ao confirmar exclusão de Funcionário.")
      );
  }

}
