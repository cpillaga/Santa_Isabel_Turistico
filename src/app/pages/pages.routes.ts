import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { RutasComponent } from './rutas/rutas.component';
import { LugaresComponent } from './lugares/lugares.component';
import { VistaComponent } from './vista/vista.component';
import { AgendaComponent } from './agenda/agenda.component';
import { ListarLugarComponent } from './listar-lugar/listar-lugar.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'inicio', component: InicioComponent },
            { path: 'publicidad', component: PublicidadComponent },
            { path: 'rutas', component: RutasComponent },
            { path: 'lugares', component: LugaresComponent },
            { path: 'vista', component: VistaComponent },
            { path: 'agenda', component: AgendaComponent },
            { path: 'listado', component: ListarLugarComponent },
            { path: '', redirectTo: '/login', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
