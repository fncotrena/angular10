import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { Mascota } from 'src/app/admin-paciente/component/model/mascota';

@Pipe({
  name: 'filtroMascota'
})
export class FiltroMascotaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    
    for(const post of value){
      if(post.nombre.indexOf(arg) > -1){
         resultPosts.push(post);
      };
    };
    return resultPosts;
  }


}

