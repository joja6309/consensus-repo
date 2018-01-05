import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Image } from '../image.model';
import { Observable } from 'rxjs';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { NgbdModalContent } from '../cons-alg-modal/cons-alg-modal.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,

  providers: [NgbCarouselConfig]
})

export class DashboardComponent implements OnInit {
  @ViewChild('app-image-display') image_display;
  
  public images;
  simpleDrop: any = null;
  listTeamOne: Array<string> = [];
  listTeamTwo: Array<string> = [];
  imageSelected: boolean = false;
  
  
  
  constructor(
    private uploadService: UploadFileService,
    private config: NgbCarouselConfig,
    private modalService: NgbModal) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = true;

   }

  ngOnInit() {
    this.setImages();

  }
  open() {
    const modalRef = this.modalService.open(NgbdModalContent, { windowClass: 'modal-custom-lg' });
    modalRef.componentInstance.name = this.uploadService.selectedImage;
  }
  productWasSelected(image: Image): void {
    console.log('Product clicked: ', image);
  }
  selectImg(i)
  {
    this.uploadService.imgSrc = 'url(' + this.images[i].url + ')'
    this.uploadService.disText = null
    this.imageSelected = true;
    this.uploadService.selectedImage = this.images[i]
    // this.image_display.changeClass()
  }
  setImages()
  {
    this.uploadService.getImages().subscribe(
      // the first argument is a function which runs on success
      data => { 
        
        this.images = data },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading foods')
    );


  }
  
}
