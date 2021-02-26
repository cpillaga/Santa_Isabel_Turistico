import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class PublicidadService {

  constructor(
    private http: HttpClient
  ) { }

  async subirImg(img: File){

    const url = "https://api.cloudinary.com/v1_1/dopyumyma/image/upload?upload_preset=p6jgug5a";

    const fd = new FormData();
    fd.append('file', img);

    const resp = await fetch( url, {
        method: 'POST',
        body: fd
    });

    const data = await resp.json();

    return data.secure_url;

  }

  insertarPublicidad(urlImg: string, tipoImg: string){

    const url = URL_SERVICE.url + '/publicidad';

    const body = {
      img: urlImg,
      type: tipoImg,
    };

    return this.http.post( url, body)
        .map((resp: any) =>
            resp
        );
  }

  getPublicidad(tipo: string){
    const url = URL_SERVICE.url + '/publicidad-type/' + tipo;

    return this.http.get( url ).map((resp: any) =>
      resp.publicidades
    );
  }

  deletePublicidad(id){
    const url = URL_SERVICE.url + '/publicidad/' + id;

    return this.http.delete( url ).map((resp: any) =>
      resp
    );
  }
}
