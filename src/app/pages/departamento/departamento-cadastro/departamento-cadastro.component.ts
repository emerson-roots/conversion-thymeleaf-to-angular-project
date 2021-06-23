import { DepartamentoDTO } from './../../../model/dto/departamento.dto';
import { ErrorService } from './../../../services/error.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartamentoService } from './../../../services/departamento.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/fragments/alert/alert.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-departamento-cadastro',
  templateUrl: './departamento-cadastro.component.html',
  styleUrls: ['./departamento-cadastro.component.css']
})
export class DepartamentoCadastroComponent implements OnInit {

  formGroup: FormGroup;
  inscricao!: Subscription
  dptoDTO!: DepartamentoDTO;

  constructor(
    public router: Router,
    public actvantedRouter: ActivatedRoute,
    public departamentoService: DepartamentoService,
    public errorService: ErrorService,
    public formBuilder: FormBuilder,
    public alertService: AlertService) {

    // set pattern not blank on validation
    const nonWhitespaceRegExp: RegExp = new RegExp("\\S");

    //instancia formulario
    this.formGroup = this.formBuilder.group({
      //cria os campos e ja insere um valor padrao ao input HTML (é possivel predefinir valores iniciais)
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern(nonWhitespaceRegExp)]]
    })
  }

  ngOnInit(): void {

    this.preEdit();

  }

  preEdit() {

    let qtdparamsRecebidos = this.actvantedRouter.snapshot.paramMap.getAll('id').length;

    //somente carrega dados no forma para editar
    //se nao vier parametros ID
    if (qtdparamsRecebidos != 0) {
      /**
       * https://www.youtube.com/watch?v=AEUSrpsAPtw
       * trexo implementado com base no video Loiane Groner
       */
      this.inscricao = this.actvantedRouter.data.subscribe(
        (dpto) => {
          this.dptoDTO = dpto.departamentoDTO;
          this.updateForm(this.dptoDTO)
        }
      );
    }
  }

  /** carrega dados no formulario para edicao */
  updateForm(dptoDto: any) {
    this.formGroup.patchValue({
      id: dptoDto.id,
      nome: dptoDto.nome
    });
  }

  salvar() {
    if (!this.formGroup.invalid) {
      let dptoDTO: DepartamentoDTO = this.formGroup.value;

      this.departamentoService.save(this.formGroup.value)
        .subscribe(response => {

          if (dptoDTO.id == null) {
            //chama o serviço de alert... segundo parametro é opcional
            this.alertService.success(`Departamento ${JSON.stringify(this.formGroup.controls.nome.value)} cadastrado com sucesso!`)
          } else {
            this.alertService.success(`Departamento ${JSON.stringify(this.formGroup.controls.nome.value)} editado com sucesso!`)
          }

          //limpa formulario
          this.formGroup.reset()

        }, error => {
          this.errorService.errorAlert(error, "Ocorreu um erro ao tentar inserir departamento.")
        });
    } else {
      this.marcaCampoComoModificado(this.formGroup);
    }
  }


  // itera os campos do formulario marcando cada um
  // como "dirty", ou seja, modificado/sujo/alterado/tocado
  marcaCampoComoModificado(form: FormGroup) {

    Object.keys(form.controls)
      .forEach(campoIterado => {

        const controle = form.get(campoIterado);

        // verifica se campo está invalido
        // e marca como modificado/sujo/tocado
        controle?.markAsDirty();
        controle?.markAsTouched();
      });

  }
}
