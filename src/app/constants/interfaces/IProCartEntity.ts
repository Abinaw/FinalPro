import { IStockEntity } from "./IStockEntity";
import { IInvoiceEntity } from "./InvoiceEntity";

export interface IProCartEntity{
    proCartId:number,
    stockOBJ:IStockEntity,
    quantity: number,
    discount:number,
    total:number,
    netAmount:number,
    tempInvoiceOBJ:IInvoiceEntity,
}