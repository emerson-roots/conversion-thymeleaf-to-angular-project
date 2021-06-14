import { ErrorService } from './../../../services/error.service';
import { Router } from '@angular/router';
import { DepartamentoService } from './../../../services/departamento.service';
import { DepartamentoDTO } from 'src/app/model/dto/departamento.dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-departamento-cadastro',
  templateUrl: './departamento-cadastro.component.html',
  styleUrls: ['./departamento-cadastro.component.css']
})
export class DepartamentoCadastroComponent implements OnInit {

  formGroup: FormGroup;
    //injeta objeto para trabalhar com binding
    departamentoDTO: DepartamentoDTO = {
      id: "",
      nome: ""
    };

  constructor(
    public router: Router,
    public departamentoService: DepartamentoService,
    public errorService: ErrorService,
    public formBuilder: FormBuilder) {

    //instancia formulario
    this.formGroup = this.formBuilder.group({
      //cria os campos e ja insere um valor padrao ao input HTML (é possivel predefinir valores iniciais)
      nome: ['teste input preenchido pelo formgroup']
    })
  }

  ngOnInit(): void {
  }

  salvar() {
    this.departamentoService.insert(this.departamentoDTO)
      .subscribe(response => {
        //se obtiver sucesso ao salvar, imprime url com o id do registro criado
        console.log(response.headers.get('location'))
        this.router.navigate(['departamentos/cadastrar'])
      }, error => {

        this.errorService.goToPageError(error);

        this.router.navigate(['error']);

      });
  }

}
