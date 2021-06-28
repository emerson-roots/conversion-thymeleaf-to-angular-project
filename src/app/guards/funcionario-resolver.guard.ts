import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { FuncionarioDTO } from "../model/dto/funcionario.dto";
import { FuncionarioService } from "../services/funcionario.service";

/**
 * implementado com base na video aula da Loiane Groner
 * https://www.youtube.com/watch?v=AEUSrpsAPtw
 *
 *
 * resolver é capaz de recuperar dados atraves de parametros na rota
 * (no caso, um ID) para passar para outros componentes
 * antes mesmo do componente de destino estar renderizado
 *
 * por renderizar antes da pagina carregar, melhora a performance da aplicacao
 *
 * no seu primeiro uso foi implementado para pre-carregar os dados
 * em um formulario para sua edicao/PUT
 */
@Injectable()
export class FuncionarioResolverGuard implements Resolve<FuncionarioDTO> {

  constructor(private funcionarioService: FuncionarioService) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    let id: number = route.params['id']
    return this.funcionarioService.loadById(id);
  }
}
