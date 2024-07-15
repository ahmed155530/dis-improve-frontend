import { environment } from 'environments/environment';

export const AdminQualityControlUserController = {
    GetQualityControlAppUsers: `${environment.BaseURL}/AdminQualityControlUsers/GetQualityControlAppUsers`,
    UpdateQualityControlAppUser: `${environment.BaseURL}/AdminQualityControlUsers/UpdateQualityControlAppUser`,
    AddQualityControlAppUser: `${environment.BaseURL}/AdminQualityControlUsers/AddQualityControlAppUser`,
    DeleteQualityControlAppUser: `${environment.BaseURL}/AdminQualityControlUsers/DeleteQualityControlAppUser`,
}