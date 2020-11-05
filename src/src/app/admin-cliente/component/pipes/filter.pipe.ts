import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === "" || arg.length < 3)
      return value;
    const resultCliente = [];

    for (const cliente of value) {
      if (cliente.nombre.toLowerCase().index(arg.toLowerCase()) > -1) {
        resultCliente.push(cliente);
      }
    }
    return resultCliente;
  }

}
