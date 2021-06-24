import { DepartamentoService } from './../../../services/departamento.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/fragments/alert/alert.service';
import { CargoDTO } from 'src/app/model/dto/cargo.dto';
import { CargoService } from 'src/app/services/cargo.service';
import { ErrorService } from 'src/app/services/error.service';
import { DepartamentoDTO } from 'src/app/model/dto/departamento.dto';

@Component({
  selector: 'app-cargo-cadastro',
  templateUrl: './cargo-cadastro.component.html',
  styleUrls: ['./cargo-cadastro.component.css']
})
export class CargoCadastroComponent implements OnInit {

  formGroup: FormGroup;
  cargoDTO!: CargoDTO;
  dptosDTO!: DepartamentoDTO[];

  constructor(
    public cargoService: CargoService,
    public dptoService: DepartamentoService,
    public errorService: ErrorService,
    public formBuilder: FormBuilder,
    public alertService: AlertService) {

    // set pattern not blank on validation
    const nonWhitespaceRegExp: RegExp = new RegExp("\\S");



    //instancia formulario
    this.formGroup = this.formBuilder.group({
      //cria os campos e ja insere um valor padrao ao input HTML (é possivel predefinir valores iniciais)
      id: [null],
      nome: [null, [Validators.required, Validators.maxLength(60), Validators.pattern(nonWhitespaceRegExp)]],
      departamento: {
        id: [null],
        nome: [this.listaDepartamentos(), [Validators.required]]
      }
    })
  }

  ngOnInit(): void {
  }

  salvar() {
    if (!this.formGroup.invalid) {
      let cargoDTO: CargoDTO = this.formGroup.value;

      this.cargoService.save(cargoDTO)
        .subscribe(response => {

          if (cargoDTO.id == null) {
            //chama o serviço de alert... segundo parametro é opcional
            this.alertService.success(`Cargo ${JSON.stringify(this.formGroup.controls.nome.value)} cadastrado com sucesso!`)
          } else {
            this.alertService.success(`Cargo ${JSON.stringify(this.formGroup.controls.nome.value)} editado com sucesso!`)
          }

          //limpa formulario
          this.formGroup.reset()

        }, error => {
          this.errorService.errorAlert(error, "Ocorreu um erro ao tentar inserir departamento.")
        });
    } else {
      // logica de update aqui
    }
  }

  // lista departamentos para popular combobox
  listaDepartamentos() {
    return this.dptoService.findAll().subscribe(res => {
      this.dptosDTO = res;
    })
  }

  /** implementado com base no video da Loiane
   * https://www.youtube.com/watch?v=eeElkzR2gd4
   *
   * para comparar os valores setados na combobox
   */
  compararDepartamentos(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.id === obj2.id) : obj1 === obj2;
  }

}
