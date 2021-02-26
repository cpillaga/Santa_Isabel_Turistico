import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AgendaService } from '../../services/agenda.service';
import { HttpClient } from '@angular/common/http';
import { Agenda } from '../../interfaces/interfaces';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: []
})
export class AgendaComponent implements OnInit {

  titulo: string= "";
  agenda: Agenda[] = [];

  @ViewChild('closebuttonadd',  {static: false}) closebuttonadd;

  constructor(
    private http: HttpClient,
    private _agendaService: AgendaService,
  ) { }

  ngOnInit(): void {
    this.getAgenda();
  }

  getAgenda(){
    this._agendaService.getAgenda().subscribe(resp => {
      this.agenda = resp;
    });
  }

  agregar(form: NgForm){
    const agenda = {
      titulo: form.value.titulo,
      descripcion: form.value.descripcion, 
      fecha: new Date(form.value.fecha).toISOString(),
      lugar: form.value.lugar
    }

    this._agendaService.insertarAgenda(agenda).subscribe(resp => {
      this.getAgenda();
      this.closebuttonadd.nativeElement.click();
    });
  }
}
