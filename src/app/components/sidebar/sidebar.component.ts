import { BaseService } from 'base/services/base.service';
import { Component, Injector, OnInit } from '@angular/core';
import { LocalStorageEnum } from 'base/enums/LocalStorageEnum.enum';
import { AuthRole } from 'base/enums/AuthRoles.enum';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  roles: string[];
  show: boolean;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'sidebar.dashboard', icon: 'analytics', class: '', roles: [AuthRole.AdminUser], show: false },
  { path: '/admin/admin-list', title: 'sidebar.admins', icon: 'shield_person', class: '', roles: [AuthRole.AdminUser], show: false },
  { path: '/admin/location-list', title: 'sidebar.locations', icon: 'location_on', class: '', roles: [AuthRole.AdminUser], show: false },
  { path: '/admin/company-list', title: 'sidebar.companies', icon: 'source_environment', class: '', roles: [AuthRole.AdminUser], show: false },
  { path: '/admin/company-user-list', title: 'sidebar.companyUsers', icon: 'person_apron', class: '', roles: [AuthRole.AdminUser], show: false },
  { path: '/admin/data-entry-list', title: 'sidebar.dataEntry', icon: 'person_edit', class: '', roles: [AuthRole.AdminUser], show: false },
  { path: '/data-entry/data-list', title: 'sidebar.data', icon: 'database', class: '', roles: [AuthRole.DataEntryUser], show: false },
  { path: '/company-user/data-list', title: 'sidebar.data', icon: 'description', class: '', roles: [AuthRole.CompanyUser], show: false },
  { path: '/admin/configuration-list', title: 'sidebar.configurations', icon: 'settings', class: '', roles: [AuthRole.AdminUser], show: false },
  { path: '/admin/data-entry-characteristics-list', title: 'sidebar.dataEntryCharacteristics', icon: 'monitoring', class: '', roles: [AuthRole.AdminUser], show: false },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseService implements OnInit {
  menuItems: any[];
  roles: string[] = JSON.parse(localStorage.getItem(LocalStorageEnum.Roles));
  constructor(
    public override injector: Injector,
  ) {
    super(injector);
    console.log(this.roles);
  }

  ngOnInit() {
    document.body.dir = this.translationService.RetrieveDir();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.checkRole();
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  checkRole() {
    var exists: boolean[] = [];
    this.menuItems.forEach((element: RouteInfo) => {
      exists = [];
      element.roles.forEach((role: string) => {
        if (this.roles.includes(role))
          exists.push(true)
        else
          exists.push(false)
      });
      if (exists.includes(true))
        element.show = true;
      else
        element.show = false;
    });
  }

}
