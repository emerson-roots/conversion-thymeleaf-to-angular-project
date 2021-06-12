import { DepartamentoDTO } from './../model/dto/departamento.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';


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
}
