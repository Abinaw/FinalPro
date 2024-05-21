import { IInvoiceEntity } from "./InvoiceEntity"

export interface IPaymentEntity{
    paymentId:number,
    paymentType: string,
    paidDate: string
    paidAmount:number,
    sellInvoice:IInvoiceEntity
    // purchaseInvoice :IPurchaseEntity
}