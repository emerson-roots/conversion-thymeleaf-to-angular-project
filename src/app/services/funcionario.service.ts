import { Funcionarios_API } from './../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FuncionarioDTO } from '../model/dto/funcionario.dto';


@Injectable()
export class FuncionarioService {

  constructor(public http: HttpClient) {
  }

  // POST or PUT object
  save(obj: FuncionarioDTO) {

    // se for nulo faz um POST, se não faz PUT
    if (obj.id == null) {
      return this.http.post(
        `${Funcionarios_API.baseUrl}`,
        obj,
        {
          observe: 'response',
          responseType: 'text'
        }
      );
    } else {
      return this.http.put(`${Funcionarios_API.baseUrl}/${obj.id}`, obj)
    }
  }

  findAll(): Observable<FuncionarioDTO[]> {
    return this.http.get<FuncionarioDTO[]>(`${Funcionarios_API.baseUrl}`);
  }

  findAllByName(nome: string): Observable<FuncionarioDTO[]> {
    return this.http.get<FuncionarioDTO[]>(`${Funcionarios_API.baseUrl}/search/name?nome=${nome}`);
  }

  findAllByOffice(id: number): Observable<FuncionarioDTO[]> {
    return this.http.get<FuncionarioDTO[]>(`${Funcionarios_API.baseUrl}/search/office?id=${id}`);
  }

  delete(id: any) {
    return this.http.delete(`${Funcionarios_API.baseUrl}/${id}`);
  }

  loadById(id: any){
    return this.http.get(`${Funcionarios_API.baseUrl}/${id}`).pipe(take(1))
  }

  getUFs(){
    return this.http.get(`${Funcionarios_API.baseUrl}/ufs`).pipe(take(1))
  }

}
