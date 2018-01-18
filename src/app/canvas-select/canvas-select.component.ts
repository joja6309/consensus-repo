import { AfterViewInit, Component, ElementRef, Input, ViewChild,TemplateRef } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { EditSettingsService } from '../edit-settings.service';
import { ImageFilterService } from '../image-filter.service';
import { GenerateImageService } from '../generate-image.service';

@Component({
  moduleId: module.id,
  selector: 'app-canvas-select',
  templateUrl: 'canvas-select.component.html',
  styleUrls: ['canvas-select.component.css'],
})
export class CanvasSelectComponent implements AfterViewInit {

  @ViewChild('anchor2') anchorRef2: ElementRef;
  @ViewChild('anchor1') anchorRef1: ElementRef;

  
  canvas: HTMLCanvasElement;
  
  container: any;
  

  @Input() gridId: string;
  @Input() canvasSettings: any;
  @Input() imageSettings: any;
  @Input() sizeSettings: any;
  @Input() textSettings: any;
  @Input() logoSettings: any;
  colCount = 2;
  rowCount = 2;
  rectW: number = 100;
  rectH: number = 100;
  lineSep: number = 20;
  lineColor: string = "black";
  rectColor: string = "#FF0000";
  canvasNum: string = null;

  private ctx: CanvasRenderingContext2D;
  private ctx2: CanvasRenderingContext2D;

  private canvasId: string = 'canvas1';
  private canvasId2: string = 'canvas2';

  private c1h: number = 0;
  private c1w: number = 0;

  private c2h: number = 0;
  private c2w: number = 0;

  constructor(private editSettingsService: EditSettingsService,
    private generateImageService: GenerateImageService,
    private imageFilterService: ImageFilterService) {
     
  }
  createCanvas() {
    let sizeData = this.sizeSettings.sizes[this.sizeSettings.selectedSizeIndex];
    this.container = document.getElementById('anchor1');
    this.canvas = document.createElement('canvas');
    this.canvas.id = this.canvasId;
    this.ctx = this.canvas.getContext('2d');
    let rec = this.anchorRef1.nativeElement.getBoundingClientRect();

    //rec = DOMRect {x: 429.5, y: 283, width: 283.328125, height: 143.59375, top: 283, … }
    
    this.c1h = this.anchorRef1.nativeElement.clientHeight;
    this.c1w = this.anchorRef1.nativeElement.clientWidth;
    this.canvas.width = this.c1w;
    this.canvas.height = this.c1h;
    this.container.appendChild(this.canvas);
    console.log(this.c1h);
    console.log(this.c1w);
    console.log(this.anchorRef1.nativeElement.style.width);
    console.log(this.anchorRef1.nativeElement.style.height)
    console.log('height---' + this.anchorRef1.nativeElement.offsetHeight);  //<<<===here
    console.log('width---' + this.anchorRef1.nativeElement.offsetWidth);    //<<<===here

    //class="shadow"

    this.container = document.getElementById('anchor2');
    this.canvas = document.createElement('canvas');
    this.canvas.id = this.canvasId2;
    this.ctx2 = this.canvas.getContext('2d');
    this.c2h = this.anchorRef2.nativeElement.clientHeight;
    this.c2w = this.anchorRef2.nativeElement.clientWidth;
    this.canvas.width = this.c2w - 1 
    this.canvas.height = this.c2h - 1  
    this.container.appendChild(this.canvas);
    console.log(this.c2h);
    console.log(this.c2w);
    console.log(this.anchorRef2.nativeElement);

    console.log('height---' + this.anchorRef2.nativeElement.clientHeight);  //<<<===here
    console.log('width---' + this.anchorRef2.nativeElement.clientWidth);    //<<<===here



  }
  rowChangeHandler(event: number) {
    this.rowCount = event;
    this.canvasSettings.rowCount = event;
    this.editSettingsService.updateCanvas();
  }
  colChangeHandler(event: number) {
    this.colCount = event;
    this.canvasSettings.colCount = event;
    this.editSettingsService.updateCanvas();

  }
  ngAfterViewInit() {

    
    this.createCanvas()

    //subscribe
    this.editSettingsService.storeCanvas.subscribe(() => this.onUpdateCanvas());
    this.imageFilterService.store.subscribe(() => this.onUpdateFilter());
    //this.generateImageService.store.subscribe(() => this.onGenerateDownloadableImage());

  }
  ngOnInit() {

  }

	// load image into canvas
    private onUpdateCanvas() {
      

		//new image
    let image = new Image();
    let image2 = new Image();
    ///let sizeData = this.sizeSettings.sizes[this.sizeSettings.selectedSizeIndex];
    let modelMatch = this.imageSettings.images.find(x => x.uniqueId == this.imageSettings.selectedImageUniqueId)
    image.src = modelMatch['url']; /*this.editSettingsService.processImgUrl(, this.c1w, this.c1h);*/
    image2.src = modelMatch['url'];  //this.editSettingsService.processImgUrl(modelMatch['url'], this.c2w, this.c2h);
    image.crossOrigin = "Anonymous";
    image2.crossOrigin = "Anonymous";
    
    //ctx.drawImage(img, 0, 0, img.width, img.height,     // source rectangle
     // 0, 0, canvas.width, canvas.height); // destination rectangle
		//clean canvas
    this.ctx.clearRect(0, 0, this.c1w, this.c1h);
    this.ctx2.clearRect(0, 0, this.c2w, this.c2h);

		//provide imageFilterService with a new canvas
		//this.imageFilterService.updateCanvasReference(this.canvasArtboard.nativeElement);

		//update canvas
    image.onload = () => {
      console.log(image)
      this.ctx.drawImage(image, 0, 0, image.width, image.height,0,0,this.c1w, this.c1h);
      this.ctx2.drawImage(image2, 0, 0, image2.width, image2.height, 0, 0, this.c2w, this.c2h);
          this.drawGridLines(this.ctx2, this.canvasSettings.colCount, this.canvasSettings.rowCount, this.c2w, this.c2h);

		}
   
	}
    private drawGridLines(ctx, colCount, rowCount, iWidth, iHeight) {
      console.log(1)
    
    ctx.strokeStyle = this.lineColor;
    ctx.beginPath();
    var i, x, y, iCount = null;
    var col_index = colCount - 1;
    var col_sep = Math.floor(iWidth / colCount);
    var row_index = rowCount - 1;
    var row_sep = Math.floor(iWidth / rowCount);
    for (i = 1; i <= col_index; i++) {
      x = (i * col_sep);
      ctx.moveTo(x, 0);
      ctx.lineTo(x,iHeight);
      ctx.stroke();
    }
    for (i = 1; i <= row_index; i++) {
      y = (i * row_sep);
      ctx.moveTo(0, y);
      ctx.lineTo(iWidth, y);
      ctx.stroke();
    }
    ctx.closePath();
  }


	//private onGenerateDownloadableImage() {
	//	let image = new Image();
 //       image.src = this.canvasArtboard.nativeElement.toDataURL("image/png");
 //       image.crossOrigin = "Anonymous";
 //       this.canvasSettings.downloadableImage = image;
	//}

	private onUpdateFilter() {
		// console.log('update filter: likely use the imageFilterService canvas ref');
	}

	private onClearOverlaysSelection() {
		this.editSettingsService.updateOverlays(true);
	}

}
