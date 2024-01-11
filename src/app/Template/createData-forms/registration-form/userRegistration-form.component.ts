import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, PatternValidator, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GridApi, ICellRendererParams } from 'ag-grid';
import { ActionPopComponent } from 'src/app/custom-components/action-cell/action-pop/action-pop.component';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
    selector: 'app-user-registration',
    templateUrl: './userRegistration-form.html',
    styleUrls: ['./userRegistration-form.css','../form-design.css']
})
export class UserRegistrationForm implements OnInit {
    userForm: FormGroup;
    hide: boolean = true;
    allData: any;
   
    constructor(
        private userService:UserService,
        private matDialog: MatDialog,
        private matDialogRef: MatDialogRef<UserRegistrationForm>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.userForm=new FormGroup({
            userId:new FormControl,
            firstname:new FormControl(null,[Validators.required,]),
            lastname:new FormControl(null,Validators.required),
            username:new FormControl(null,Validators.required),
            gender:new FormControl("male",Validators.required),
            role:new FormControl(null,Validators.required),
            email:new FormControl("cap@gmail.com",[Validators.required,Validators.email]),
            password:new FormControl(null,Validators.required),
            confirmPw:new FormControl(null,Validators.required)
        })
    }

   

    setDataIntoFormFields() {
        return this.userForm.setValue({
            userId:this.data.userdata.userId,
            firstname: this.data.userdata.firstname,
            lastname: this.data.userdata.lastname,
            username: this.data.userdata.username,
            gender: this.data.userdata.gender,
            role: this.data.userdata.role,
            email: this.data.userdata.email,
            password: null,
            confirmPw: null
        })
    }

    ngOnInit(): void {
        if (this.data.title === "Update") {
            this.setDataIntoFormFields()
        }
    }
    
    

    selectOperation() {
        if (this.data.title === "Insert" &&
            this.userForm.valid && this.userForm.value.password === this.userForm.value.confirmPw) {
            this.insertPopTrigger();
           
        } else if (this.data.title == "Update" &&
            this.userForm.value.password === this.userForm.value.confirmPw ||
            this.userForm.value.password && this.userForm.value.confirmPw == null){
            this.updatePopTrigger();
        }
        
    }
    insertPopTrigger() {
       
        const extraData = {
            title: "Insert",
            subTitle: "are you sure you want to add this data?",
            userformData: this.userForm
        }
        const openActionPop = this.matDialog.open(ActionPopComponent, { data: extraData })
        openActionPop.afterClosed().subscribe((state:boolean) => {
            if(!state)return;
            this.userService.regiterReq(this.userForm.value).subscribe(res=>{
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
            this.userService.updateUserDetails(this.userForm.value).subscribe((res)=>{
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
