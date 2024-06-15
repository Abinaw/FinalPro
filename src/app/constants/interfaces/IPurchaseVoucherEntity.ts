import { IConfirmPurchaseEntity } from "./IConfirmPurchaseEntity";

export interface IPurchaseVoucherEntity{
    receiptId:number,
    confirmPurchaseOBJ:IConfirmPurchaseEntity,
    paidAmount:number,
    paidDate:string,
    paymentType:string
}