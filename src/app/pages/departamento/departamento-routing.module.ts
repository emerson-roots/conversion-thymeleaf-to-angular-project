import { DepartamentoListaComponent } from './departamento-lista/departamento-lista.component';
import { DepartamentoCadastroComponent } from './departamento-cadastro/departamento-cadastro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentoResolver } from 'src/app/guards/departamento-resolver';

const routes: Routes = [
  { path: 'cadastrar', component: DepartamentoCadastroComponent },
  { path: 'listar', component: DepartamentoListaComponent },
  {
    path: 'editar/:id', component: DepartamentoCadastroComponent,
    resolve: {
      departamentoDTO: DepartamentoResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class DepartamentoRoutingModule { }
