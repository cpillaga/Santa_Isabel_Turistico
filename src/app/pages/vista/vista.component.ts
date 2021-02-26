import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Lugares } from '../../interfaces/interfaces';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { HttpClient } from '@angular/common/http';
import { LugarService } from '../../services/lugar.service';
import { Observable } from 'rxjs';
import { AgendaService } from '../../services/agenda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {
  mapa: mapboxgl.Map;
  lugares: Lugares[] = [];
  coord: [] = [];
  color: string;

  constructor(
    private http: HttpClient,
    private _lugarService: LugarService,
    private _agendaService: AgendaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.crearMapa();
    this.getLugares();
  }

  public getJSON(): Observable<any> {
      return this.http.get("./assets/json/rutas.json");
  }

  crearMapa() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoicGlsbGFnYSIsImEiOiJja2Vvd3picWYwdTByMzB0NWh0ZGhxaTZlIn0.AOxYJDlMkWpzmlZ9oYPWYA';
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-79.3152719, -3.2742373],
      zoom: 14.5
    });

    // var geocoder = new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken,
    //   marker: false,
    //   mapboxgl: mapboxgl,
    //   placeholder: 'Buscar...', // Placeholder text for the search bar
    // });

    // this.mapa.addControl(geocoder);

    this.mapa.on('load', function () {
      this.mapa.addSource('route', {
      'type': 'geojson',
      'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
      'type': 'LineString',
      'coordinates': [
        [-79.320432384999947,-3.2718464489999519],
        [-79.320058638999967,-3.2721291109999697],
        [-79.319860243999983,-3.2723278469999286],
        [-79.319642810999937,-3.2725227219999624],
        [-79.31954746599996,-3.2725952989999314],
        [-79.319315031999963,-3.2726485039999602],
        [-79.319109082999944,-3.2728089439999621],
        [-79.318956585999956,-3.2728929089999497],
        [-79.318689922999965,-3.272915429999955],
        [-79.318507030999967,-3.2729534039999635],
        [-79.318475563999982,-3.2735505599999328],
        [-79.318467581999982,-3.2737687579999601]
      ]
      }
      }
      });
      this.mapa.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      'layout': {
      'line-join': 'round',
      'line-cap': 'round'
      },
      'paint': {
      'line-color': '#888',
      'line-width': 8
      }
      });
      });

    // geocoder.on('result', function(e) {
    //   this.coord = e.result.center;
    // });
    
  

  }

  agregarMarcador(marcador: Lugares){

    const h6 = document.createElement('h6');
    h6.innerText = marcador.nombre;
    h6.style.textAlign = "center";

    const img = document.createElement('img');
    img.src = marcador.img;
    img.width = 100;
    img.height = 100;

    const pDesc = document.createElement('p');
    pDesc.innerText = marcador.informacion;
    pDesc.style.fontSize = "9px;"

    const button = document.createElement('button');
    button.innerText = "Eliminar";
    button.className = "btn btn-danger btn-fill";
    button.style.fontSize = "10px";

    const div61 = document.createElement('div');
    div61.append(img);
    div61.className = "col-sm-6";

    const div62 = document.createElement('div');
    div62.append(pDesc); 
    div62.className = "col-sm-6";
    div62.style.fontSize = "9px;"

    const div12 = document.createElement('div');
    div12.append(div61, div62);
    div12.className = "col-sm-12";

    const divRow = document.createElement('div');
    divRow.append(div12);
    divRow.className = "row";

    const divRow2 = document.createElement('div');
    divRow2.append(button);
    divRow2.className = "row";
    divRow2.style.marginTop = "10px";
    divRow2.style.textAlign = "center";


    const div2 = document.createElement('div');
    div2.append(h6, divRow, divRow2);
    div2.style.width = "250px";

    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false
    }).setDOMContent(div2);

    const marker = new mapboxgl.Marker({
      // draggable: true
      color: this.getTipoID(marcador.tipo)
    })
    .setLngLat([marcador.lng, marcador.lat])
    .setPopup(customPopup)
    .addTo(this.mapa);

    button.addEventListener('click', () => {
      this.delLugar(marcador._id);
    })
  }

  getTipoID(id): string{
    this._lugarService.getTipoID(id._id).subscribe(resp => {
      this.color = resp.color;
      return resp.color;
    });

    return this.color;
  }

  getLugares(){
    this._lugarService.getLugar().subscribe(resp => {
      this.lugares = resp;

      for (let  i = 0;  i < this.lugares.length;  i++) {
        this.agregarMarcador(this.lugares[i]);
      }
    });
  }

  delLugar(id){
    this._lugarService.eliminarLugar(id).subscribe(resp => {
      console.log(resp);
      if (resp.ok) {
        this.router.navigate(['/vista']).then(() => {
          window.location.reload();
        });
      }
    })
  }
}