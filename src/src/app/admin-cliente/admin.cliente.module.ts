import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin.cliente-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core'

import { MaterialModule } from '../material/material.module';
import { ClientenavComponent } from './component/clientenav/clientenav.component';
import { FormClienteComponent  } from './component/form-cliente/form-cliente.component';
//import {ClienteService} from './../admin-cliente/component/clientes/clientes.service';
import {ListaClienteComponent} from './component/lista-cliente/lista-cliente.component';
//import { FilterPipe } from "./component/pipes/filter.pipe";
import {EditClientComponent} from "./component/edit-client/edit-client.component";
//import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { InfiniteScrollComponent} from 'src/app/admin-cliente/component/infinite-scroll/infinite-scroll.component';
import { ListaClientesBajaComponent } from './component/lista-clientes-baja/lista-clientes-baja.component';
import {TablecComponent} from './component/lista-cliente/tablec/tablec.component';
import {TablecBajaComponent} from './component/lista-clientes-baja/tablec-baja/tablec-baja.component';

import { InfoClienteComponent } from './component/info-cliente/info-cliente.component';
import { TablecMascotaComponent } from './component/info-cliente/tablec-mascota/tablec-mascota.component'

  @NgModule({

    declarations: [
      ClientenavComponent,
      FormClienteComponent,
      ListaClienteComponent,
      EditClientComponent,
      InfiniteScrollComponent,
      ListaClientesBajaComponent,
      TablecComponent,
      TablecBajaComponent,
      InfoClienteComponent,
      TablecMascotaComponent
      ],
    imports: [
    FormsModule,
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    
    
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-Ar'},
  ],
})
  //providers: [ClienteService],
 // bootstrap: [AppComponent]

 // providers: [ClienteService],
  //bootstrap: [AppComponent]
//})

export class AdminModule { }
