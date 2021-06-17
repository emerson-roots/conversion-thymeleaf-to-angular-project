import { API_CONFIG } from './../config/api.config';
import { DepartamentoDTO } from './../model/dto/departamento.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable()
export class DepartamentoService {

  constructor(public http: HttpClient) {
  }

  insert(obj: DepartamentoDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/departamentos`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  findAll(): Observable<DepartamentoDTO[]> {
    return this.http.get<DepartamentoDTO[]>(`${API_CONFIG.baseUrl}/departamentos`);
  }

  delete(id: any) {
    return this.http.delete(`${API_CONFIG.baseUrl}/departamentos/${id}`);
  }

  loadById(id: any){
    return this.http.get(`${API_CONFIG.baseUrl}/departamentos/${id}`).pipe(take(1))
  }
}
