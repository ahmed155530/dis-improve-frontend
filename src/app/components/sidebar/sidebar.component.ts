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
  { path: '/dashboard', title: 'sidebar.dashboard', icon: 'analytics', class: '', roles: [AuthRole.Admin, AuthRole.Collector], show: false },
  { path: '/admin/users/admins', title: 'sidebar.admins', icon: 'shield_person', class: '', roles: ['Admin'], show: false },
  { path: '/admin/users/companies', title: 'sidebar.companies', icon: 'source_environment', class: '', roles: ['Admin'], show: false },
  { path: '/admin/users/data-entry', title: 'sidebar.dataEntry', icon: 'database', class: '', roles: ['Admin'], show: false },
  { path: '/admin/users/data', title: 'sidebar.data', icon: 'description', class: '', roles: ['Admin'], show: false },
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
