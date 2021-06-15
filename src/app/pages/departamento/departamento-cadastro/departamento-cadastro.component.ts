import { ErrorService } from './../../../services/error.service';
import { Router } from '@angular/router';
import { DepartamentoService } from './../../../services/departamento.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/fragments/alert/alert.service';

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
    public departamentoService: DepartamentoService,
    public errorService: ErrorService,
    public formBuilder: FormBuilder,
    public alertService: AlertService) {

    //instancia formulario
    this.formGroup = this.formBuilder.group({
      //cria os campos e ja insere um valor padrao ao input HTML (é possivel predefinir valores iniciais)
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]]
    })
  }

  ngOnInit(): void {

  }

  salvar() {
    this.departamentoService.insert(this.formGroup.value)
      .subscribe(response => {

        //chama o serviço de alert... segundo parametro é opcional
        this.alertService.success(`Departamento ${JSON.stringify(this.formGroup.controls.nome.value)} cadastrado com sucesso!`)
        //limpa formulario
        this.formGroup.reset()

      }, error => {

        this.errorService.goToPageError(error);

        this.router.navigate(['error']);

      });
  }
}
