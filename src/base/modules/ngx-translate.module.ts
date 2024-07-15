import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslatedNamePipe } from 'base/pipes/translated-name.pipe';
import { EgyCurrencyPipe } from 'base/pipes/egy-currency.pipe';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    TranslateModule,
    TranslatedNamePipe,
    EgyCurrencyPipe
  ],
  declarations: [TranslatedNamePipe, EgyCurrencyPipe]
})
export class NgxTranslateModule { }
