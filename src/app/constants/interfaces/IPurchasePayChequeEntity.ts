
import {IConfirmPurchaseEntity} from './IConfirmPurchaseEntity'
export interface IPurchasePayChequeEntity{
    chequeRefNo:number,
    paidAmount:number,
    paidDate:string,
    chequeDueDate:string,
    paymentId:number,
    confirmPurchaseInvoiceOBJ:IConfirmPurchaseEntity;
}