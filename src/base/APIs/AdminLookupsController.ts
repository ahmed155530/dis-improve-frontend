import { environment } from "environments/environment";

export const AdminLookupsController = {
    GetAllTopicCategories: `${environment.BaseURL}/AdminLookups/GetAllTopicCategories`,
    AddTopicCategory: `${environment.BaseURL}/AdminLookups/AddTopicCategory`,
    UpdateTopicCategory: `${environment.BaseURL}/AdminLookups/UpdateTopicCategory`,
    DeleteTopicCategory: `${environment.BaseURL}/AdminLookups/DeleteTopicCategory`,

    GetAllTopics: `${environment.BaseURL}/AdminLookups/GetAllTopics`,
    AddTopic: `${environment.BaseURL}/AdminLookups/AddTopic`,
    GetTopicDetails: `${environment.BaseURL}/AdminLookups/GetTopicDetails`,
    UpdateTopic: `${environment.BaseURL}/AdminLookups/UpdateTopic`,
    DeleteTopic: `${environment.BaseURL}/AdminLookups/DeleteTopic`,

    GetAllStationsSubscriptions: `${environment.BaseURL}/AdminLookups/GetAllStationsSubscriptions`,
    AddEditStationSubscription: `${environment.BaseURL}/AdminLookups/AddEditStationSubscription`,
    GetAllStations: `https://tdb.tatbeek.com/benaa/GetAllStations`,


    GetAllAdmins: `${environment.BaseURL}/AdminLookups/GetAllAdmins`,
    GetAllAppUsers: `${environment.BaseURL}/AdminLookups/GetAllAppUsers`,
    ExportAllAppUsers: `${environment.BaseURL}/AdminLookups/ExportAllAppUsers`,
    GetDashboardUsersCounts: `${environment.BaseURL}/AdminLookups/GetDashboardUsersCounts`,
}