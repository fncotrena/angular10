import { Injectable } from '@angular/core';
import { Cliente } from './model/cliente';
import {Observable, of, from } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Mascota} from './../../../admin-paciente/component/model/mascota';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  cliente : Cliente = new Cliente();
  selectedCliente: Cliente = new Cliente();
 
  private clientesCollection: AngularFirestoreCollection<Cliente>;

  constructor(private firestore: AngularFirestore ,private afs: AngularFirestore ) { 
   
    this.clientesCollection = afs.collection<Cliente>('clientes');

  }
   //Crea un nuevo cliente y lo agrega a la base de datos
   public createCliente(cliente: Cliente) {
    return this.firestore.collection('clientes')
      .add({
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        dni: cliente.dni,
        telefono: cliente.telefono,
        mail: cliente.mail,
        direccion: cliente.direccion,
        habilitado: true,
      });
    }


  //Obtiene un cliente de la base de datos en base a su id
  public getCliente(cliente: Cliente) {
    this.selectedCliente = cliente;
    return this.firestore.collection('clientes').doc(cliente.$key).snapshotChanges();
  }

  public getClienteById (id: any) {
    return this.firestore.collection('clientes').doc(id.$key).snapshotChanges();
  }

  //Obtiene todos los clientes de la base de datos
 // public getClientes() {
  //7  return this.firestore.collection('clientes').snapshotChanges();
 // }

  public getHabilitedClientes() {
    return this.firestore.collection('clientes', ref => ref.where('habilitado', '==', true).orderBy('nombre','asc')).snapshotChanges();
  }

  public getInhabilitedClientes(){
    return this.firestore.collection('clientes', ref => ref.where('habilitado', '==', false).orderBy('nombre','asc')).snapshotChanges();
  }

  public getClienteByDni(cliente: Cliente){
    return this.firestore.collection('clientes', ref => ref.where('dni', '==', cliente.dni).limit(1)).snapshotChanges();
  }

/**
   * actualiza una mascota  existente en firebase
   * @param id id de la coleccion en firebase
   * @param cliente cliente a actualizar
   */
  updateCliente(id:any, cliente:any){
    return this.firestore.collection('clientes').doc(id).update(cliente);
  }

  /**
   * recibe la clave de un cliente, lo busca y remueve de la base de dato
   * @param $key id del documento a remover en firebase
  */
  public removeCliente($key: string){
    return this.firestore.collection('clientes').doc($key).delete();
  }


  public inhabiliteCliente($key: string, cliente: any){
    return this.firestore.collection('clientes').doc($key).set({
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      dni: cliente.dni,
      telefono: cliente.telefono,
      mail: cliente.mail,
      direccion: cliente.direccion,
      habilitado: false
    });
  }

  public habiliteCliente($key: string, cliente: any){
    return this.firestore.collection('clientes').doc($key).set({
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      dni: cliente.dni,
      telefono: cliente.telefono,
      mail: cliente.mail,
      direccion: cliente.direccion,
      habilitado: true
    });
  }

  
  public getAllclientes(): Observable<Cliente[]> {
    return this.clientesCollection
    .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Cliente;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  
  }

  public getAllClientesEnable(): Observable<Cliente[]> {
    return this.firestore.collection('clientes', ref => ref.where('habilitado', '==', true).orderBy('nombre','asc'))
    .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Cliente;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  
  }


  public getAllClientesDisabled(): Observable<Cliente[]> {
    return this.firestore.collection('clientes', ref => ref.where('habilitado', '==', false).orderBy('nombre','asc'))
    .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Cliente;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  
  }

  public getMascotasDelCliente($key: any): Observable <Mascota[]> {
    //  /clientes/oY9WYhWRDc6uWFrA6Dri/mascotas
    return this.firestore.collection('clientes').doc($key).collection('mascotas').snapshotChanges()
      
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



}
