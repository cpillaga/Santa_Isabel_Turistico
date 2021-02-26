import { Component, OnInit } from '@angular/core';
import { Lugares } from '../../interfaces/interfaces';
import { LugarService } from '../../services/lugar.service';

@Component({
  selector: 'app-listar-lugar',
  templateUrl: './listar-lugar.component.html',
  styleUrls: ['./listar-lugar.component.css']
})
export class ListarLugarComponent implements OnInit {

  pw: string = "";
  face: string="";
  insta: string="";
  tel: string="";

  lugar: Lugares[] = [];

  constructor(
    private _lugar: LugarService,
  ) { }

  ngOnInit(): void {
    this.getLugares();
  }

  getLugares(){
    this._lugar.getLugar().subscribe(resp => {
      this.lugar = resp;
    });
  }
}
