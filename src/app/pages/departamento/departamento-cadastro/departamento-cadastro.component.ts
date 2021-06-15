import { ErrorService } from './../../../services/error.service';
import { Router } from '@angular/router';
import { DepartamentoService } from './../../../services/departamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Rx';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-departamento-cadastro',
  templateUrl: './departamento-cadastro.component.html',
  styleUrls: ['./departamento-cadastro.component.css']
})
export class DepartamentoCadastroComponent implements OnInit {

  formGroup: FormGroup;

  //alert ng-bootstrap
  private _success = new Subject<string>();
  successMessage = '';
  tipoMensagem: string = "";
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;


  constructor(
    public router: Router,
    public departamentoService: DepartamentoService,
    public errorService: ErrorService,
    public formBuilder: FormBuilder) {

    //instancia formulario
    this.formGroup = this.formBuilder.group({
      //cria os campos e ja insere um valor padrao ao input HTML (é possivel predefinir valores iniciais)
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]]
    })
  }

  ngOnInit(): void {
    //carrega alert
    this._success
      .subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000))
      .subscribe(() => {
        if (this.selfClosingAlert) {
          //adiciona um fade rapido
          this.selfClosingAlert.animation = true;
          //fecha alert apos o tempo programado
          this.selfClosingAlert.close();

        }
      });
  }

  salvar() {
    this.departamentoService.insert(this.formGroup.value)
      .subscribe(response => {

        //chama um alert do ng-bootstrap
        this.changeSuccessMessage("Departamento cadastrado com sucesso!", "success");

        //limpa formulario
        this.formGroup.reset()

      }, error => {

        this.errorService.goToPageError(error);

        this.router.navigate(['error']);

      });
  }

  changeSuccessMessage(mensagem: string, type: string) {
    //seta o tipo da mensagem 'success', 'info', 'warning', 'danger', 'primary', 'secondary', 'light'e 'dark
    this.tipoMensagem = type;
    //escreve a mensagem
    this._success.next(mensagem);
  }
}
