import { Component, OnInit,Input } from '@angular/core';
import { ClienteService } from '../clientes/clientes.service';
import { Cliente } from '../clientes/model/cliente';
import { MascotaService } from '../../../admin-paciente/component/model/mascota.service'



@Component({
  selector: 'app-info-cliente',
  templateUrl: './info-cliente.component.html',
  styleUrls: ['./info-cliente.component.scss']
})
export class InfoClienteComponent implements OnInit {

  cliente: Cliente;//Cliente que se cargara con la información
  public mascotas = []; //lista de mascotas asociadas al cliente
  
  constructor(private clienteService: ClienteService, private mascotaService: MascotaService) { }

  ngOnInit(): void {
    this.cliente = this.clienteService.selectedCliente;

    this.mascotaService.getMascotaByDni(this.cliente.dni).subscribe((response) => {   
      this.mascotas = [];
      response.forEach((mascotaData: any) => {
        this.mascotas.push({
          id: mascotaData.payload.doc.id,
          data: mascotaData.payload.doc.data()
        });
      });
    });
  }

  
}
