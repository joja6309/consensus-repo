import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }

  selectFile(event) {
    // this.uploadService.selectedFiles = event.target.file;
    console.log(event.target.files.item(0));
    
    this.uploadService.currentFileUpload = event.target.files.item(0);
    this.uploadService.showUploadButton = true;

  }

 
  }

