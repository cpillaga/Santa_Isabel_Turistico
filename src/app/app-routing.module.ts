import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PublicidadComponent } from './pages/publicidad/publicidad.component';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'publicidad', component: PublicidadComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
