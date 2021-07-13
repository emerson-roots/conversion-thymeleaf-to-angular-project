import { AuthService } from './../../../services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CargoService } from './../../../services/cargo.service';
import { FuncionarioDTO } from './../../../model/dto/funcionario.dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/fragments/alert/alert.service';
import { ErrorService } from 'src/app/services/error.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { CargoDTO } from 'src/app/model/dto/cargo.dto';

@Component({
  selector: 'app-funcionario-cadastro',
  templateUrl: './funcionario-cadastro.component.html',
  styleUrls: ['./funcionario-cadastro.component.css']
})
export class FuncionarioCadastroComponent implements OnInit {

  funcionarioDTO!: FuncionarioDTO;
  cargosDTO!: CargoDTO[];
  formGroup!: FormGroup;
  ufs!: string[];
  inscricao!: Subscription


  constructor(
    public funcionarioService: FuncionarioService,
    public cargoService: CargoService,
    public errorService: ErrorService,
    public formBuilder: FormBuilder,
    public alertService: AlertService,
    public activatedRouter: ActivatedRoute,
    private authService: AuthService) {

    // set pattern not blank on validation
    const nonWhitespaceRegExp: RegExp = new RegExp("\\S");

    this.formGroup = this.formBuilder.group({
      //cria os campos e ja insere um valor padrao ao input HTML (é possivel predefinir valores iniciais)
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern(nonWhitespaceRegExp)]],
      salario: [null, [Validators.required, Validators.min(1), Validators.pattern(nonWhitespaceRegExp)]],
      dataEntrada: [null, [Validators.required]],
      dataSaida: [null],
      cargo: ['', [Validators.required]],

      endereco: this.formBuilder.group({
        id: [null],
        logradouro: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern(nonWhitespaceRegExp)]],
        bairro: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern(nonWhitespaceRegExp)]],
        cidade: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern(nonWhitespaceRegExp)]],
        uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern(nonWhitespaceRegExp)]],
        cep: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(nonWhitespaceRegExp)]],
        numero: [null, [Validators.required, Validators.min(1), Validators.max(99999), Validators.pattern(nonWhitespaceRegExp)]],
        complemento: ['', [Validators.maxLength(255)]],

      })
    })

  }

  ngOnInit(): void {
    this.authService.checkPermission()
      .subscribe(() => {
        this.listaCargos();
        this.listaUFs();
        this.preEdit();
      }, error => {
        this.errorService.errorHandler(error, "Ocorreu um erro ao checar permissões de cadastro de Funcionario.")
      });
  }

  salvar() {

    if (!this.formGroup.invalid) {
      let funcDTO: FuncionarioDTO = this.formGroup.value;

      this.funcionarioService.save(funcDTO)
        .subscribe(response => {

          if (funcDTO.id == null) {
            //chama o serviço de alert... segundo parametro é opcional
            this.alertService.success(`Funcionario ${JSON.stringify(this.formGroup.controls.nome.value)} cadastrado com sucesso!`)
          } else {
            this.alertService.success(`Funcionario ${JSON.stringify(this.formGroup.controls.nome.value)} editado com sucesso!`)
          }

          //limpa formulario
          this.formGroup.reset()

        }, error => {
          this.errorService.errorHandler(error, "Ocorreu um erro ao tentar inserir/modificar Funcionario.")
        });
    } else {
      // logica de VALIDAÇÃO aqui
      this.marcaCampoComoModificado(this.formGroup);
    }
  }

  marcaCampoComoModificado(form: FormGroup) {

    Object.keys(form.controls)
      .forEach(campoIterado => {

        const controle = form.get(campoIterado);

        // verifica se campo está invalido
        // e marca como modificado/sujo/tocado
        controle?.markAsDirty();
        controle?.markAsTouched();

        if (controle instanceof FormGroup) {
          this.marcaCampoComoModificado(controle);
        }

      });

  }

  preEdit() {

    let qtdparamsRecebidos = this.activatedRouter.snapshot.paramMap.getAll('id').length;

    //somente carrega dados no forma para editar
    //se nao vier parametros ID
    if (qtdparamsRecebidos != 0) {
      /**
       * https://www.youtube.com/watch?v=AEUSrpsAPtw
       * trecho implementado com base no video Loiane Groner
       */
      this.inscricao = this.activatedRouter.data.subscribe(
        (funcionario) => {
          // o atributo "cargoResolver" esta ligado diretamente com o
          // parametro setado no "app-routing.module.ts"
          this.funcionarioDTO = funcionario.funcionarioResolver;
          this.updateForm(this.funcionarioDTO)
        }, error => {
          this.errorService.errorHandler(error, "Ocorreu um erro ao pré carregar os dados para edição de Funcionario.");
        });
    }
  }

  /** carrega dados no formulario para edicao */
  updateForm(funcionarioDto: FuncionarioDTO) {
    this.formGroup.patchValue({
      id: funcionarioDto.id,
      nome: funcionarioDto.nome,
      salario: funcionarioDto.salario,
      dataEntrada: funcionarioDto.dataEntrada,
      dataSaida: funcionarioDto.dataSaida,
      cargo: funcionarioDto.cargo,
      endereco: funcionarioDto.endereco
    });
  }
  // lista departamentos para popular combobox
  listaCargos() {
    return this.cargoService.findAll().subscribe(res => {
      this.cargosDTO = res;
    },
      error => {
        this.errorService.errorHandler(error, "Ocorreu um erro ao carregar os Cargos para cadastrar Funcionário.");
      })
  }

  listaUFs() {
    return this.funcionarioService.getUFs()
      .subscribe((res: any) => {
        this.ufs = res;
      },
        error => {
          this.errorService.errorHandler(error, "Ocorreu um erro ao carregar as UFs para cadastrar Funcionário.");
        })
  }

  /** implementado com base no video da Loiane
   * https://www.youtube.com/watch?v=eeElkzR2gd4
   *
   * para comparar os valores setados na combobox
   */
  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.id === obj2.id) : obj1 === obj2;
  }

}
