
import {IConfirmPurchaseEntity} from './IConfirmPurchaseEntity'
export interface IPurchasePayChequeEntity{
    daysLeft: number;
    chequeRefNo:number,
    paidAmount:number,
    paidDate:string,
    chequeDueDate:string,
    paymentId:number,
    confirmPurchaseInvoiceOBJ:IConfirmPurchaseEntity;
}