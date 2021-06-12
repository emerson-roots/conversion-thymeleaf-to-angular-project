import { DepartamentoDTO } from './../../../model/dto/departamento.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departamento-cadastro',
  templateUrl: './departamento-cadastro.component.html',
  styleUrls: ['./departamento-cadastro.component.css']
})
export class DepartamentoCadastroComponent implements OnInit {

  //injeta objeto para trabalhar com binding
  departamentoDTO: DepartamentoDTO = {
    nome: "",
  };

  constructor() { }

  ngOnInit(): void {
  }

  salvar(){
    console.log(this.departamentoDTO);
  }

}
