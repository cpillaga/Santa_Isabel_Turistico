import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { APP_ROUTES } from './app.routes';
import { PagesModule } from './pages/pages.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgendaService } from './services/agenda.service';
import { LugarService } from './services/lugar.service';
import { PublicidadService } from './services/publicidad.service';
import { RutasService } from './services/rutas.service';
import { WebsocketService } from './services/websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    AgendaService,
    LugarService,
    PublicidadService,
    RutasService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
