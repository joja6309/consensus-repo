import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { EditSettingsService } from '../edit-settings.service';
import { ImageFilterService } from '../image-filter.service';
import { GenerateImageService } from '../generate-image.service';

//import { OverlayLogoComponent } from './overlays/overlay-logo/overlay-logo.component';
//import { OverlayTextsComponent } from './overlays/overlay-texts/overlay-texts.component';

@Component({
	moduleId: module.id,
	selector: 'app-canvas-select',
	templateUrl: 'canvas-select.component.html',
	styleUrls: ['canvas-select.component.css'],
	//directives: [OverlayLogoComponent, OverlayTextsComponent]
})
export class CanvasSelectComponent implements AfterViewInit {

	@ViewChild('photoCanvas') canvasArtboard: ElementRef;
	@Input() gridId: string;
  @Input() isGrid: boolean;
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

	private ctx: CanvasRenderingContext2D;

	constructor(private editSettingsService: EditSettingsService,
				private generateImageService: GenerateImageService,
				private imageFilterService: ImageFilterService ) {}

	ngAfterViewInit() {

		//canvas context
		this.ctx = this.canvasArtboard.nativeElement.getContext('2d');

		//subscribe
		this.editSettingsService.storeCanvas.subscribe(() => this.onUpdateCanvas());
		this.imageFilterService.store.subscribe(() => this.onUpdateFilter());
		this.generateImageService.store.subscribe(() => this.onGenerateDownloadableImage());
	}

	// load image into canvas
	private onUpdateCanvas() {

		//new image
		let image = new Image();
    let sizeData = this.sizeSettings.sizes[this.sizeSettings.selectedSizeIndex];
    let modelMatch = this.imageSettings.images.find(x => x.uniqueId == this.imageSettings.selectedImageUniqueId)
		image.src = this.editSettingsService.processImgUrl(modelMatch['url'], sizeData.width, sizeData.height);
    image.crossOrigin = "Anonymous";
    

		//clean canvas
		this.ctx.clearRect(0, 0, sizeData.width, sizeData.height);

		//provide imageFilterService with a new canvas
		this.imageFilterService.updateCanvasReference(this.canvasArtboard.nativeElement);

		//update canvas
		image.onload = () => {
			this.ctx.drawImage(image, 0, 0);
			console.log(this.isGrid)
			if (this.isGrid) {
				this.drawGridLines(this.canvasSettings.colCount, this.canvasSettings.rowCount, sizeData.width, sizeData.height);
			}
		}
   
	}
	private drawGridLines(colCount, rowCount, iWidth, iHeight) {

    
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.beginPath();
    var i, x, y, iCount = null;
    var col_index = colCount - 1;
    var col_sep = Math.floor(iWidth / colCount);
    var row_index = rowCount - 1;
    var row_sep = Math.floor(iWidth / rowCount);
    for (i = 1; i <= col_index; i++) {
      x = (i * col_sep);
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x,iHeight);
      this.ctx.stroke();
    }
    for (i = 1; i <= row_index; i++) {
      y = (i * row_sep);
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(iWidth, y);
      this.ctx.stroke();
    }
    this.ctx.closePath();
  }


	private onGenerateDownloadableImage() {
		let image = new Image();
        image.src = this.canvasArtboard.nativeElement.toDataURL("image/png");
        image.crossOrigin = "Anonymous";
        this.canvasSettings.downloadableImage = image;
	}

	private onUpdateFilter() {
		// console.log('update filter: likely use the imageFilterService canvas ref');
	}

	private onClearOverlaysSelection() {
		this.editSettingsService.updateOverlays(true);
	}

}
