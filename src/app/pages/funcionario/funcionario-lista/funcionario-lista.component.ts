import { AuthService } from './../../../services/auth.service';
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
    private cargoService: CargoService,
    private authService: AuthService) { }

  // variaveis para trabalhar em conjunto do ng-boostrap-collapse do html
  public nomeCollapsed = true;
  public cargoCollapsed = true;
  public departamentoCollapsed = true;

  // captura o valor do input ou select de pesquisa
  @Input() searchNome!: string;
  @Input() searchCargo!: number;
  @Input() searchDataEntrada: string = '';
  @Input() searchDataSaida: string = '';

  ngOnInit(): void {
    this.findAll();
    this.getCargos()
  }

  findAll() {
    this.authService.checkPermission()
      .subscribe(() => {
        this.funcionarioService.findAll()
          .subscribe(response => {
            this.funcionariosDTO = response
          },
            error => {
              /* responsabilidade de mostrar erros transferida para o interceptor de erros criado
               posteriormente pode ser implementado uma forma de mostrar o erro para o usuario */
              this.errorService.errorHandler(error, "Ocorreu um erro ao listar os Funcionários.")
            });
      }, error => {
        this.errorService.errorHandler(error, "Erro ao checar permissao para listar todos os Funcionarios.")
      });
  }

  findAllByName(nomeParam: string) {
    this.authService.checkPermission()
      .subscribe(() => {
        this.funcionarioService.findAllByName(nomeParam)
          .subscribe(response => {
            this.funcionariosDTO = response
          },
            error => {
              this.errorService.errorHandler(error, "Ocorreu um erro ao buscar os Funcionários por nome.")
            });
      }, error => {
        this.errorService.errorHandler(error, "Erro ao checar permissao para buscar Funcionarios por nome.")
      });
  }

  findAllByOffice(idParam: number) {

    this.authService.checkPermission()
      .subscribe(() => {
        this.funcionarioService.findAllByOffice(idParam)
          .subscribe(response => {
            this.funcionariosDTO = response
          },
            error => {
              this.errorService.errorHandler(error, "Ocorreu um erro ao buscar os Funcionários pelo Cargo.")
            });
      }, error => {
        this.errorService.errorHandler(error, "Erro ao checar permissao para buscar Funcionarios por cargo.")
      });
  }

  findAllByDate(dataEntrada: string, dataSaida: string) {

    this.authService.checkPermission()
      .subscribe(() => {
        this.funcionarioService.findAllByDate(dataEntrada, dataSaida)
          .subscribe(response => {
            this.funcionariosDTO = response
          },
            error => {
              this.errorService.errorHandler(error, "Ocorreu um erro ao buscar os Funcionários por datas.")
            });
      }, error => {
        this.errorService.errorHandler(error, "Erro ao checar permissao para buscar Funcionarios por data.")
      });
  }

  getCargos() {
    this.authService.checkPermission()
      .subscribe(() => {
        return this.cargoService.findAll().subscribe(res => {
          this.cargosDTO = res;
        })
      }, error => {
        this.errorService.errorHandler(error, "Erro ao checar permissao de listagem de cargos para Funcionários.")
      });
  }

  delete(id: number) {
    this.funcionarioService.delete(id)
      .subscribe(() => {
        this.alertService.success("Funcionario excluído com sucesso!")
        this.findAll();
      }, error => {
        this.errorService.errorHandler(error, "Ocorreu um erro ao excluir o Funcionário.")
      });
  }

  edit(id: number) {
    this.router.navigate(['funcionarios/editar', id])
  }

  openConfirmationDialog(id: number) {
    this.authService.checkPermission()
      .subscribe(() => {
        this.confirmationDialogService.confirm('Confirmação de exclusão', 'Deseja confirmar a exclusão do item selecionado?')
          .then((confirmed) => {

            if (confirmed) {
              this.delete(id)
            }

          }).catch((error) =>
            this.errorService.errorHandler(error, "Erro ao confirmar exclusão de Funcionário.")
          );
      }, error => {
        this.errorService.errorHandler(error, "Erro ao checar permissao de exclusão de Funcionário.")
      });
  }

}
