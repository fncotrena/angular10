import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mascota } from './mascota';
import {ClienteService} from './../../../admin-cliente/component/clientes/clientes.service';
import { Cliente } from './.../../../../../admin-cliente/component/clientes/model/cliente';
import {Observable, of, from } from 'rxjs';
import { DatabaseService } from './databaseService';
import { map, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
    selectedMascota: Mascota = new Mascota();
    clienteService: ClienteService;
    clienteid: string ;
    cliente: Cliente;
    private mascotasCollection: AngularFirestoreCollection<Mascota>;

    constructor(private firestore: AngularFirestore,private afs: AngularFirestore,
                private docRef: DatabaseService

      ){
        this.mascotasCollection = afs.collection<Mascota>('mascotas');
    }

    public createMascota(mascota: Mascota) {
      this.docRef.col$('clientes', ref => ref.where('dni', '==', mascota.dni)).
      subscribe(respose =>{ respose.map (item => {
        
        this.clienteid=item.id;
        
      });
    }
    );
    
      //console.log("sssss"+this.ssss.toString);

      this.firestore.collection('clientes').doc(this.clienteid).collection('mascotas').add(mascota);
      return this.firestore.collection('mascotas')

        .add({

            nombre: mascota.nombre,
            fechaNacimiento: mascota.fechaNacimiento,
            especie: mascota.especie,
            raza : mascota.raza,
            peso: mascota.peso,
            genero: mascota.genero,
            fechaIngreso: mascota.fechaIngreso,

        });
        }

        
          public getMascota(mascota: Mascota) {
            return this.firestore.collection('mascotas').doc(mascota.$key).snapshotChanges();
          }
          public getMascotaById(id: any) {
            return this.firestore.collection('mascotas').doc(id.$key).snapshotChanges();
          }
          public getMascotas() {
            return this.firestore.collection('mascotas').snapshotChanges();
          }
          public removeMascota($key: string){
            return this.firestore.collection('mascotas').doc($key).delete();
          }

        
        /**
         * Retorna la lista de mascotas cuyo dni sea el mismo que el recibido
         * @param dni string (dni del dueño)
         * @deprecated
        */
        public getMascotaByDni(dni: string){
          return this.firestore.collection('mascotas', ref => ref.where('dni', '==', dni)).snapshotChanges();
        }


        /**
         * Retorna la lista de mascotas cuyo dni sea el mismo que el recibido
         * @param dni string (dni del dueño)
        */
        public getMascotasByDni(dni: string): Observable<Mascota[]> {
          return this.firestore.collection('mascotas', ref => ref.where('dni', '==', dni).orderBy('nombre','asc'))
          .snapshotChanges()
            .pipe(
              map(actions =>
                actions.map(a => {
                    
                  const data = a.payload.doc.data() as Mascota;
                  const id = a.payload.doc.id;
                  return { id, ...data };
                })
              )
            );
        
        }


    
  /**
   * actualiza una mascota  existente en firebase
   * @param id id de la coleccion en firebase
   * @param mascota mascota a actualizar
   */
    updateMascota(id: any, mascota: any){
    return this.firestore.collection('mascotas').doc(id).update(mascota);
  }


  /**
   * borrar un estudiante existente en firebase
   * @param id id de la coleccion en firebase
   */
  deleteMascota(id: any){
    return this.firestore.collection('mascotas').doc(id).delete();

  }
  public getAllMascota(): Observable<Mascota[]> {
    return this.mascotasCollection
    .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Mascota;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  
  }
  public getMascotaById2(id: any): Observable<Mascota> {
    return this.firestore.collection('mascotas').doc(id.$key).snapshotChanges().pipe(
      map(changes => {
        
        const data = changes.payload.data() as Mascota;
        const id = changes.payload.id;
        return { id, ...data };
      }));
  }
  
 


}


