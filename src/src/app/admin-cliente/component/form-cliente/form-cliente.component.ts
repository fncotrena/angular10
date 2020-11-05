import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router,ActivatedRoute, Params} from '@angular/router';
import {ClienteService} from './../clientes/clientes.service';
import {Cliente} from './../clientes/model/cliente';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss']
})
export class FormClienteComponent implements OnInit {
  public clientes = [];

  clienteForm: FormGroup;
  id: string;

  isRegistred: boolean ;

   // tslint:disable-next-line: max-line-length
   private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

   private numericalPattern: any = "[0-9]+";

  constructor(
    public clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    )  { 
      this.clienteForm = this.createFormGroup();
      this.isRegistred = false;
    }



    createFormGroup(){
      return new FormGroup({
        $key: new FormControl(''),
        nombre: new FormControl('', [Validators.required]),
        apellido: new FormControl('', [Validators.required]),
        dni: new FormControl('', [Validators.required, Validators.pattern(this.numericalPattern),
           Validators.minLength(8), Validators.maxLength(8)]),
        telefono: new FormControl('', [Validators.required, Validators.pattern(this.numericalPattern)]),
        mail: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
        direccion: new FormControl('')
      })
    }

  ngOnInit() {
    this.isRegistred = false;
      //Routing para los distintos clientes
      // this.activatedRoute.params.subscribe((params: Params) => {
      //   this.id = params.id;
      //   this.clienteService.getClienteById(this.id)
      //   .subscribe(cliente => {
      //     this.clienteForm.patchValue(cliente);
      //   });
      // });
  }

  /***
   * Se encarga de verificar que se cumpla la condicion de que no exista un cliente
   * en la base de datos con el mismo numero de dni en el form
  */
  onValidateSubmit(){

    let esperado: Cliente = this.clienteForm.value;
    this.clienteService.getClienteByDni(esperado).subscribe((response) => {  
        //console.log("resultado de query: cantidad = "+response.length);
      if (response.length == 0){
        this.isRegistred = false;
        this.onSubmit();
      }else{
        this.isRegistred = true;
      return;
      }
    });
  }


  onSubmit(): void {

    //Si el formulario es valido y no hay un cliente con el mismo dni en la db, procede
    //a registrar el nuevo cliente    
    if (this.clienteForm.valid && window.confirm("Desea continuar con el registro?")){
      const cliente = this.clienteForm.value;
      this.clienteService.createCliente(cliente);
      this.resetForm();
      this.router.navigate(['./clientes/listacliente']);
    }else{
      console.log('Formulario no valido');
      return;
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
