import { environment } from "environments/environment";

export const AdminDashboardController = {
    GetZoneCounts: `${environment.BaseURL}/AdminDashboard/GetZoneCounts`,
    GetAllByZoneId: `${environment.BaseURL}/AdminDashboard/GetAllByZoneId`,
}