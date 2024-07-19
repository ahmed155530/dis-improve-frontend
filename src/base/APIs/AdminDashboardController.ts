import { environment } from "environments/environment";

export const AdminDashboardController = {
    GetZoneCounts: `${environment.BaseURL}/AdminDashboard/GetZoneCounts`,
    GetAllByZoneId: `${environment.BaseURL}/AdminDashboard/GetAllByZoneId`,
    GetKPIsZoneCounts: `${environment.BaseURL}/AdminDashboard/GetKPIsZoneCounts`,
}