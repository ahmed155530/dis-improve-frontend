import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { Error403Component } from './error403/error403.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxTranslateModule } from 'base/modules/ngx-translate.module';
import { Error404Component } from './error404/error404.component';


@NgModule({
  declarations: [
    Error403Component,
    Error404Component
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    NgxTranslateModule,
  ]
})
export class ErrorModule { }
