import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rutas, CoordRuta } from '../../interfaces/interfaces';
import { RutasService } from '../../services/rutas.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  // ruta: Rutas;
  // coord: CoordRuta;

  constructor(
    // private http: HttpClient,
    // private _rutaService: RutasService
  ) {
    // this.getJSON().subscribe(data => {

    //   console.log(data);
    //   for (let i = 0; i < data.features.length; i++) {
    //     const descRuta = "Ruta orden 123";

    //     this.ruta = {
    //       descripcion: descRuta
    //     };

    //     this._rutaService.insertarRuta(this.ruta).subscribe(resp => {
    //       for (let j = 0; j < data.features[i].geometry.paths[0].length; j++) {
    //         const lng = data.features[i].geometry.paths[0][j][0];
    //         const lat = data.features[i].geometry.paths[0][j][1];

    //         this.coord = {
    //           lng: lng,
    //           lat: lat,
    //           orden: j,
    //           ruta: resp._id
    //         };

    //         this._rutaService.insertarCoord(this.coord).subscribe(resp => {
    //           console.log(resp);
    //         });
    //       }
    //     });

    //   }

    // });
  }

  // public getJSON(): Observable<any> {
  //     return this.http.get("./assets/json/EcoparqueB.json");
  // }
  
  ngOnInit(): void {

  }



}
