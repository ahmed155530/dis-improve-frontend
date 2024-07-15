import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthRole } from 'base/enums/AuthRoles.enum';
import { MyRoute } from 'base/interfaces/shared/my-route';
import { AuthService } from 'base/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let ACL: Array<AuthRole> = (route.routeConfig as MyRoute).ACL;
    if (ACL) {
      let canActivate: boolean = false;
      for (let i = 0; i < ACL.length; i++) {
        let role = ACL[i];
        if (this.authService.UserHasRole(role)) {
          canActivate = true;
          break;
        }
      }
      if (canActivate){
        return true;
      }
      else {
        this.router.navigate(['/errors/403']);
        return false;
      }
    }
    return true;
  }
}
