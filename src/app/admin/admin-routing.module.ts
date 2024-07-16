import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminListComponent } from './admin-list/admin-list.component';
import { CompanyListComponent } from './company-list/company-list.component';

const routes: Routes = [
  {
    path: 'admin-list',
    component: AdminListComponent
  },
  {
    path: 'company-list',
    component: CompanyListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
