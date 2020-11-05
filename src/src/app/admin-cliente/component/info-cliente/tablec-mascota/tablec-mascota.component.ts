import {AfterViewInit, Component, OnInit , ViewChild, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ClienteService} from '../../clientes/clientes.service';
import {Cliente} from '../../clientes/model/cliente';
import { MascotaService } from '../../../../admin-paciente/component/model/mascota.service';
import { Mascota } from 'src/app/admin-paciente/component/model/mascota';
import { DatabaseService } from './../../../../admin-paciente/component/model/databaseService';

@Component({
  selector: 'app-tablec-mascota',
  templateUrl: './tablec-mascota.component.html',
  styleUrls: ['./tablec-mascota.component.scss']
})
export class TablecMascotaComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['Nombre', 'Especie', 'Raza', 'action'];
  dataSource = new MatTableDataSource();
  cliente: Cliente;
  id:string ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true})sort: MatSort;

  constructor( private clienteService: ClienteService, private mascotaService: MascotaService, private docRef: DatabaseService) { }

  ngOnInit(): void
  {  this.cliente = this.clienteService.selectedCliente;
    console.log(this.cliente.dni);
    //obtener el id del documento;
    this.docRef.col$('clientes', ref => ref.where('dni', '==', this.cliente.dni)).
    subscribe(respose =>{ respose.map (item => {
      //carga 
      this.clienteService.getMascotasDelCliente(item.id).subscribe(pets=>this.dataSource.data=pets);
    
    });
  }
  );
 ////

  }
// this.dataSource.data=mascotas
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  chargeSelectedCliente(cliente: Cliente){
    this.clienteService.selectedCliente = cliente;
  }

  chargeSelectedMascota(mascota: Mascota){
    this.mascotaService.selectedMascota = mascota;
  }

  selectFichaClinica(mascota: Mascota){
    this.mascotaService.selectedMascota = mascota;
  }
  onEdit(id: string  , cliente: Cliente){
    this.clienteService.updateCliente(id, cliente) ;
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
    this.clienteService.inhabiliteCliente($key, cliente);
    this.clienteService.selectedCliente = new Cliente();
  }




}
