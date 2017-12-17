import {Component, OnInit} from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UploadFileService} from '../upload-file.service';

@Component({
  selector: 'list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {

  showFile = false
  fileUploads: Observable<string[]>

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    this.fileUploads = this.uploadService.getFiles();
  }

  refreshFiles(enable: boolean) {
   
      this.fileUploads = this.uploadService.getFiles();
    
  }

  showFiles(enable: boolean) {
    this.showFile = enable

    if (enable) {
      this.fileUploads = this.uploadService.getFiles();
    }
  }
 
}
