import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ErrorModule } from './error/error.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { HasRoleDirective } from 'base/directives/has-role.directive';
import { getPaginatorIntl } from 'base/models/shared/paginator-intl';
import localeEg from '@angular/common/locales/ar-EG';
import { BaseService } from 'base/services/base.service';
// export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

registerLocaleData(localeEg);
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AuthModule,
    MatDialogModule,
    NgxSpinnerModule.forRoot({ type: 'ball-climbing-dot' }),
    NgxPermissionsModule.forRoot(),
    ErrorModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  providers: [
    DatePipe,
    MatDialog,
    { provide: MatPaginatorIntl, useValue: getPaginatorIntl() },
    {
      provide: localeEg,
      useValue: 'ar-EG',
      deps: [BaseService]
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}