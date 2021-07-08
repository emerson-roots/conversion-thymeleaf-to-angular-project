import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredenciaisDTO } from 'src/app/model/dto/credenciais.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.creds);
    this.route.navigate(['home'])
  }
}
