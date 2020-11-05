import { Component, OnInit } from '@angular/core';
import {Mascota} from '../model/mascota';
import {MascotaService} from './../model/mascota.service';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {ConfirmDialogComponent} from './../../../shared/component/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-mascot-edit',
  templateUrl: './mascot-edit.component.html',
  styleUrls: ['./mascot-edit.component.scss']
})
export class MascotEditComponent implements OnInit {

  public mascotas = [];
  public  date;
mascota: Mascota;
mascotaForm: FormGroup;
id: string;
minDate: Date;
maxDate: Date;
fechaI = new FormControl(new Date());
constructor(public mascotaService: MascotaService, public dialog: MatDialog,
            private router: Router,
            private activatedRoute: ActivatedRoute) {


      const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 20, 0, 1);
      this.maxDate = new Date();
      this.mascotaForm = this.createFormGroup();
    //  this.date = new Date(mascotaService.selectedMascota.fechaIngreso);


    }


ngOnInit() {

  this.activatedRoute.params.subscribe((params: Params) => {
  



    this.id = params.id;
  
    this.mascotaService.getMascotaById2(this.id).subscribe(pet => {
  
      
      this.mascotaForm.setValue({
        nombre: pet.nombre,
        peso: pet.peso,
        raza: pet.raza,
         fechaNacimiento: pet.fechaNacimiento,
         fechaIngreso: pet.fechaIngreso,
        genero: pet.genero,
        especie: pet.especie,
      }
         
      



     




        // tslint:disable-next-line: align
        );
      // this.date= pet.fechaNacimiento
    });

  
    });


    }



guardarMascota() {

  const result = window.confirm('Desea guardar los cambios?');
  if (result && this.mascotaForm.valid){
    const mascota = this.mascotaForm.value;
    this.mascotaService.updateMascota(this.id, mascota);

    this.resetForm();
    this.openDialog();

    this.router.navigate(['./mascotas/listaMascotas']);

}

    }
resetForm(){
      if (this.mascotaForm != null) {
      this.mascotaForm.reset();
      }
      this.mascotaService.selectedMascota = new Mascota();
    }




openDialog(): void {
      const dialogRef = this.dialog.open(ConfirmDialogComponent);
      dialogRef.afterClosed().subscribe(result => console.log(result));
    }

createFormGroup(){
      console.log('****---formulario-reactivo****------');
      console.log(this.mascotaService.selectedMascota.fechaIngreso.toDate().toISOString)
     //this.mascotaService.selectedMascota.especie
       // tslint:disable-next-line: align
      return new FormGroup({
        $key: new FormControl(this.mascotaService.selectedMascota.$key),
        nombre: new FormControl(this.mascotaService.selectedMascota.nombre, [Validators.required]),
        fechaIngreso: new FormControl(new Date(this.mascotaService.selectedMascota.fechaIngreso.toDate()), [Validators.required]),
        fechaNacimiento: new FormControl( new Date(this.mascotaService.selectedMascota.fechaNacimiento.toDate()), [Validators.required]),
        raza: new FormControl(this.mascotaService.selectedMascota.raza, [Validators.required]),
        especie: new FormControl(this.mascotaService.selectedMascota.especie, [Validators.required]),
        peso: new FormControl(this.mascotaService.selectedMascota.peso, [Validators.required]),
        genero: new FormControl(this.mascotaService.selectedMascota.genero, [Validators.required]),


      });
    }

get nombre(){ return this.mascotaForm.get('nombre'); }
get fechaIngreso(){ return this.mascotaForm.get('fechaIngreso'); }
get fechaNacimiento(){ return this.mascotaForm.get('fechaNacimiento'); }
get raza(){ return this.mascotaForm.get('raza'); }
get especie(){ return this.mascotaForm.get('especie'); }
get peso(){ return this.mascotaForm.get('peso'); }
get genero(){ return this.mascotaForm.get('genero'); }

 



  }
