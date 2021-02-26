import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RutasService } from '../../services/rutas.service';
import { Observable } from 'rxjs';
import { Rutas, CoordRuta } from '../../interfaces/interfaces';
import path from 'path';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})
export class RutasComponent implements OnInit {
  ruta: Rutas;
  coord: CoordRuta;
  archivo: string;
  localUrl: any[];
  file: File = null;

  constructor(
    private http: HttpClient,
    private _rutaService: RutasService
  ) { }

  ngOnInit(): void {
  }

  public getFile(event: any) { 
    this.archivo = event.target.files[0].name;
    this.file = event.target.files[0];

    this._rutaService.cargarFile(this.file).then(resp => {
      console.log(resp);
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get('assets/json/' + this.archivo);
  }

  public addRuta(){
    this.getJSON().subscribe(data => {

      console.log(data.features.length);
      for (let i = 0; i < data.features.length; i++) {
        
        const descRuta = data.features[i].attributes.Descripcion;

        this.ruta = {
          descripcion: descRuta
        };

        // this._rutaService.insertarRuta(this.ruta).subscribe(resp => {
        //   for (let j = 0; j < data.features[i].geometry.paths[0].length; j++) {
        //     const lng = data.features[i].geometry.paths[0][j][0];
        //     const lat = data.features[i].geometry.paths[0][j][1];

        //     this.coord = {
        //       lng: lng,
        //       lat: lat,
        //       ruta: resp._id
        //     };

        //     this._rutaService.insertarCoord(this.coord).subscribe(resp => {
        //       console.log(resp);
        //     });
        //   }
        // });

      }
    });
   }
}