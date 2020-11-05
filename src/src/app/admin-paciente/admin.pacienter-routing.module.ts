import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PacientenavComponent} from './component/pacientenav/pacientenav.component';
import {FormFichaclinicaComponent} from './component/form-fichaclinica/form-fichaclinica.component';
import {ListMascotaComponent} from './component/list-mascota/list-mascota.component';
import {MascotEditComponent} from './../admin-paciente/component/mascot-edit/mascot-edit.component';
import {HistorialClinicoComponent} from './component/historial-clinico/historial-clinico.component';
import { FichaClinicaComponent } from './component/ficha-clinica/ficha-clinica.component';

const routes: Routes = [
  {
    path: '',
    component: PacientenavComponent,
    children: [
      {
      path: 'create',
        component : FormFichaclinicaComponent ,
                 },
      {
      path: 'listaMascotas',
       component : ListMascotaComponent ,
                             },
      {
        path: 'edit/:id',
        component : MascotEditComponent ,
        },
        {
          path: 'historialClinico/:id',
          component : HistorialClinicoComponent ,
        },
         ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminPacienteRoutingModule { }