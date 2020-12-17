import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicidadService } from '../../services/publicidad.service';

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.css']
})
export class PublicidadComponent implements OnInit {

  public imgTemp: any = null;
  public selectImg: File = null;
  public img: string;
  public imgEmp: string;
  public nomImg: string;

  public pw: number;
  public am: number;

  public imagenes: [] = [];
  public check: boolean;

  constructor(
    public _publicidadService: PublicidadService,
    public _router: Router
  ) { }

  ngOnInit(): void {
    this.imgTemp = '';
    this.check = true;
    this.getPublicidad(2);
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

  public subirImg(form: NgForm){
    this._publicidadService.subirImg(this.imgTemp).then(url => {
      this.guardarPublicidad(url, form.value.pw);
    }, (err) => {
      console.log(err);
    });
  }

  public guardarPublicidad(urlImg: string, tipoImg: string){
    this._publicidadService.insertarPublicidad(urlImg, tipoImg).subscribe(resp => {
      window.location.reload();
    });
  }

  public getPublicidad(tipo){
    this._publicidadService.getPublicidad(tipo).subscribe(resp => {
      this.imagenes = resp;
    });
  }

  public deletePublicidad(id, tipo){
    this._publicidadService.deletePublicidad(id).subscribe(resp => {
      this.getPublicidad(tipo);
    });
  }
}
