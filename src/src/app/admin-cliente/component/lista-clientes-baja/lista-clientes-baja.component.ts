import { Component, OnInit } from '@angular/core';

//model
import { Cliente } from './../clientes/model/cliente';

//service 
import { ClienteService } from './../clientes/clientes.service';

@Component({
  selector: 'app-lista-clientes-baja',
  templateUrl: './lista-clientes-baja.component.html',
  styleUrls: ['./lista-clientes-baja.component.scss']
})

export class ListaClientesBajaComponent implements OnInit {
  public clientes = [];
  filterNombre = '';

  clientesFiltrados = [];


  constructor(public clienteService: ClienteService) { }

  //Copia la lista de clientes y la asigna a clientesFiltrados
  assignCopy(){
    this.clientesFiltrados = Object.assign([], this.clientes);
  }

  filtrarClientes(){
    if(!this.filterNombre) 
      this.assignCopy(); //when nothing has typed


    this.clientesFiltrados = Object.assign([], this.clientes).filter(
       cliente => cliente.nombre.toLowerCase().indexOf(this.filterNombre.toLowerCase()) > -1)
    }

    isEmpty(){
      if (this.clientes = null)
        return true;
      return false;
    }


    ngOnInit(): void {
    }
    


}
