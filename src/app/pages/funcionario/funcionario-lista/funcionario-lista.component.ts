import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funcionario-lista',
  templateUrl: './funcionario-lista.component.html',
  styleUrls: ['./funcionario-lista.component.css']
})
export class FuncionarioListaComponent implements OnInit {

  constructor() { }

  // variaveis para trabalhar em conjunto do ng-boostrap-collapse do html
  public nomeCollapsed = true;
  public cargoCollapsed = true;
  public departamentoCollapsed = true;

  ngOnInit(): void {
  }

}
