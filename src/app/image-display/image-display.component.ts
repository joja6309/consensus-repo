import { Component, OnInit, OnChanges} from '@angular/core';
import { Image } from '../image.model';
import { Injectable } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.css']
})
@Injectable()
export class ImageDisplayComponent implements OnInit {



  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }
  changeClass()
  {

    let styles = {}
    
    if (this.uploadService.imgSrc) {
      styles = {
        'background-color': 'transparent',
        'background-image': this.uploadService.imgSrc,
        /* Center and scale the image nicely */
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'height': '100px',
        'width':'100px'


      };
      return styles 
    }  
  }
  

//set image 
//

}
