import { FuncionarioListaComponent } from './funcionario-lista/funcionario-lista.component';
import { FuncionarioCadastroComponent } from './funcionario-cadastro/funcionario-cadastro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioResolverGuard } from 'src/app/guards/funcionario-resolver.guard';

const routes: Routes = [
  { path: 'cadastrar', component: FuncionarioCadastroComponent },
  { path: 'listar', component: FuncionarioListaComponent },
  {
    path: 'editar/:id', component: FuncionarioCadastroComponent,
    resolve: {
      funcionarioResolver: FuncionarioResolverGuard
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class FuncionarioRoutingModule { }
