import { ICustomerEntity } from "./CustomerEntity"

export interface IConfirmInvoiceEntity{
    confirmInvoiceId:number,
    netAmount: number,
    date: string
    paidAmount:number,
    customerOBJ:ICustomerEntity,
    invoiceNumber:number,
    isComplete:boolean
   
}