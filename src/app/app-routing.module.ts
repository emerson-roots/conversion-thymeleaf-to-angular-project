import { LoginComponent } from './pages/login/login.component';
import { CargoResolverGuard } from './guards/cargo-resolver.guard';
import { ErrorComponent } from './pages/error/error.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargoCadastroComponent } from './pages/cargo/cargo-cadastro/cargo-cadastro.component';
import { CargoListaComponent } from './pages/cargo/cargo-lista/cargo-lista.component';
import { DepartamentoCadastroComponent } from './pages/departamento/departamento-cadastro/departamento-cadastro.component';
import { DepartamentoListaComponent } from './pages/departamento/departamento-lista/departamento-lista.component';
import { FuncionarioCadastroComponent } from './pages/funcionario/funcionario-cadastro/funcionario-cadastro.component';
import { FuncionarioListaComponent } from './pages/funcionario/funcionario-lista/funcionario-lista.component';
import { HomeComponent } from './pages/home/home.component';
import { DepartamentoResolver } from './guards/departamento-resolver'
import { FuncionarioResolverGuard } from './guards/funcionario-resolver.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'departamentos/cadastrar', component: DepartamentoCadastroComponent },
  { path: 'departamentos/listar', component: DepartamentoListaComponent },
  {
    path: 'departamentos/editar/:id', component: DepartamentoCadastroComponent,
    resolve: {
      departamentoDTO: DepartamentoResolver
    }
  },
  { path: 'cargos/cadastrar', component: CargoCadastroComponent },
  { path: 'cargos/listar', component: CargoListaComponent },
  {
    path: 'cargos/editar/:id', component: CargoCadastroComponent,
    resolve: {
      // o atributo "cargoResolver" esta ligado diretamente
      // com o atributo setado no metodo "preEdit" do cargo-cadastro.component
      cargoResolver: CargoResolverGuard
    }
  },
  { path: 'funcionarios/cadastrar', component: FuncionarioCadastroComponent },
  { path: 'funcionarios/listar', component: FuncionarioListaComponent },
  {
    path: 'funcionarios/editar/:id', component: FuncionarioCadastroComponent,
    resolve: {
      funcionarioResolver: FuncionarioResolverGuard
    }
  },
  { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
