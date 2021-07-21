import { CargoListaComponent } from './cargo-lista/cargo-lista.component';
import { CargoCadastroComponent } from './cargo-cadastro/cargo-cadastro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargoResolverGuard } from 'src/app/guards/cargo-resolver.guard';

const routes: Routes = [
  { path: 'cadastrar', component: CargoCadastroComponent },
  { path: 'listar', component: CargoListaComponent },
  {
    path: 'editar/:id', component: CargoCadastroComponent,
    resolve: {
      cargoResolver: CargoResolverGuard
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class CargoRoutingModule { }
