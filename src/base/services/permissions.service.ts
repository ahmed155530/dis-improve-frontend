import { Injectable } from '@angular/core';
import { LocalStorageEnum } from 'base/enums/LocalStorageEnum.enum';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(
    private permissionService: NgxPermissionsService
  ) { }

  AddPermissions(permission: string | string[]) {
    var permissions: string[] = [];
    if (typeof permission === 'string') {
      this.permissionService.addPermission(permission);
      permissions.push(permission);
    }
    if (typeof permission === 'object') {
      permission.forEach((x: string) => {
        this.permissionService.addPermission(x);
        permissions.push(x);
      });
    }
    localStorage.setItem(LocalStorageEnum.Roles, JSON.stringify(permissions));
  }

  LoadPermissions(permissions: string[]) {
    this.permissionService.loadPermissions(permissions);
  }

  RemovePermission(permission: string) {
    this.permissionService.removePermission(permission);
  }

  GetPermissions(): any {
    return this.permissionService.getPermissions();
  }

  GetPermission(permission: string): any {
    return this.permissionService.getPermission(permission);
  }

  CheckUserIfHasPermission(permission: string): Promise<boolean> {
    return this.permissionService.hasPermission(permission);
  }

}
