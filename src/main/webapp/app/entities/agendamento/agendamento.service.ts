import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Agendamento } from './agendamento.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AgendamentoService {

    private resourceUrl = 'api/agendamentos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(agendamento: Agendamento): Observable<Agendamento> {
        const copy = this.convert(agendamento);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(agendamento: Agendamento): Observable<Agendamento> {
        const copy = this.convert(agendamento);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Agendamento> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.dataAgenda = this.dateUtils
            .convertLocalDateFromServer(entity.dataAgenda);
    }

    private convert(agendamento: Agendamento): Agendamento {
        const copy: Agendamento = Object.assign({}, agendamento);
        copy.dataAgenda = this.dateUtils
            .convertLocalDateToServer(agendamento.dataAgenda);
        return copy;
    }
}
