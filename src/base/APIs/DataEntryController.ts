import { environment } from "environments/environment";

export const DataEntryController = {
    AddDataEntry: `${environment.BaseURL}/DataEntries/AddDataEntry`,
    AcceptDataEntry: `${environment.BaseURL}/DataEntries/AcceptDataEntry`,
    RejectDataEntry: `${environment.BaseURL}/DataEntries/RejectDataEntry`,
    CompleteDataEntry: `${environment.BaseURL}/DataEntries/CompleteDataEntry`,
    GetAllByUserId: `${environment.BaseURL}/DataEntries/GetAllByUserId`,
}