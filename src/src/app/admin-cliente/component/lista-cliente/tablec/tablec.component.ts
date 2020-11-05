import {AfterViewInit, Component,OnInit ,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ClienteService} from './../../clientes/clientes.service';
import {Cliente} from './../../clientes/model/cliente';
@Component({
  selector: 'app-tablec',
  templateUrl: './tablec.component.html',
  styleUrls: ['./tablec.component.scss']
})
export class TablecComponent implements OnInit,AfterViewInit{

  displayedColumns: string[] = ['Nombre', 'Apellido', 'Telefono','Direccion','action'];
  dataSource = new MatTableDataSource();


  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  @ViewChild(MatSort,{static:true})sort:MatSort;
  
  constructor( private clienteService: ClienteService) { }

  ngOnInit():  void {
    this.clienteService.getAllClientesEnable().subscribe(clientes => this.dataSource.data=clientes);

  }
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    chargeSelectedCliente(cliente :Cliente){
      this.clienteService.selectedCliente = cliente;
    }
    onEdit(id :string  ,cliente: Cliente){
    
      this.clienteService.updateCliente(id,cliente) ;
    }
  
    onDelete($key: string){
      this.clienteService.removeCliente($key);
    }

    /**
   * Recibe la clave de un cliente, lo busca en la base de datos
   * y pone su atributo 'habilitado' en false
   * @param $key <- clave del cliente (string)
  */
 onInhabilite($key: string, cliente: any){

  if (window.confirm("Desea dar de baja a "+cliente.nombre+" "+cliente.apellido+"?")){
  this.clienteService.inhabiliteCliente($key, cliente);
  this.clienteService.selectedCliente = new Cliente();}
}



  
}

