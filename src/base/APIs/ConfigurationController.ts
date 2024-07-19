import { environment } from "environments/environment";

export const ConfigurationController = {
    AddConfiguration: `${environment.BaseURL}/RequestTimeConfiguration`,
    UpdateConfiguration: `${environment.BaseURL}/RequestTimeConfiguration`,
    GetAllConfigurations: `${environment.BaseURL}/RequestTimeConfiguration`,
    DeleteConfiguration: `${environment.BaseURL}/RequestTimeConfiguration`,
    GetConfigurationById: `${environment.BaseURL}/RequestTimeConfiguration`,
}