import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataEntryListComponent } from './data-entry-list/data-entry-list.component';

const routes: Routes = [
  {
    path: 'data-list',
    component: DataEntryListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyUserRoutingModule { }
