import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminListComponent } from './admin-list/admin-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
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
import { AddEditAdminComponent } from './admin-list/add-edit-admin/add-edit-admin.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { AddEditCompanyComponent } from './company-list/add-edit-company/add-edit-company.component';


@NgModule({
  declarations: [
    AdminListComponent,
    AddEditAdminComponent,
    CompanyListComponent,
    AddEditCompanyComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
export class AdminModule { }
