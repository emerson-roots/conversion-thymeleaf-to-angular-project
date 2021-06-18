import { API_CONFIG, Departamentos_API } from './../config/api.config';
import { DepartamentoDTO } from './../model/dto/departamento.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable()
export class DepartamentoService {

  constructor(public http: HttpClient) {
  }

  // POST or PUT object
  save(obj: DepartamentoDTO) {

    // se for nulo faz um POST, se não faz PUT
    if (obj.id == null) {
      return this.http.post(
        `${Departamentos_API.baseUrl}`,
        obj,
        {
          observe: 'response',
          responseType: 'text'
        }
      );
    } else {
      return this.http.put(`${Departamentos_API.baseUrl}/${obj.id}`, obj)
    }
  }

  findAll(): Observable<DepartamentoDTO[]> {
    return this.http.get<DepartamentoDTO[]>(`${Departamentos_API.baseUrl}`);
  }

  delete(id: any) {
    return this.http.delete(`${Departamentos_API.baseUrl}/${id}`);
  }

  loadById(id: any){
    return this.http.get(`${Departamentos_API.baseUrl}/${id}`).pipe(take(1))
  }
}
