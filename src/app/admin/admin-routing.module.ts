import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminListComponent } from './admin-list/admin-list.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { DataEntryListComponent } from './data-entry-list/data-entry-list.component';
import { CompanyUserListComponent } from './company-user-list/company-user-list.component';
import { LocationListComponent } from './location-list/location-list.component';
import { ConfigurationListComponent } from './configuration-list/configuration-list.component';

const routes: Routes = [
  {
    path: 'admin-list',
    component: AdminListComponent
  },
  {
    path: 'location-list',
    component: LocationListComponent
  },
  {
    path: 'company-list',
    component: CompanyListComponent
  },
  {
    path: 'company-user-list',
    component: CompanyUserListComponent
  },
  {
    path: 'data-entry-list',
    component: DataEntryListComponent
  },
  {
    path: 'configuration-list',
    component: ConfigurationListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
