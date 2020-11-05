import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {path: '',
  component: LayoutComponent,
  children: [ {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
]}
, {
  path: 'clientes',
 loadChildren: () => import('./admin-cliente/admin.cliente.module').then(m => m.AdminModule)
}


, {
 path: 'mascotas',
  loadChildren: () => import('./admin-paciente/admin-paciente.module').then(m => m.AdminPacienteModule)
},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
