import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActionPopComponent } from 'src/app/custom-components/action-cell/action-pop/action-pop.component';
import { CustomerService } from 'src/app/service/customer-service/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css','../form-design.css']
})
export class CustomerFormComponent {
    custForm: FormGroup;
    hide: boolean = true;
    allData: any;
   
   
    constructor(
        private custService:CustomerService,
        private matDialog: MatDialog,
        private matDialogRef: MatDialogRef<CustomerFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.custForm=new FormGroup({
            custId:new FormControl,
            custName:new FormControl(null,Validators.required),
            contact:new FormControl(null,Validators.required),
            address:new FormControl(null,Validators.required),
            email:new FormControl("cap@gmail.com",[Validators.required,Validators.email]),
        })
    }

   

    setDataIntoFormFields() {
        return this.custForm.setValue({
            custId:this.data.userdata.userId,
            custName: this.data.userdata.username,
            address:this.data.userdata.address,
            email: this.data.userdata.email,
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
            userformData: this.custForm
        }
        const openActionPop = this.matDialog.open(ActionPopComponent, { data: extraData })
        openActionPop.afterClosed().subscribe((state:boolean) => {
            if(!state)return;
            this.custService.regiterReq(this.custForm.value).subscribe(res=>{
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
            this.custService.update(this.custForm.value).subscribe((res)=>{
                this.matDialogRef.close()
                console.log(res)
            })
        })

    }

}
