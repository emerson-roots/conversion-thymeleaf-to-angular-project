import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgbPaginationModule, NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { AlertModule } from "src/app/fragments/alert/alert.module";
import { FooterModule } from "src/app/fragments/footer/footer.module";
import { HeaderModule } from "src/app/fragments/header/header.module";
import { SidebarModule } from "src/app/fragments/sidebar/sidebar.module";
import { CargoResolverGuard } from "src/app/guards/cargo-resolver.guard";
import { CargoService } from "src/app/services/cargo.service";
import { DepartamentoService } from "src/app/services/departamento.service";
import { SidebarService } from "src/app/services/sidebar.service";
import { ShowValidationErrorsModule } from "src/app/utils/show-validation-errors/show-validation-errors.module";
import { CargoCadastroComponent } from "./cargo-cadastro/cargo-cadastro.component";
import { CargoListaComponent } from "./cargo-lista/cargo-lista.component";
import { CargoRoutingModule } from "./cargo-routing.module";


@NgModule({
  declarations: [
    CargoCadastroComponent,
    CargoListaComponent
  ],
  imports: [
    CommonModule,
    CargoRoutingModule,
    HeaderModule,
    SidebarModule,
    FooterModule,
    AlertModule,
    ShowValidationErrorsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule
  ],
  exports: [
    CargoCadastroComponent,
    CargoListaComponent
  ],
  providers: [
    CargoService,
    CargoResolverGuard,
    DepartamentoService,
    SidebarService
  ]
})
export class CargosModule { }
