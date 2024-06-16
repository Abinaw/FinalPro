import { IConfirmInvoiceEntity } from "./IConfirmInvoiceEntity"

export interface IConfirmInvoicePaymentEntity{
    paymentId:number,
    paymentType: string,
    paidDate: string
    paidAmount:number,
    confirmInvoiceOBJ:IConfirmInvoiceEntity,
    chequeRefNo:number,
    chequeDueDate:string,
    cardRefNo:number,
    isComplete:boolean
   
}