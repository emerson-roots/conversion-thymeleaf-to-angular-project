import { DepartamentoListaComponent } from './departamento-lista/departamento-lista.component';
import { ShowValidationErrorsModule } from '../../utils/show-validation-errors/show-validation-errors.module';
import { FooterModule } from '../../fragments/footer/footer.module';
import { HeaderModule } from '../../fragments/header/header.module';
import { AlertModule } from '../../fragments/alert/alert.module';
import { SidebarModule } from '../../fragments/sidebar/sidebar.module';

import { DepartamentoCadastroComponent } from './departamento-cadastro/departamento-cadastro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentoRoutingModule } from './departamento-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { DepartamentoResolver } from 'src/app/guards/departamento-resolver';
import { SidebarService } from 'src/app/services/sidebar.service';


@NgModule({
  declarations: [
    DepartamentoCadastroComponent,
    DepartamentoListaComponent
  ],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
    HeaderModule,
    SidebarModule,
    FooterModule,
    AlertModule,
    ShowValidationErrorsModule,
    ReactiveFormsModule
  ],
  exports: [
    DepartamentoCadastroComponent,
    DepartamentoListaComponent
  ],
  providers: [
    DepartamentoService,
    DepartamentoResolver,
    SidebarService
  ]
})
export class DepartamentosModule { }
