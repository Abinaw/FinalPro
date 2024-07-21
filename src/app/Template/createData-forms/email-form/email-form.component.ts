import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { ICustomerEntity } from 'src/app/constants/interfaces/CustomerEntity';
import { CustomerService } from 'src/app/service/customer-service/customer.service';
import { EmailService } from 'src/app/service/email-service/email.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit{


emailForm:FormGroup;
isLoading:boolean = false; 
customerControl = new FormControl('');
customerDataList!: ICustomerEntity[]
filterOptions!: Observable<ICustomerEntity[]>;

constructor( 
    @Inject(MAT_DIALOG_DATA) public data: { reportPic: HTMLElement ,reportType:string},
    private matDialogRef:MatDialogRef<EmailFormComponent>,
    private emailService: EmailService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
){
    this.emailForm = new FormGroup({
        emailId: new FormControl(),
        title:new FormControl,
        subject: new FormControl((this.data.reportType+" report").toUpperCase()),
    })
    const jsonString =localStorage.getItem('customerData')
    if (jsonString) {
        const customerData = JSON.parse(jsonString);
        this.customerDataList =customerData
      } else {
        console.log('No customer data found.');
      }
   

}

setMail(email:string){
    this.emailForm.get('emailId')?.setValue(email);
}
ngOnInit() {
 
    this.filterOptions = this.customerControl.valueChanges.pipe(
        startWith(""),
        map((value) => this.listFilter(value || ""))
    );
}
private listFilter(value: string): ICustomerEntity[] {

    const searchValue = value.toString().toLowerCase();
    return this.customerDataList.filter(
        option =>
            option.custName.toString().toLowerCase().includes(searchValue)
        ||
        option.email.toString().toLowerCase().includes(searchValue)
    )

}
    async sendEmail() {
        const generatedReport = this.data.reportPic;
        if (generatedReport) {
          this.isLoading = true;
          this.cdr.detectChanges();
          try {
            const { emailId, title, subject } = this.emailForm.value;
            console.log(this.emailForm.value)
            await this.emailService.onClickSendMail(generatedReport, emailId, title, subject)
            // this.toastr.success("Success");
            this.matDialogRef.close()
            return
          } catch (error) {
            this.toastr.error('Error occurred while sending email');
          } finally {
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        } else {
          this.toastr.warning('Please generate report to send mail.', 'No PDF found');
        }
      }

     
  
}
