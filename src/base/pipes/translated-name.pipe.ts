import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from 'base/services/translation.service';

@Pipe({
  name: 'translated-name'
})
export class TranslatedNamePipe implements PipeTransform {

  lang: string = this.translationService.lang;
  constructor(
    private translationService: TranslationService
  ) {

  }
  transform(arg1: any, arg2: any): any {
    if (this.lang === 'ar')
      return arg1 ?? arg2;
    if (this.lang === 'en')
      return arg2 ?? arg1;
    return null;
  }

}
