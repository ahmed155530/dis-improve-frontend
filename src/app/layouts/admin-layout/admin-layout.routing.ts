import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { IconsComponent } from '../../icons/icons.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'admin', loadChildren: () => import('../../admin/admin.module').then(m => m.AdminModule) },
    { path: 'company-user', loadChildren: () => import('../../company-user/company-user.module').then(m => m.CompanyUserModule) },
    { path: 'data-entry', loadChildren: () => import('../../data-entry/data-entry.module').then(m => m.DataEntryModule) },
    { path: 'errors', loadChildren: () => import('../../error/error.module').then(m => m.ErrorModule) },
    { path: '**', loadChildren: () => import('../../error/error.module').then(m => m.ErrorModule) },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'icons', component: IconsComponent },
];
