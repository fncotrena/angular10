import {AfterViewInit, Component,OnInit ,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ClienteService} from './../../clientes/clientes.service';
import {Cliente} from './../../clientes/model/cliente';
@Component({
  selector: 'app-tablec-baja',
  templateUrl: './tablec-baja.component.html',
  styleUrls: ['./tablec-baja.component.scss']
})
export class TablecBajaComponent implements OnInit {

 
  displayedColumns: string[] = ['Nombre', 'Apellido', 'Telefono','Direccion','action'];
  dataSource = new MatTableDataSource();


  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  @ViewChild(MatSort,{static:true})sort:MatSort;
  
  constructor( private clienteService: ClienteService) { }

  ngOnInit(): void {
  
    this.clienteService.getAllClientesDisabled().subscribe(clientes => this.dataSource.data=clientes);

}

/**
* @deprecated
*/
onDelete($key: string){
this.clienteService.removeCliente($key);
this.clienteService.selectedCliente = new Cliente();
}

/**
* Recibe la clave de un cliente, lo busca en la base de datos
* y pone su atributo 'habilitado' en true
* @param $key <- clave del cliente (string)
*/
onHabilite($key: string, cliente: any){
this.clienteService.habiliteCliente($key, cliente);
this.clienteService.selectedCliente = new Cliente();
}

chargeSelectedCliente(cliente: Cliente){
this.clienteService.selectedCliente = cliente;

}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
