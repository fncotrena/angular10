import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FooterComponent} from './component/footer/footer.component';
import { DateFormatPipe } from './pipe/date-format.pipe';
//import { FiltroMascotaPipe } from './pipe/FiltroMascota/filtro-mascota.pipe';

import {HeaderComponent} from './component/header/header.component';
import {ReactiveFormsModule}from '@angular/forms'; 
import {MaterialModule} from './../material/material.module';

import {ConfirmDialogComponent} from './component/confirm-dialog/confirm-dialog.component';




@NgModule({
  declarations: [
    DateFormatPipe,
    HeaderComponent,
    FooterComponent
    ,ConfirmDialogComponent
  ],
  exports: [
    DateFormatPipe,
    HeaderComponent,
    FooterComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule 
  ]
})
export class SharedModule { }
