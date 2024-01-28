import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActionPopComponent } from 'src/app/custom-components/action-cell/action-pop/action-pop.component';
import { StockService } from 'src/app/service/stock-service/stock.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css','../form-design.css']
})
export class StockFormComponent {
    stockForm: FormGroup;
    hide: boolean = true;
    allData: any;
   
    constructor(
        private stockService:StockService,
        private matDialog: MatDialog,
        private matDialogRef: MatDialogRef<StockFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.stockForm=new FormGroup({
            stockId:new FormControl,
            materialName:new FormControl("Bedsheet",[Validators.required,]),
            materialType:new FormControl("6X",Validators.required),
            materialColour:new FormControl("Blue",Validators.required),
            quantity:new FormControl(null,Validators.required),
            arrivalDate:new FormControl(null,Validators.required),
            remarks:new FormControl("Latest",Validators.required),
            purchasePrice:new FormControl(null,Validators.required),
            sellingPrice:new FormControl(null,Validators.required),
            reorderQty: new FormControl(20,Validators.required)
        })
    }

   

    setDataIntoFormFields() {
        
        return this.stockForm.setValue({
            stockId:this.data.stockData.stockId,
            materialName: this.data.stockData.materialName,
            materialType: this.data.stockData.materialType,
            materialColour: this.data.stockData.materialColour,
            arrivalDate: this.data.stockData.arrivalDate,
            remarks: this.data.stockData.remarks,
            purchasePrice: this.data.stockData.purchasePrice,
            sellingPrice: this.data.stockData.sellingPrice,
            reorderQty: this.data.stockData.reorderQty,
            quantity:this.data.stockData.quantity
        })
    }

    ngOnInit(): void {
        if (this.data.title === "Update") {
            this.setDataIntoFormFields()
        }
    }
    
    

    selectOperation() {
        if (this.data.title === "Insert" && this.stockForm.valid ) {
            this.insertPopTrigger();    
           
        } else if (this.data.title == "Update" && this.stockForm.valid){
            this.updatePopTrigger();
        }
        
    }
    insertPopTrigger() {
       
        const extraData = {
            title: "Insert",
            subTitle: "are you sure you want to add this data?",
        }
        const openActionPop = this.matDialog.open(ActionPopComponent, { data: extraData })
        openActionPop.afterClosed().subscribe((state:boolean) => {
            if(!state)return;
            this.stockService.regiterReq(this.stockForm.value).subscribe(res=>{
            console.log(res)
            this.matDialogRef.close()
        })
           
        })
        

    }

    updatePopTrigger() {
        const extraData = {
            title: this.data.title,
            subTitle: "are you sure you want to update the selected data?",
          
        }
        const openActionPop = this.matDialog.open(ActionPopComponent, { data: extraData })
        openActionPop.afterClosed().subscribe((state:boolean) => {
            if(!state)return;
            this.stockService.updateUserDetails(this.stockForm.value).subscribe((res)=>{
                this.matDialogRef.close()
                console.log(res)
            })
        })

    }

    //--------------- Form Validation------------------

    doNotAddSpace(control: FormControl) {
        if(control.value!= "" && control.value.indexOf(' ') != -1) {
            console.log( control)
            return control
            // return { noSpace: true };
        }else{
            return null;
        }
}
}
