import { environment } from 'environments/environment';

export const AdminSanitationUserController = {
    GetSanitationAppUsers: `${environment.BaseURL}/AdminSanitationUsers/GetSanitationAppUsers`,
    UpdateSanitationAppUser: `${environment.BaseURL}/AdminSanitationUsers/UpdateSanitationAppUser`,
    AddSanitationAppUser: `${environment.BaseURL}/AdminSanitationUsers/AddSanitationAppUser`,
    DeleteSanitationAppUser: `${environment.BaseURL}/AdminSanitationUsers/DeleteSanitationAppUser`,
}