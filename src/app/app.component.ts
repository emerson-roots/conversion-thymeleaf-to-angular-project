import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // verifica authenticacao sempre que houver alteracao no app-root
    this.authService.expirationOfAuthentication();
  }

  title = 'conversion-thymeleaf-to-angular-project';
}
