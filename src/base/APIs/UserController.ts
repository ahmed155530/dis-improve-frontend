import { environment } from "environments/environment";

export const UserController = {
    RegisterUser: `${environment.BaseURL}/User/register`,
    UpdateUser: `${environment.BaseURL}/User/update`,
    DeleteUser: `${environment.BaseURL}/User/delete`,
    GetAllUsers: `${environment.BaseURL}/User/all`,
}