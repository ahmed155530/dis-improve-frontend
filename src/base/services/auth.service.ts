import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRole } from 'base/enums/AuthRoles.enum';
import { LocalStorageEnum } from 'base/enums/LocalStorageEnum.enum';
import jwt_decode from "jwt-decode";
import { BehaviorSubject } from 'rxjs';
import { PermissionsService } from './permissions.service';
import { UserDTO } from 'base/models/shared/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: UserDTO = null;
  // logged in user
  public _loggedInUser: BehaviorSubject<UserDTO> = new BehaviorSubject<UserDTO>(null);
  public loggedInUser$ = this._loggedInUser.asObservable();
  constructor(
    private router: Router,
    private PermissionsService: PermissionsService
  ) {
    this.user = JSON.parse(localStorage.getItem(LocalStorageEnum.app_user));
    if (this.user) {
      this._loggedInUser.next(this.user);
    }
  }

  updateStoredUserInfo(userData: any) {
    let user = JSON.parse(localStorage.getItem(LocalStorageEnum.app_user));
    user.firstName = userData && userData.firstName ? userData.firstName : null;
    user.lastName = userData && userData.lastName ? userData.lastName : null;
    user.phoneNumber = userData && userData.phoneNumber ? userData.phoneNumber : null;
    if (userData.personalImagePath) {
      user.personalImagePath = userData.personalImagePath;
    }
    localStorage.setItem(LocalStorageEnum.app_user, JSON.stringify(user));

    this._loggedInUser.next(user);
  }

  updateStoredUserRoles(roles: string[]) {
    let user = JSON.parse(localStorage.getItem(LocalStorageEnum.app_user));
    user.userRoles = roles;
    localStorage.setItem(LocalStorageEnum.app_user, JSON.stringify(user));
    this._loggedInUser.next(user);
  }

  refreshToken(token: string) {
    let user = JSON.parse(localStorage.getItem(LocalStorageEnum.app_user));
    user.token = 'Bearer ' + token;
    localStorage.setItem(LocalStorageEnum.app_user, JSON.stringify(user));
    this._loggedInUser.next(user);
  }

  storeUserDateAndToken(token: any) {
    localStorage.setItem(LocalStorageEnum.Access_Token, token);
    this.DecodeToken();
  }

  StoreCompanyData(data: any) {
    localStorage.setItem(LocalStorageEnum.Company, JSON.stringify(data));
  }

  storeUserDate(data: any) {
    localStorage.setItem(LocalStorageEnum.app_user, JSON.stringify(data));
  }

  GetUserData(): any {
    if (localStorage.getItem(LocalStorageEnum.app_user))
      return JSON.parse(localStorage.getItem(LocalStorageEnum.app_user));
    else
      return null;
  }

  RemoveUserData() {
    localStorage.removeItem(LocalStorageEnum.app_user);
    localStorage.removeItem(LocalStorageEnum.Access_Token);
    localStorage.removeItem(LocalStorageEnum.Roles);
    localStorage.removeItem(LocalStorageEnum.UserName);
  }

  // logout
  logout() {
    this.user = null;
    this._loggedInUser.next(this.user);
    this.RemoveUserData();
    this.router.navigate(['/auth/login']);
  }

  // load the data
  loadToken() {
    if (localStorage.getItem('user') && JSON.parse(localStorage.getItem(LocalStorageEnum.app_user)).token) {
      this.user = JSON.parse(localStorage.getItem(LocalStorageEnum.app_user));
    }
  }

  // check the role
  roleMatch(allowedRoles: string[]): boolean {
    if (!localStorage.getItem(LocalStorageEnum.app_user)) {
      this.router.navigate(['/auth']);
      return false;
    }

    let isMatch = false;
    let userRoles: string[] = JSON.parse(localStorage.getItem(LocalStorageEnum.app_user)).userRoles;
    allowedRoles.forEach(
      elem => {
        if (userRoles.indexOf(elem) > -1) {
          isMatch = true;
          return false;
        }
        return true;
      });
    return isMatch;
  }

  DecodeToken() {
    var decoded: any = jwt_decode(localStorage.getItem(LocalStorageEnum.Access_Token));
    console.log(decoded);
    if (decoded) {
      var userDTO: UserDTO = {
        Username: decoded['UserName'],
        Id: decoded['UserId'],
        UserTypeId: Number(decoded['UserTypeId']),
        Email: decoded['Email'],
        FullName: decoded['Name'],
        PhoneNumber: decoded['PhoneNumber'],
        LocationId: Number(decoded['LocationId']),
        CompanyId: Number(decoded['CompanyId']),
      };
      this.user = userDTO;
      localStorage.setItem(LocalStorageEnum.app_user, JSON.stringify(this.user));
      this._loggedInUser.next(this.user);
      this.PermissionsService.AddPermissions(decoded['Roles'] ? decoded['Roles'] : '');
      console.log(this.PermissionsService.GetPermissions());
      this.PermissionsService.GetPermissions();
    }
  }

  UserHasRole(role: AuthRole): boolean {
    return this.GetCurrentRoles().find(r => r == role) != null;
  }

  public GetCurrentRoles(): AuthRole[] {
    if (localStorage.getItem(LocalStorageEnum.Roles)) {
      return JSON.parse(localStorage.getItem(LocalStorageEnum.Roles));
    }
    else {
      //this.router.navigateByUrl('/');
      return [];
    }
  }

}