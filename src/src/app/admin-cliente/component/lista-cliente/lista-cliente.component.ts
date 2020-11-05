import { Component, OnInit, HostListener } from '@angular/core';
import { Cliente } from './../clientes/model/cliente';

//service 
import { ClienteService } from './../clientes/clientes.service';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {

  public clientes = [];
  clientesFiltrados = [];
  filterNombre: string;


  constructor(public clienteService: ClienteService) { }


    filterCliente(){
    this.clientesFiltrados = Object.assign([], this.clientes).filter(
       cliente => cliente.nombre.toLowerCase().indexOf(this.filterNombre.toLowerCase()) > -1)
    }

    isEmpty(){
      if (this.clientes = null)
        return true;
      return false;
    }


    ngOnInit(): void {
      this.clienteService.getHabilitedClientes().subscribe((response) => {   
        this.clientes = [];
        response.forEach((clienteData: any) => {
          this.clientes.push({
            id: clienteData.payload.doc.id,
            data: clienteData.payload.doc.data()
          });
        });
      });
    }
    

  onEdit(id :string, cliente: Cliente){
    this.clienteService.updateCliente(id,cliente) ;
  }


  onDelete($key: string){
    this.clienteService.removeCliente($key);
    this.clienteService.selectedCliente = new Cliente();
  }

  /**
   * Recibe la clave de un cliente, lo busca en la base de datos
   * y pone su atributo 'habilitado' en false
   * @param $key <- clave del cliente (string)
  */
  onInhabilite($key: string, cliente: any){
    this.clienteService.inhabiliteCliente($key, cliente);
    this.clienteService.selectedCliente = new Cliente();
  }
  

  chargeSelectedCliente(cliente: Cliente){
    this.clienteService.selectedCliente = cliente;
  }
  
}



