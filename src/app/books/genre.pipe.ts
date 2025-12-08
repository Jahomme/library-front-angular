import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genre',
  standalone: true,
})
export class GenrePipe implements PipeTransform {

  transform(value: string) {
    const formattedValue = value.replaceAll('_', ' ');

    return formattedValue;
  }
}
