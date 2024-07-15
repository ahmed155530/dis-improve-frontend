import { environment } from "environments/environment";

export const AdminInvoicesController = {
    GetPaymentTransactions: `${environment.BaseURL}/AdminInvoices/GetPaymentTransactions`,
    GetInvoices: `${environment.BaseURL}/AdminInvoices/GetInvoices`,
    UpdateInvoiceCash: `${environment.BaseURL}/AdminInvoices/UpdateInvoiceCash`,
    UpdateInvoiceExempted: `${environment.BaseURL}/AdminInvoices/UpdateInvoiceExempted`,
}