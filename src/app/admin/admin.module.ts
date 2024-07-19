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
import { DataEntryListComponent } from './data-entry-list/data-entry-list.component';
import { AddEditDataEntryComponent } from './data-entry-list/add-edit-data-entry/add-edit-data-entry.component';
import { CompanyUserListComponent } from './company-user-list/company-user-list.component';
import { AddEditCompanyUserComponent } from './company-user-list/add-edit-company-user/add-edit-company-user.component';
import { LocationListComponent } from './location-list/location-list.component';
import { AddEditLocationComponent } from './location-list/add-edit-location/add-edit-location.component';
import { ConfigurationListComponent } from './configuration-list/configuration-list.component';
import { AddEditConfigurationComponent } from './configuration-list/add-edit-configuration/add-edit-configuration.component';
import { DataEntriesCharacteristicsListComponent } from './data-entries-characteristics-list/data-entries-characteristics-list.component';


@NgModule({
  declarations: [
    AdminListComponent,
    AddEditAdminComponent,
    CompanyListComponent,
    AddEditCompanyComponent,
    DataEntryListComponent,
    AddEditDataEntryComponent,
    CompanyUserListComponent,
    AddEditCompanyUserComponent,
    LocationListComponent,
    AddEditLocationComponent,
    ConfigurationListComponent,
    AddEditConfigurationComponent,
    DataEntriesCharacteristicsListComponent
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
