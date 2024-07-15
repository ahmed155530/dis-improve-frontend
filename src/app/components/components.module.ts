import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AngularCountriesFlagsModule } from 'angular-countries-flags'
import { NgxTranslateModule } from 'base/modules/ngx-translate.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularCountriesFlagsModule,
    NgxTranslateModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
