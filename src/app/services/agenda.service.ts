import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agenda } from '../interfaces/interfaces';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(
    private http: HttpClient
  ) { }

  getAgenda(){
    const url = URL_SERVICE.url + '/agenda';

    return this.http.get( url)
        .map((resp: any) =>
            resp.agenda
        );
  }

  insertarAgenda(agenda: Agenda){

    const url = URL_SERVICE.url + '/agenda';

    return this.http.post( url, agenda)
        .map((resp: any) =>
            resp
        );
  }
}
