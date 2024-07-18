import { environment } from "environments/environment";

export const CompanyController = {
    AddCompany: `${environment.BaseURL}/Company`,
    UpdateCompany: `${environment.BaseURL}/Company`,
    GetAllCompanies: `${environment.BaseURL}/Company`,
    DeleteCompany: `${environment.BaseURL}/Company`,
    GetCompanyById: `${environment.BaseURL}/Company`,
}