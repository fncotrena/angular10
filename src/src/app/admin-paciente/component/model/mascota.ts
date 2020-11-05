import { firestore } from 'firebase';

export class Mascota {
    $key: string;
    nombre: string;
    fechaNacimiento: firestore.Timestamp;
    dni:string;
    especie: string;
    raza: string;
    peso: Number;
    genero: string;
    fechaIngreso:  firestore.Timestamp;
    //genero: string;
   // 
   // peso: string;
   // tamanio: string;
   // chip: string;
  //  fechaIngreso: string;
}

