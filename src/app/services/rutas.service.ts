import { Injectable } from '@angular/core';
import { Rutas, CoordRuta } from '../interfaces/interfaces';
import { URL_SERVICE } from '../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  constructor(
    private http: HttpClient
  ) { }

  insertarRuta(ruta: Rutas){

    const url = URL_SERVICE.url + '/ruta';

    return this.http.post( url, ruta)
        .map((resp: any) =>
            resp.ruta
        );
  }

  insertarCoord(coord: CoordRuta){

    const url = URL_SERVICE.url + '/coordRuta';

    return this.http.post( url, coord)
        .map((resp: any) =>
            resp
        );
  }

  async cargarFile(archivo: File){

    const url = URL_SERVICE.url + '/upload';

    const fd = new FormData();
    fd.append('archivo', archivo);

    const resp = await fetch( url, {
        method: 'POST',
        body: fd
    });

    const data = await resp.json();

    if(data.statusCode == 200){
        return data;
    }else{
        return false;
    }
  }

}
