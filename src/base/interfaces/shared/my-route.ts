import { Route } from "@angular/router";
import { AuthRole } from "base/enums/AuthRoles.enum";

export interface MyRoute extends Route {
    ACL?: AuthRole[];
    children?: MyRoute[];
  }