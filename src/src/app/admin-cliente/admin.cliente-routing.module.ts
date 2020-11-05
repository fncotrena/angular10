import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ClientenavComponent} from './component/clientenav/clientenav.component';
import {FormClienteComponent} from './component/form-cliente/form-cliente.component';
import {ListaClienteComponent} from './component/lista-cliente/lista-cliente.component';
import {EditClientComponent} from './component/edit-client/edit-client.component';
import { ListaClientesBajaComponent } from './component/lista-clientes-baja/lista-clientes-baja.component';
import { InfoClienteComponent } from './component/info-cliente/info-cliente.component';
const routes: Routes = [
  {
    path: '',
    component: ClientenavComponent,
    children: [
      {
        path: 'create',
        component : FormClienteComponent ,},
        {
          path: 'listacliente',
          component : ListaClienteComponent ,},
          {
            path: 'edit/:id',
            component : EditClientComponent ,},
            {
              path: 'listaclientesbaja',
              component: ListaClientesBajaComponent,},
              {
                path: 'info/:id',
                component: InfoClienteComponent,},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
