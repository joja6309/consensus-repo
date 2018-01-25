import { AfterViewInit,
 Component, ElementRef, Input, ViewChild, TemplateRef, ViewContainerRef,
  ComponentFactory, ComponentFactoryResolver,Injector} from '@angular/core';
import { SquareComponent } from '../square/square.component';

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
  @ViewChild('anchor3', { read: ViewContainerRef }) dynamicAnchor3: ViewContainerRef;


  
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

  private anchor1h: number = 0;
  private anchor1w: number = 0;

  private anchor2h: number = 0;
  private anchor2w: number = 0;

  gridSet: string = "false";

  componentRefs: Array<any> = [];
  private columnPoints: Array<number> = [];
  private rowPoints: Array<number> = []; 


  constructor(private editSettingsService: EditSettingsService,
    private generateImageService: GenerateImageService,
    private imageFilterService: ImageFilterService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector

  ) {
     
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
  setCanvas1() {
    this.container = document.getElementById("anchor1");
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'canvas1';
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.anchorRef1.nativeElement.clientHeight;
    this.canvas.height = this.anchorRef1.nativeElement.clientWidth;
    this.container.appendChild(this.canvas);

  }
  setCanvas2() {
    this.container = document.getElementById("anchor2");
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'canvas2';
    this.ctx2 = this.canvas.getContext('2d');
    this.canvas.width = this.anchorRef2.nativeElement.clientHeight;
    this.canvas.height = this.anchorRef2.nativeElement.clientWidth;
    this.container.appendChild(this.canvas);

  }
  ngAfterViewInit() {

    let sizeData = this.sizeSettings.sizes[this.sizeSettings.selectedSizeIndex];
    this.anchor1h = this.anchorRef1.nativeElement.clientHeight;
    this.anchor1w = this.anchorRef1.nativeElement.clientWidth;
    this.anchor2h = this.anchorRef2.nativeElement.clientHeight;
    this.anchor2w = this.anchorRef2.nativeElement.clientWidth;
    this.setCanvas1();
    this.setCanvas2();
    //subscribe
    this.editSettingsService.storeCanvas.subscribe(() => this.onUpdateCanvas());
    this.imageFilterService.store.subscribe(() => this.onUpdateFilter());
    //this.generateImageService.store.subscribe(() => this.onGenerateDownloadableImage());

  }
  
  OnInit() {
    

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
    
    this.ctx.clearRect(0, 0, this.anchor1w, this.anchor1h);
    this.ctx2.clearRect(0, 0, this.anchor2w, this.anchor2h);

    image.onload = () => {
        
      this.ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, this.anchor1w, this.anchor1h);
      this.ctx2.drawImage(image2, 0, 0, image2.width, image2.height, 0, 0, this.anchor2h, this.anchor2w);
      this.drawGridLines(this.ctx2, this.canvasSettings.colCount, this.canvasSettings.rowCount, this.anchor2h, this.anchor2w);

		}
   
	}
  
  private setGrid() {
    
    for(let  col in this.columnPoints)
    {
      for(let row in this.rowPoints)
      {
        const factory = this.componentFactoryResolver.resolveComponentFactory(SquareComponent);
        factory.create(this.injector);
        const ref = this.dynamicAnchor3.createComponent(factory);
        ref.instance.height = 100;
        ref.instance.width = 100;
        ref.instance.originalCtx = this.ctx2;
        ref.instance.colPnt = col;
        ref.instance.rowPnt = row;

        // ref.injector.get.
        ref.changeDetectorRef.detectChanges();
        this.componentRefs.concat(ref);

      }
    }
      
    
   
  }
    private drawGridLines(ctx, colCount, rowCount, iWidth, iHeight) {
    
    ctx.strokeStyle = this.lineColor;
    ctx.beginPath();
    var i, x, y, iCount = null;
    var col_index = colCount - 1;
    var col_sep = iWidth / colCount;
    var row_index = rowCount - 1;
    var row_sep = iWidth / rowCount;
    for (i = 1; i <= col_index; i++) {
      x = (i * col_sep);
      this.columnPoints.concat(x);
      ctx.moveTo(x, 0);
      ctx.lineTo(x,iHeight);
      ctx.stroke();
    }
    for (i = 1; i <= row_index; i++) {
      y = (i * row_sep);
      this.rowPoints.concat(y);
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
