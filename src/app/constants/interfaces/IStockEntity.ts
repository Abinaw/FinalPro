import { ICategoryEntity } from "./ICategoryEntity";

export interface IStockEntity{
qtyFormatted: any;
    stockId: number,
    itemName:string,
    categoryOBJ:ICategoryEntity,
    materialColour:string,
    quantity:number,
    purchasePrice:number,
    sellingPrice:number,
    reorderQty:number,
    arrivalDate:string
}