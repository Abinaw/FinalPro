import { IConfirmInvoiceEntity } from "./IConfirmInvoiceEntity"

export interface IPaymentEntity{
    paymentId:number,
    paymentType: string,
    paidDate: string
    paidAmount:number,
    confirmInvoiceDto:IConfirmInvoiceEntity,
    chequeRefNo:number,
    chequeDueDate:string,
    cardRefNo:number,
    isComplete:boolean
   
}