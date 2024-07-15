import { environment } from "environments/environment";

export const AuthenticationController = {
    RegisterBOUser: `${environment.BaseURL}/AdminAuthentication/RegisterBOUser`,
    LoginAdmin: `${environment.BaseURL}/AdminAuthentication/LoginAdmin`,
}