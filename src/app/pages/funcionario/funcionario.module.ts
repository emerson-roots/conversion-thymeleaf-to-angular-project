import { SidebarService } from './../../services/sidebar.service';
import { CargoService } from './../../services/cargo.service';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgbAlertModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AlertModule } from "src/app/fragments/alert/alert.module";
import { FooterModule } from "src/app/fragments/footer/footer.module";
import { HeaderModule } from "src/app/fragments/header/header.module";
import { SidebarModule } from "src/app/fragments/sidebar/sidebar.module";
import { FuncionarioResolverGuard } from "src/app/guards/funcionario-resolver.guard";
import { FuncionarioService } from "src/app/services/funcionario.service";
import { ShowValidationErrorsModule } from "src/app/utils/show-validation-errors/show-validation-errors.module";
import { FuncionarioCadastroComponent } from "./funcionario-cadastro/funcionario-cadastro.component";
import { FuncionarioListaComponent } from "./funcionario-lista/funcionario-lista.component";
import { FuncionarioRoutingModule } from "./funcionario-routing.module";
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    FuncionarioCadastroComponent,
    FuncionarioListaComponent
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    HeaderModule,
    SidebarModule,
    FooterModule,
    AlertModule,
    ShowValidationErrorsModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgbModule,//ng popover
    FormsModule,
    NgxMaskModule.forRoot({
      // dropSpecialCharacters: ao salvar mantem a mascara...
      // IMPORTANTE: ao levar os dados para a tela, por exemplo num get dados
      // é importante implementar uma forma de levar os dados ja com a mascara
      dropSpecialCharacters: false
    }),

  ],
  exports: [
    FuncionarioCadastroComponent,
    FuncionarioListaComponent
  ],
  providers: [
    FuncionarioService,
    FuncionarioResolverGuard,
    CargoService,
    SidebarService
  ]
})
export class FuncionarioModule { }
