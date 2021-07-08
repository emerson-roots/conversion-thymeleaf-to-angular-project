import { AuthService } from './../../services/auth.service';
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

  constructor(
    private route: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.authenticate(this.creds)
      .subscribe(response => {
        this.authService.sucessfullLogin(response.headers.get('Authorization') || '');
        this.route.navigate(['home']);
      },
        error => { });
  }
}
