import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyUserRoutingModule } from './company-user-routing.module';
import { DataEntryListComponent } from './data-entry-list/data-entry-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxTranslateModule } from 'base/modules/ngx-translate.module';
import { ApproveDataEntryComponent } from './data-entry-list/approve-data-entry/approve-data-entry.component';
import { RejectDataEntryComponent } from './data-entry-list/reject-data-entry/reject-data-entry.component';


@NgModule({
  declarations: [
    DataEntryListComponent,
    ApproveDataEntryComponent,
    RejectDataEntryComponent
  ],
  imports: [
    CommonModule,
    CompanyUserRoutingModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatTabsModule,
    MatRadioModule,
    NgxTranslateModule,
    MatNativeDateModule,
    MatDatepickerModule
  ]
})
export class CompanyUserModule { }
