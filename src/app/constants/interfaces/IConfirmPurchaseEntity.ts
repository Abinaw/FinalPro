import { IVendorEntity } from "./IVendorEntity"

export interface IConfirmPurchaseEntity{
    confirmPurchaseId:number,
    purchaseInvoice: number,
    purchaseDate: string
    paidAmount:number,
    vendorOBJ:IVendorEntity,
    totalAmount:number,
    isComplete:boolean
}