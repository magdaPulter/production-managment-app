import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idTag',
  standalone: true,
})
export class IdTagPipe implements PipeTransform {
  transform(value: string, name: string): string {
    const idCode: string = value.slice(-3).toUpperCase();
    const letterCode: string = name
      .replace(/[aeiouAEIOU]/g, '')
      .slice(0, 3)
      .toLowerCase();

    return `${idCode}-${letterCode}`;
  }
}
