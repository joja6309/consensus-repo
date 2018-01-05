import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-dnd',
  templateUrl: './dnd.component.html',
  styleUrls: ['./dnd.component.css']
})
export class DndComponent {
  private fileList : any = [];
  private invalidFiles : any = [];
  
  constructor(private uploadService: UploadFileService) {  }

  
}

