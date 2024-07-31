import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, MaxValidator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
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
        private toastr : ToastrService,
        private custService:CustomerService,
        private matDialog: MatDialog,
        private matDialogRef: MatDialogRef<CustomerFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.custForm=new FormGroup({
            custId:new FormControl,
            custName:new FormControl(null,Validators.required),
            contact:new FormControl(null,[
                Validators.required,
                Validators.pattern(/[0-9\+\-\ ]/),
                Validators.minLength(10),
                Validators.maxLength(10)
              ]),
            address:new FormControl(null,Validators.required),
            email:new FormControl(null,[Validators.required,Validators.email]),
        })
        
    }

   

    setDataIntoFormFields() {
       
        return this.custForm.setValue({
            custId:this.data.custData.custId,
            custName: this.data.custData.custName,
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
        if (this.data.title === "Insert" && this.custForm.valid) {
            this.insertPopTrigger();
           
        } else if (this.data.title == "Update" && this.custForm.valid){
            this.updatePopTrigger();
        }
        else{
            this.toastr.warning("Enter a valid data to "+ this.data.title)
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
            this.custService.regiterReq(this.custForm.value).subscribe(res=>{
           
            this.matDialogRef.close()
            console.log(res)
            if(res.successMessage!=null){
                this.toastr.success(res.successMessage)
            }else if(res.successMessage==null){
                this.toastr.error(res.errors)
            }
            
        })
           
        })
        

    }

    updatePopTrigger() {
        console.log(this.custForm.controls['contact'].status)
        const extraData = {
            title: this.data.title,
            subTitle: "are you sure you want to update the selected data?",
          
        }
        const openActionPop = this.matDialog.open(ActionPopComponent, { data: extraData })
        openActionPop.afterClosed().subscribe((state:boolean) => {
            if(!state)return;
            this.custService.update(this.custForm.value).subscribe((res)=>{
                this.matDialogRef.close()
                this.toastr.success(res)
            })
        })

    }

}
