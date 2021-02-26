import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';
import { PAGES_ROUTES } from './pages.routes';
import { AgendaComponent } from './agenda/agenda.component';
import { LugaresComponent } from './lugares/lugares.component';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { RutasComponent } from './rutas/rutas.component';
import { VistaComponent } from './vista/vista.component';



@NgModule({
  declarations: [
    InicioComponent,
    PagesComponent,
    InicioComponent,
    AgendaComponent,
    LugaresComponent,
    PublicidadComponent,
    RutasComponent,
    VistaComponent
  ],
  exports: [
      PagesComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class PagesModule { }
