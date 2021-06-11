import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentoCadastroComponent } from './pages/departamento/departamento-cadastro/departamento-cadastro.component';
import { DepartamentoListaComponent } from './pages/departamento/departamento-lista/departamento-lista.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'departamentos/cadastrar', component: DepartamentoCadastroComponent},
  {path: 'departamentos/listar', component: DepartamentoListaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
