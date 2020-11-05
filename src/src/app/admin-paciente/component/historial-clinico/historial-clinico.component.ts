import { Component, OnInit } from '@angular/core';
import {Mascota} from '../model/mascota';
import {MascotaService} from '../model/mascota.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-historial-clinico',
  templateUrl: './historial-clinico.component.html',
  styleUrls: ['./historial-clinico.component.scss']
})
export class HistorialClinicoComponent implements OnInit {

  public mascotas = [];
  closeResult = '';

  mascotaForm: FormGroup;

  idFirabaseActualizar: string;
  actualizar: boolean;
  constructor(public mascotaService: MascotaService) { }


   ngOnInit(): void {

    this.mascotaService.getMascotas().subscribe((mascotasSnapshot) => {
      this.mascotas = [];
      mascotasSnapshot.forEach((mascotaData: any) => {
        this.mascotas.push({
          id: mascotaData.payload.doc.id,
          data: mascotaData.payload.doc.data()
        });
      })
    });
  }

  onSubmit(formMascota: NgForm){
    this.mascotaService.createMascota(formMascota.value);
   this.resetForm(formMascota);
  }

  resetForm(formMascota: NgForm){
   if (formMascota != null)
    formMascota.reset();
    this.mascotaService.selectedMascota = new Mascota();
  }
  eliminar(item: any): void {
    this.mascotaService.deleteMascota(item.idFirebase);
  }

  guardarMascota(): void {
    this.mascotaService.createMascota(this.mascotaForm.value).then(resp => {
      this.mascotaForm.reset();
    }).catch(error => {
      console.error(error)
    })
  }

 // actualizarMascota() {
  //  if (!isNullOrUndefined(this.idFirabaseActualizar)) {
  //    this.mascotaService.updateMascota(this.mascotaForm.value).then(resp => {
   //     this.mascotaForm.reset();
  //    }).catch(error => {
   //     console.error(error);
   //   });
   // } }
 

}
