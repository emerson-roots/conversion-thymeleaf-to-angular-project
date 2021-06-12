import { DepartamentoDTO } from './../model/dto/departamento.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from '../config/api.config';


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
}
