import { ICustomerEntity } from "./interfaces/CustomerEntity";
import { ICategoryEntity } from "./interfaces/ICategoryEntity";
import { IPaymentEntity } from "./interfaces/IPaymentEntity";
import { IStockEntity } from "./interfaces/IStockEntity";
import { ITempPurchaseInvoice } from "./interfaces/ITempPurchaseInvoiceEntity";
import { IVendorEntity } from "./interfaces/IVendorEntity";
import { IInvoiceEntity } from "./interfaces/InvoiceEntity";
import { ITempPurchaseCartEntity } from "./interfaces/ITempPurchaseCartEntity";
export const GLOBAL_LIST={
    CUSTOMER_DATA:[] as ICustomerEntity[],
    INVOICE_DATA:[] as IInvoiceEntity[],
    CATEGORY_DATA:[] as ICategoryEntity[],
    STOCK_DATA:[] as IStockEntity[],
    PRODUCTCART_DATA:[] ,
    PAYMENTS_DATA:[] as IPaymentEntity[],
    VENDOR_DATA:[] ,
    TEMPPURCHASE_DATA:[] as ITempPurchaseInvoice[],
    TEMP_PURCHASE_CART_DATA:[] as ITempPurchaseCartEntity[]
}