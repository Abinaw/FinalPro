import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private baseUrl = 'http://localhost:8080/send-email';

  constructor(private http: HttpClient) {}

  async onClickSendMail(element:HTMLElement , title?:string , emailId?:string , subject:string = "", body:string = "") {
    if (element) {
      await html2canvas(element, { scale: 1 }).then(canvas => {
        canvas.toBlob(blob => {
          const reader = new FileReader();
          if(blob)
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              const compressedImgData = reader.result;

              // Create PDF with the compressed image
              const pdf = new jsPDF('p', 'mm', 'a4');
              const imgWidth = pdf.internal.pageSize.getWidth();
              const imgHeight = (canvas.height * imgWidth) / canvas.width;

              pdf.addImage(compressedImgData, 'JPEG', 0, 0, imgWidth, imgHeight);

              // Convert PDF to Blob
              const pdfBlob = pdf.output('blob');

              // Create FormData and append the PDF Blob
              const formData = new FormData();
              formData.append('file', pdfBlob, 'title.pdf');
              formData.append('mail', 'user mail id');

              // Send PDF to the backend
              this.http.post(this.baseUrl, formData).subscribe(response => {
                console.log('Email sent successfully', response);
              });

            } else {
              console.error('Failed to compress image.');
            }
          };
        }, 'image/jpeg', 0.7); // Set quality to 0.7 (or adjust as needed for better compression)
      }).catch(error => {
        console.error('Error generating canvas:', error);
      });
    } else {
      console.error('Element with id "stockTemp" not found.');
    }
  }
}
