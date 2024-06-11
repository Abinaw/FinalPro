import { IVendorEntity } from "./IVendorEntity";

export interface ITempPurchaseInvoice{
    purchaseId:number,
    purchaseInvoiceNO:number,
    purchasedDate:string,
    netAmount:number,
    vendorOBJ:IVendorEntity,
    isComplete:boolean
}