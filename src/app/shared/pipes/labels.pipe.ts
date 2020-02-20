import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labels'
})
export class LabelsPipe implements PipeTransform {

  transform(value: string, funcionality: string, language: string, file: object): string {
    if (file &&
      file[language] &&
      file[language][funcionality] &&
      file[language][funcionality] &&
      file[language][funcionality][value]) {
      return file[language][funcionality][value];
    } else {
      return '';
    }
  }

}
