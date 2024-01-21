import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActionPopComponent } from 'src/app/custom-components/action-cell/action-pop/action-pop.component';
import { VendorService } from 'src/app/service/vendor-service/vendor.service';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.css','../form-design.css']
})
export class VendorFormComponent {
    
    hide: boolean = true;
    allData: any;
    vendorForm: FormGroup;
   
   
    constructor(
        private vendorService:VendorService,
        private matDialog: MatDialog,
        private matDialogRef: MatDialogRef<VendorFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.vendorForm=new FormGroup({
            vendorId:new FormControl,
            vendorName:new FormControl(null,Validators.required),
            address:new FormControl(null,Validators.required),
            email:new FormControl(null,Validators.required),
            contact:new FormControl("cap@gmail.com",[Validators.required,Validators.email]),
        })
    }

   

    setDataIntoFormFields() {
       
        return this.vendorForm.setValue({
            vendorId:this.data.custData.custId,
            vendorName: this.data.custData.custName,
            contact:this.data.custData.contact,
            address:this.data.custData.address,
            email: this.data.custData.email,
        })
    }

    ngOnInit(): void {
       
        if (this.data.title === "Update") {
            this.setDataIntoFormFields()
        }
    }
    
    

    selectOperation() {
        if (this.data.title === "Insert") {
            this.insertPopTrigger();
           
        } else if (this.data.title == "Update"){
            this.updatePopTrigger();
        }
        
    }
    insertPopTrigger() {
       
        const extraData = {
            title: "Insert",
            subTitle: "are you sure you want to add this data?",
            userformData: this.vendorForm
        }
        const openActionPop = this.matDialog.open(ActionPopComponent, { data: extraData })
        openActionPop.afterClosed().subscribe((state:boolean) => {
            if(!state)return;
            this.vendorService.regiterReq(this.vendorForm.value).subscribe(res=>{
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
            this.vendorService.update(this.vendorForm.value).subscribe((res)=>{
                this.matDialogRef.close()
                console.log(res)
            })
        })

    }

}
