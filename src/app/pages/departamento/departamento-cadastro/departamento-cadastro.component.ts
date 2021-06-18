import { DepartamentoDTO } from './../../../model/dto/departamento.dto';
import { ErrorService } from './../../../services/error.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartamentoService } from './../../../services/departamento.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/fragments/alert/alert.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-departamento-cadastro',
  templateUrl: './departamento-cadastro.component.html',
  styleUrls: ['./departamento-cadastro.component.css']
})
export class DepartamentoCadastroComponent implements OnInit {

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  formGroup: FormGroup;

  constructor(
    public router: Router,
    public actvantedRouter: ActivatedRoute,
    public departamentoService: DepartamentoService,
    public errorService: ErrorService,
    public formBuilder: FormBuilder,
    public alertService: AlertService) {

    //instancia formulario
    this.formGroup = this.formBuilder.group({
      //cria os campos e ja insere um valor padrao ao input HTML (é possivel predefinir valores iniciais)
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]]
    })
  }

  ngOnInit(): void {

    /**pre carrega os dados selecionado para edicao na lista de departamentos */
    this.actvantedRouter.params
      .pipe(
        map((params: any) => params['id']),
        switchMap(id => this.departamentoService.loadById(id)) //switchMap - a partir de um observable chamar outro observable pode ser utilizado switchMap
        // switchMap(id => obterCargosRelacionados) exemplo para captar relacionamentos
      )
      .subscribe(departamentoDto => this.updateForm(departamentoDto));

  }

  /** carrega dados no formulario para edicao */
  updateForm(dptoDto: any) {
    this.formGroup.patchValue({
      id: dptoDto.id,
      nome: dptoDto.nome
    });
  }

  salvar() {

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

        this.errorService.goToPageError(error);

        this.router.navigate(['error']);

      });
  }
}
