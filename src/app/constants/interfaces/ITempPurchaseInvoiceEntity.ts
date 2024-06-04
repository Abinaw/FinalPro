import { IVendorEntity } from "./IVendorEntity";

export interface ITempPurchaseInvoice{
    purchaseId:number,
    purchaseInvoiceNO:number,
    purchasedDate:string,
    totalAmount:number,
    vendorOBJ:IVendorEntity,
}