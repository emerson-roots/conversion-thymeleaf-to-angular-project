import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'departamentos', loadChildren: () => import('./pages/departamento/departamentos.module').then(m => m.DepartamentosModule) },
  { path: 'cargos', loadChildren: () => import('./pages/cargo/cargo.module').then(m => m.CargosModule) },
  { path: 'funcionarios', loadChildren: () => import('./pages/funcionario/funcionario.module').then(m => m.FuncionarioModule) },
  // {
  //   path: 'departamentos/editar/:id', component: DepartamentoCadastroComponent,
  //   resolve: {
  //     departamentoDTO: DepartamentoResolver
  //   }
  // },
  // { path: 'cargos/cadastrar', component: CargoCadastroComponent },
  // { path: 'cargos/listar', component: CargoListaComponent },
  // {
  //   path: 'cargos/editar/:id', component: CargoCadastroComponent,
  //   resolve: {
  //     // o atributo "cargoResolver" esta ligado diretamente
  //     // com o atributo setado no metodo "preEdit" do cargo-cadastro.component
  //     cargoResolver: CargoResolverGuard
  //   }
  // },
  // { path: 'funcionarios/cadastrar', component: FuncionarioCadastroComponent },
  // { path: 'funcionarios/listar', component: FuncionarioListaComponent },
  // {
  //   path: 'funcionarios/editar/:id', component: FuncionarioCadastroComponent,
  //   resolve: {
  //     funcionarioResolver: FuncionarioResolverGuard
  //   }
  // },
  { path: 'error', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
