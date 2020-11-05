import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router,ActivatedRoute, Params} from '@angular/router';
import {ClienteService} from './../clientes/clientes.service';
import {Cliente} from './../clientes/model/cliente';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  
  public clientes = [];

  clienteForm: FormGroup;
  id: string;

   // tslint:disable-next-line: max-line-length
   private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

   private numericalPattern: any = "[0-9]+";

  constructor(
    public clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute

    )  { 
      this.clienteForm = this.createFormGroup();
    }



    createFormGroup(){
      return new FormGroup({
        $key: new FormControl(this.clienteService.selectedCliente.$key),
        nombre: new FormControl(this.clienteService.selectedCliente.nombre, [Validators.required]),
        apellido: new FormControl(this.clienteService.selectedCliente.apellido, [Validators.required]),
        dni: new FormControl(this.clienteService.selectedCliente.dni, 
          [Validators.required, 
           Validators.pattern(this.numericalPattern),
           Validators.minLength(8), 
           Validators.maxLength(8)]),
        telefono: new FormControl(this.clienteService.selectedCliente.telefono, 
          [Validators.required,
           Validators.pattern(this.numericalPattern)]),
        mail: new FormControl(this.clienteService.selectedCliente.mail, 
          [Validators.required, 
           Validators.pattern(this.emailPattern)]),
        direccion: new FormControl(this.clienteService.selectedCliente.direccion)
      })
    }

    ngOnInit() {
      this.activatedRoute.params.subscribe((params: Params) => {
        this.id = params.id;
        this.clienteService.getClienteById(this.id)
        .subscribe(cliente => {
          this.clienteForm.patchValue(cliente);
        });
      });
    }
    
    onSaveForm(): void {

      let result = window.confirm("Desea guardar los cambios?")
    
      if (result && this.clienteForm.valid){ //si se acepto los cambios y el formulario es valido se guardan cambios

      const cliente = this.clienteForm.value;
      this.clienteService.updateCliente(this.id, cliente)
      this.resetForm();//<-----
      this.router.navigate(['./clientes/listacliente']);

    }else{
      console.log('Formulario no valido');
    }

    
    }


    
    resetForm(){
      if (this.clienteForm != null)
        this.clienteForm.reset()
      this.clienteService.selectedCliente = new Cliente();
    }  

    //Para el manejo de los mensajes de validación
    get nombre(){ return this.clienteForm.get('nombre');}
    get apellido(){ return this.clienteForm.get('apellido');}
    get dni(){ return this.clienteForm.get('dni');}
    get telefono(){ return this.clienteForm.get('telefono');}
    get mail(){ return this.clienteForm.get('mail');}
    get direccion(){ return this.clienteForm.get('direccion');}

}


