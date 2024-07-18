import { environment } from "environments/environment";

export const AuthenticationController = {
    Login: `${environment.BaseURL}/Auth/Login`,
    ChangePassword: `${environment.BaseURL}/Auth/change-password`,
}