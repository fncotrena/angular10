import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AdminPacienteRoutingModule } from './admin.pacienter-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {PacientenavComponent} from './component/pacientenav/pacientenav.component';
import {FormFichaclinicaComponent} from './component/form-fichaclinica/form-fichaclinica.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import {ListMascotaComponent} from './component/list-mascota/list-mascota.component';
import {MascotEditComponent} from './../admin-paciente/component/mascot-edit/mascot-edit.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {HistorialClinicoComponent} from './component/historial-clinico/historial-clinico.component';
import {SharedModule} from './../shared/shared.module';
import {TableComponent} from './component/list-mascota/table/table.component';
import { FichaClinicaComponent } from './component/ficha-clinica/ficha-clinica.component';
@NgModule({
  declarations: [PacientenavComponent, 
    FormFichaclinicaComponent,
    ListMascotaComponent,
    MascotEditComponent,
    HistorialClinicoComponent,TableComponent, FichaClinicaComponent],
  imports: [
    CommonModule,
    AdminPacienteRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    ScrollingModule,
    SharedModule,   
  ]
})

export class AdminPacienteModule { }
