import { Component, OnInit,Output } from '@angular/core';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() resImages: any; 
  constructor(private uploadService: UploadFileService) { }

  async ngOnInit() {
    this.resImages = await this.uploadService.getImages();

  }

}
