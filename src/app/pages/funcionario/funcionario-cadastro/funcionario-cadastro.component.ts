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


  constructor(
    public funcionarioService: FuncionarioService,
    public cargoService: CargoService,
    public errorService: ErrorService,
    public formBuilder: FormBuilder,
    public alertService: AlertService) {

    // set pattern not blank on validation
    const nonWhitespaceRegExp: RegExp = new RegExp("\\S");

    this.formGroup = this.formBuilder.group({
      //cria os campos e ja insere um valor padrao ao input HTML (é possivel predefinir valores iniciais)
      id: [null],
      nome: ['Emerson', [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern(nonWhitespaceRegExp)]],
      salario: [150, [Validators.required, Validators.pattern(nonWhitespaceRegExp)]],
      dataEntrada: ["2021-06-27", [Validators.required]],
      dataSaida: [''],
      cargo: ['', [Validators.required]],

      endereco: this.formBuilder.group({
        id: [null],
        logradouro: ["rua bahia", [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern(nonWhitespaceRegExp)]],
        bairro: ["caiçara", [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern(nonWhitespaceRegExp)]],
        cidade: ["praia grande", [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern(nonWhitespaceRegExp)]],
        uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern(nonWhitespaceRegExp)]],
        cep: ["12345-678", [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(nonWhitespaceRegExp)]],
        numero: [244, [Validators.required, Validators.min(1), Validators.max(99999), Validators.pattern(nonWhitespaceRegExp)]],
        complemento: ["esquina açougue", [Validators.maxLength(255)]],

      })
    })

  }

  ngOnInit(): void {
    this.listaCargos();
    this.listaUFs();
  }

  salvar() {

    if (!this.formGroup.invalid) {
      let funcDTO: FuncionarioDTO = this.formGroup.value;

      console.log(funcDTO);

      this.funcionarioService.save(funcDTO)
        .subscribe(response => {


          //chama o serviço de alert... segundo parametro é opcional
          this.alertService.success(`Funcionario ${JSON.stringify(this.formGroup.controls.nome.value)} cadastrado com sucesso!`)
          //limpa formulario
          this.formGroup.reset()

        }, error => {
          this.errorService.errorAlert(error, "Ocorreu um erro ao tentar inserir Funcionario.")
        });
    } else {
      // logica de VALIDAÇÃO aqui
      console.log('form invalido')
    }
  }

    // lista departamentos para popular combobox
    listaCargos() {
      return this.cargoService.findAll().subscribe(res => {
        this.cargosDTO = res;
      },
      error => {})
    }

    listaUFs() {
      return this.funcionarioService.getUFs()
        .subscribe((res: any) => {
        this.ufs = res;
      },
      error => {})
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
