import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductSelectionToCartComponent } from '../product-selection-to-cart/product-selection-to-cart.component';
import { StockService } from 'src/app/service/stock-service/stock.service';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { CetegoryService } from 'src/app/service/category-service/cetegory.service';
import { ProductSelectionToCartFormComponent } from '../product-selection-to-cart-form/product-selection-to-cart-form.component';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent,CellValueChangedEvent } from 'ag-grid-community';
import { ProductCartService } from 'src/app/service/productCart-service/product-cart.service';
import { InvoiceActionComponent } from 'src/app/custom-components/action-cell/invoice-action/invoice-action.component';
import { ProductCartActionComponent } from 'src/app/custom-components/action-cell/product-cart-action/product-cart-action.component';
import { ICellRendererParams } from 'ag-grid/dist/lib/rendering/cellRenderers/iCellRenderer';
import { InvoiceTemplateForCustomerComponent } from '../../invoice-template-for-customer/invoice-template-for-customer.component';
import { IProCartEntity } from '../../../constants/interfaces/IProCartEntity';
import { InvoiceService } from 'src/app/service/invoice-service/invoice.service';
import { IInvoiceEntity } from 'src/app/constants/interfaces/InvoiceEntity';


@Component({
  selector: 'app-selected-invoice',
  templateUrl: './selected-invoice.component.html',
  styleUrls: ['./selected-invoice.component.css']
})
export class SelectedInvoiceComponent  {
    
    customerName!:string;
    custId!:number;
    custContact!:number;
    invoiceId!: number;
    invoiceNumber!: number 
    jusData!:any
    totalNetAmount! : number 
    paidAmount!: number
    productCartItems!: IProCartEntity[]
    rowData$!: Observable<any[]>;
    invoiceData! :IInvoiceEntity[]
    @ViewChild(AgGridAngular)
    agGrid!: AgGridAngular
    gridApi: GridApi | any = {}
    public rowSelection: 'single' | 'multiple' = 'single';
    searchCharac : string=""
    params: any;
    
    
    constructor(
        private catService : CetegoryService,
        private stockService: StockService,
        private route:ActivatedRoute,
        private matDialog:MatDialog,
        private productCartService: ProductCartService,
        private cdr: ChangeDetectorRef ,
        private invoiceService: InvoiceService
    ){
        
        this.getAllStockAndCatData()
        this.totalNetAmount = 0
        this.route.queryParams.subscribe(params=>{
            let dataString = params['data']
           
            dataString = JSON.parse(dataString);
            this.invoiceData = dataString 
            this.invoiceId = dataString.tempInvoiceId;
            this.customerName = dataString.customerOBJ.custName
            this.custId = dataString.customerOBJ.custId
            this.custContact = dataString.customerOBJ.contact
            this.invoiceNumber = dataString.tempInvoiceNumber
            this.paidAmount = dataString.paidAmount
        })
        this.loadAllProductCart()
        this.getAllInvoiceData();
      
    }
    
  

    showInvoiceDetails(){
        const invoiceDta={
            invoiceDataParam:this.invoiceData
        }
        const openInvoice = this.matDialog.open(InvoiceTemplateForCustomerComponent,{
            data:invoiceDta,
            panelClass:"custom-dialog-container"
        })
        
        
    }
   
    
    public columnDef: ColDef[] = [
        
        
        { 
            field: "proCartId",
            colId:"proCartId",
            headerName:"Cart Row ID",
            width: 90, 
            hide: true
        },
        { 
            field: "stockOBJ",
            colId:"stockOBJ",
            headerName:"Product",
            valueFormatter:(params)=>{
                const combinedvalue = params.value.stockId+"-"+params.value.itemName
                return combinedvalue
            }
         },
         { 
            field: "quantity",
            colId:"quantity",
            headerName:"Qty",
            valueFormatter: (params) => {
                const val = (params.value.toFixed(2))
                return val
            }
         },
         { 
             field: "total",
             colId:"total",
             headerName:"Total",
             valueFormatter: (params) => {
                const val = (params.value.toFixed(2))
                return val
            }
         
         },
        { 
            field: "discount",
            colId:"discount",
            headerName:"Discount",
            valueFormatter: (params) => {
                const val = (params.value.toFixed(2))
                return val
            }
        
        },
        { 
            field: "netAmount",
            colId:"netAmount",
            headerName:"Net amount",
            valueFormatter: (params) => {
                const val = (params.value.toFixed(2))
                return val
            }
        },
        { 
            field: "tempInvoiceOBJ",
            colId:"tempInvoiceOBJ",
            headerName:"Invoice ID",
            valueFormatter:(params)=>{
                const combinedvalue = params.value.tempInvoiceNumber
                return combinedvalue
            },
            hide:true
            
        },
        // { 
        //     field: "confirmInvoiceOBJ",
        //     colId:"confirmInvoiceOBJ",
        //     headerName:"Confirm Invoice ID",
        //     valueFormatter:(params)=>{
        //         const combinedvalue = params.value.tempInvoiceNumber
        //         return combinedvalue
        //     },
        //     // hide:true
            
        // },
        {
            field:"action",
            headerName:"Action",
            cellRenderer:ProductCartActionComponent ,
             
        }
    ];
   
   
    onGridReady(param: GridReadyEvent) {
        this.rowData$ = this.getRowData();
        this.gridApi = param?.api
        this.addAllNetAmounts()
    }

    addAllNetAmounts(){
        this.getRowData().then((rowData: any[]) => {
            const netAmounts = rowData.map(row => row.netAmount);
            this.calculateTotalNetAmount(netAmounts)
            this.cdr.detectChanges();
        });
    }
    
    calculateTotalNetAmount(arrayOfAmounts:number[]){
        let total = 0
        arrayOfAmounts.forEach(element => {
            total += element   
            this.totalNetAmount+= element
        });
        this.totalNetAmount = total
    }
    
    loadAllProductCart(){
        this.productCartService.getAll(this.invoiceId).subscribe((cartData)=>{
           GLOBAL_LIST.PRODUCTCART_DATA =  cartData?.result?.[0]
        })
    }
      
 
    

    onCellClicked(cellClickedEvent: CellClickedEvent) {
       
      
    }

    private getRowData(): any {
        return new Promise((resolve) => {
            this.productCartService.getAll(this.invoiceId).subscribe((cartData) => {
                resolve(cartData.result[0]);
            }, (err) => {
                resolve([])
            })
        })
    }

  
    public setDataIntoRow() {       
        this.productCartService.getAll(this.invoiceId).subscribe((cartData) => {
            this.gridApi.setRowData(cartData.result[0]);
            GLOBAL_LIST.PRODUCTCART_DATA = cartData.result[0]
          }, (err) => {
          })
    }

    insertTrigger() {
        
     
        const extraData={
            title:"Add",
            selectedInvoiceId: this.invoiceId,
            customerId: this.custId,

        }
       
        // const showAvailableProducts = this.matDialog.open(ProductSelectionToCartComponent,{height:"30%",width:"100%"})
        // showAvailableProducts.afterClosed().subscribe(res=>{
           
        // })
        
        const addProductsForm = this.matDialog.open(ProductSelectionToCartFormComponent,{
            data:extraData,
            panelClass:"custom-dialog-container"})
         
            addProductsForm.afterClosed().subscribe(res=>{
          
            this.setDataIntoRow()
            this.getAllStockAndCatData()
            this.addAllNetAmounts()
            // console.log("after insertion " ,GLOBAL_LIST.PRODUCTCART_DATA)
           
        })
       
    }


    searchDataInRows()
    {
        // this.gridApi.setQuickFilter(this.searchCharac)
        if(this.searchCharac!==""){
        this.productCartService.findData(this.invoiceId,this.searchCharac).subscribe(response=>{
          this.gridApi.setRowData(response?.result) 
           });   
        }else if(this.searchCharac===""){
           this.setDataIntoRow()
        }
    }

    makePayment(){

    }


    getAllInvoiceData(){
        this.invoiceService.getAll().subscribe(invoiceData=>{
            GLOBAL_LIST.INVOICE_DATA=invoiceData
        })
    }
    getAllStockAndCatData() {
        this.stockService.getAll().subscribe(res => {
            GLOBAL_LIST.STOCK_DATA = res
        })

        this.catService.getAll().subscribe(res => {
            GLOBAL_LIST.CATEGORY_DATA = res
        })
        
    }

   
}
