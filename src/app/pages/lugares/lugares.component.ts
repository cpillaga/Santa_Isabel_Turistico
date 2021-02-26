import { Component, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Lugares, Sector, Tipo } from '../../interfaces/interfaces';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { HttpClient } from '@angular/common/http';
import { LugarService } from '../../services/lugar.service';
import { NgForm } from '@angular/forms';
import { PublicidadService } from '../../services/publicidad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent implements OnInit {

  mapa: mapboxgl.Map;
  lng: number;
  lat: number;
  coord: [] = [];
  lugares: Lugares[] = [];
  nombre: string = "";
  sector: Sector[] = [];
  sec: string = "";
  descripcion: string ="";
  valores: Lugares;
  tipos: Tipo[] = [];
  tipoOne: Tipo;
  informacion: string;

  public imgTemp: any = null;
  public selectImg: File = null;
  public img: string;
  public imgEmp: string;
  public nomImg: string;

  public nomSec: string ="";
  public desTipo: string ="";

  @ViewChild('closebuttonadd',  {static: false}) closebuttonadd;
  @ViewChild('closebuttonaddT',  {static: false}) closebuttonaddT;
  
  constructor(
    private http: HttpClient,
    private _lugarService: LugarService,
    private _publicidadService: PublicidadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.crearMapa();
      this.getSector();
      this.getTipos();
    }, 200);
  }

  getSector(){
    this._lugarService.getSector().subscribe(resp => {
      this.sector = resp;
    });
  }

  getTipos(){
    this._lugarService.getTipo().subscribe(resp => {
      this.tipos = resp;
    });
  }

  public selectImage(file: File){
    this.selectImg = file;
    this.nomImg = file.name;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  crearMapa() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoicGlsbGFnYSIsImEiOiJja2Vvd3picWYwdTByMzB0NWh0ZGhxaTZlIn0.AOxYJDlMkWpzmlZ9oYPWYA';
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-79.3152719, -3.2742373],
      zoom: 14.5
    });

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: false,
      mapboxgl: mapboxgl,
      placeholder: 'Buscar...', // Placeholder text for the search bar
    });

    this.mapa.addControl(geocoder);
    geocoder.on('result', function(e) {
      this.coord = e.result.center;
    });

  }

  agregarMarcador(marcador: Lugares){

    const html = `<h2>${marcador.nombre}</h2>
                  <br>
                  <button>Eliminar</button>`;

    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false
    }).setHTML(html);

    const marker = new mapboxgl.Marker({
      draggable: true
    })
    .setLngLat([marcador.lng, marcador.lat])
    .setPopup(customPopup)
    .addTo(this.mapa);

    

    marker.on('drag', ()=> {
      const lngLat = marker.getLngLat();

      this.lng = lngLat.lng;
      this.lat = lngLat.lat;
    });
  }

  crearMarcador() {
    this.lng = -79.3152719;
    this.lat = -3.2742373;

    const customMarker: Lugares = {
      lng: this.lng,
      lat: this.lat,
      nombre: 'sin nombre',
      descripcion: 'Descripcion',
      img: 'https://res.cloudinary.com/dopyumyma/image/upload/v1608185268/gswgw96dbb2y2alaogy0.jpg',
      sector: '5fe21360a92d9400170978ed',
      tipo: 'Parquedero',
      informacion: 'Sin informacion'
    }

    this.agregarMarcador(customMarker);
  }

  agregarLugar(form: NgForm){
    this._publicidadService.subirImg(this.imgTemp).then(url => {
      this.valores = {
        lng: form.value.lng,
        lat: form.value.lat,
        nombre: form.value.nombre,
        descripcion: form.value.descripcion,
        img: url,
        sector: form.value.sec,
        tipo: form.value.tipo,
        informacion: form.value.informacion
      }

      this._lugarService.insertarLugar(this.valores).subscribe(resp => {
        this.router.navigate(['/vista']);
      });
    }, (err) => {
      console.log(err);
    });
  }


  addSector(form: NgForm){
    const sector = {
      nombre: form.value.nomSec,
      descripcion: form.value.desSec,
      img: 'https://res.cloudinary.com/dopyumyma/image/upload/v1608185268/gswgw96dbb2y2alaogy0.jpg'
    }

    this._lugarService.addSector(sector).subscribe(resp => {
      this.closebuttonadd.nativeElement.click();
      this.getSector();
    });
  }

  addTipo(form: NgForm){

    const tipo = {
      descripcion: form.value.desTipo,
      color: form.value.colTipo
    }

    this._lugarService.addTipo(tipo).subscribe(resp => {
      this.closebuttonaddT.nativeElement.click();
      this.getTipos();
    });
  }
}