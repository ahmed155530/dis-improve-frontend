import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminListComponent } from './admin-list/admin-list.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { DataEntryListComponent } from './data-entry-list/data-entry-list.component';

const routes: Routes = [
  {
    path: 'admin-list',
    component: AdminListComponent
  },
  {
    path: 'company-list',
    component: CompanyListComponent
  },
  {
    path: 'data-entry-list',
    component: DataEntryListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
