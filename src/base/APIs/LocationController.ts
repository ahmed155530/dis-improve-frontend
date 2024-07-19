import { environment } from "environments/environment";

export const LocationController = {
    AddLocation: `${environment.BaseURL}/Location`,
    UpdateLocation: `${environment.BaseURL}/Location`,
    DeleteLocation: `${environment.BaseURL}/Location`,
    GetAllLocations: `${environment.BaseURL}/Location`,
}