import { ICategoryEntity } from "./ICategoryEntity";

export interface IStockEntity{
    stockId: number,
    itemName:string,
    categoryOBJ:ICategoryEntity,
    materialColour:string,
    qty:number,
    purchasePrice:number,
    sellingPrice:number,
    reorderQty:number,
    arrivalData:string
}