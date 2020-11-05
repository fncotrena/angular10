import { Component, OnInit } from '@angular/core';
import {Mascota} from '../model/mascota';
import {MascotaService} from './../model/mascota.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router,ActivatedRoute, Params} from '@angular/router';
import { ClienteService } from './../../../admin-cliente/component/clientes/clientes.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-ficha-clinica',
  templateUrl: './ficha-clinica.component.html',
  styleUrls: ['./ficha-clinica.component.scss']
})
export class FichaClinicaComponent implements OnInit{
  public mascotas = [];
  mascota:Mascota;
  mascotaForm: FormGroup;
  id:string;
  minDate: Date;
  maxDate: Date;

  constructor(public mascotaService: MascotaService,  
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,


    )  {this.mascotaForm ;
      const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 20, 0, 1);
      this.maxDate = new Date();   
    }


    ngOnInit() {
      this.activatedRoute.params.subscribe((params: Params) => {
        this.id = params.id;
        this.mascotaService.getMascotaById(this.id)
        .subscribe(Mascota => {
          this.mascotaForm.patchValue(Mascota);
        });
      });


    }



  guardarMascota(formMascota: NgForm): void {
    const mascota = formMascota.value;
    this.mascotaService.updateMascota(this.id, mascota)

    this.resetForm(formMascota);
    alert("Mascota editada Existosamente");

    this.router.navigate(['./mascotas/listaMascotas']);

    }
    resetForm(formMascota: NgForm){
      if (formMascota != null)
      formMascota.reset();
      this.mascotaService.selectedMascota = new Mascota();
    }



    

}