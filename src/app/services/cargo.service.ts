import { Cargos_API } from './../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CargoDTO } from '../model/dto/cargo.dto';


@Injectable()
export class CargoService {

  constructor(public http: HttpClient) {
  }

  // POST or PUT object
  save(obj: CargoDTO) {

    // se for nulo faz um POST, se não faz PUT
    if (obj.id == null) {
      return this.http.post(
        `${Cargos_API.baseUrl}`,
        obj,
        {
          observe: 'response',
          responseType: 'text'
        }
      );
    } else {
      return this.http.put(`${Cargos_API.baseUrl}/${obj.id}`, obj)
    }
  }

  findAll(): Observable<CargoDTO[]> {
    return this.http.get<CargoDTO[]>(`${Cargos_API.baseUrl}`);
  }

  delete(id: any) {
    return this.http.delete(`${Cargos_API.baseUrl}/${id}`);
  }

  loadById(id: any){
    return this.http.get(`${Cargos_API.baseUrl}/${id}`).pipe(take(1))
  }
}
