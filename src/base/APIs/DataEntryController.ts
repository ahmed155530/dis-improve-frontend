import { environment } from "environments/environment";

export const DataEntryController = {
    AddDataEntry: `${environment.BaseURL}/DataEntries/AddDataEntry`,
    AcceptDataEntry: `${environment.BaseURL}/DataEntries/ApproveData`,
    RejectDataEntry: `${environment.BaseURL}/DataEntries/RejectDataEntry`,
    CompleteDataEntry: `${environment.BaseURL}/DataEntries/CompleteData`,
    GetAllByUserId: `${environment.BaseURL}/DataEntries/GetAllByUserId`,
    GetAllByLocationId: `${environment.BaseURL}/DataEntries/GetAllByLocationId`,
    GetAllByCompanyId: `${environment.BaseURL}/DataEntries/GetAllByCompanyId`,
    DeleteDataEntry: `${environment.BaseURL}/DataEntries`,
    UpdateDataEntry: `${environment.BaseURL}/DataEntries`,
}