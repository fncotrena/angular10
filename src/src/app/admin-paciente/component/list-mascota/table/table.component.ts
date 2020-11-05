import {AfterViewInit, Component,OnInit ,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MascotaService} from './../../model/mascota.service';
import {Mascota} from './../../model/mascota';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['nombre', 'raza', 'especie','peso','fecha-ingreso','fecha-nacimiento','action'];
  dataSource = new MatTableDataSource();


  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  @ViewChild(MatSort,{static:true})sort:MatSort;
  
  constructor( private mascotaService: MascotaService) { }

  ngOnInit():  void {
    this.mascotaService.getAllMascota().subscribe(mascotas => this.dataSource.data=mascotas
                 
      );

  }
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }


    
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    
    chargeSelectedMascota(mascota :Mascota){
      this.mascotaService.selectedMascota = mascota;
    }

  
    onEdit(id :string  ,mascota: Mascota){
    
      this.mascotaService.updateMascota(id,mascota) ;
    }

    selectFichaClinica(mascota: Mascota){
      this.mascotaService.selectedMascota = mascota;
    }
  
    onDelete($key: string){
      this.mascotaService.removeMascota($key);
    }
  
  
  
}
