import { Component, OnInit } from '@angular/core';
import {Mascota} from '../model/mascota';
import {MascotaService} from './../model/mascota.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router,ActivatedRoute, Params} from '@angular/router';
import { getLocaleDayNames } from '@angular/common';
import { ClienteService } from './../../../admin-cliente/component/clientes/clientes.service';
import { Cliente } from './../../../admin-cliente/component/clientes/model/cliente';


@Component({
  selector: 'app-form-fichaclinica',
  templateUrl: './form-fichaclinica.component.html',
  styleUrls: ['./form-fichaclinica.component.scss']
})
export class FormFichaclinicaComponent implements OnInit {
  
  public mascotas = [];
  closeResult = '';
  mascotaForm: FormGroup;
  propietario: Cliente

  idFirabaseActualizar: string;
  actualizar: boolean;

  minDate: Date;
  maxDate: Date;
  tomorrow = new Date();
 
  constructor(  private router: Router, public mascotaService: MascotaService, 
    private clienteService: ClienteService,
  

    ) { 

      const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 20, 0, 1);
      this.maxDate = new Date();
    }
    

    ngOnInit(): void {

      this.propietario = this.clienteService.selectedCliente;
  
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
   alert("Mascota Ingresada Existosamente");
   this.router.navigate(['./mascotas/listaMascotas']);

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
   



}