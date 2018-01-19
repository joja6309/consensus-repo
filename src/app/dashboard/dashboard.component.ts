import {
  Component, OnInit, ViewChild,
  ViewEncapsulation, Output, Input, Directive,
  ViewContainerRef, ComponentFactory, ComponentFactoryResolver, Injector
} from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { EditSettingsService } from '../edit-settings.service';
import { ImageFilterService } from '../image-filter.service';
import { GenerateImageService } from '../generate-image.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Image, ResponseImage } from '../image.model';
import { Observable } from 'rxjs';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { NgbdModalContent } from '../cons-alg-modal/cons-alg-modal.component';
import { CanvasSelectComponent } from '../canvas-select'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbCarouselConfig]
})

export class DashboardComponent implements OnInit {

  @Input() resImages: any;
  @Output() sizes: any;
  @Output() selectedSize: any;
  @Output() filters: any;
  @Output() selectedFilter: any;
  @Output() imageSettings: any;
  @Output() canvasSettings: any;
  @Output() sizeSettings: any;
  @Output() filterSettings: any;
  @Output() textSettings: any;
  @Output() logoSettings: any;
  @Output() colCount = 2;
  @Output() rowCount = 2;
  data: Object;
  simpleDrop: any = null;
  listTeamOne: Array<string> = [];
  listTeamTwo: Array<string> = [];
  imageSelected: boolean = false;
  images: any;
  
  constructor(
    private resolver: ComponentFactoryResolver, private injector: Injector,
    private uploadService: UploadFileService,
    private config: NgbCarouselConfig,
    private modalService: NgbModal,
    private editSettingsService: EditSettingsService,
    private generateImageService: GenerateImageService,
    private imageFilterService: ImageFilterService
  ) {

  }
  
  ngAfterViewInit() {
    //setTimeout(() => {
    //  let componentFactory = this.resolver.resolveComponentFactory(CanvasSelectComponent);
    //  // we need to pass in the dependency injector
    //  const sampleFactory = this.resolver.resolveComponentFactory(CanvasSelectComponent);
    //  this.viewContainerRef = this.container.createComponent(sampleFactory);
    //  this.viewContainerRef.instance.isGrid = false;
    //  this.viewContainerRef.instance.canvasSettings = this.canvasSettings;
    //  this.viewContainerRef.instance.sizeSettings = this.sizeSettings;
    //  this.viewContainerRef.instance.textSettings = this.textSettings;
    //  this.viewContainerRef.instance.logoSettings = this.logoSettings;
    //  this.viewContainerRef.instance.imageSettings = this.imageSettings;
    //}, 1);
  }

  

  async ngOnInit() {
    var resImages = await this.uploadService.getImages();
    this.imageSettings = {
      selectedImageUniqueId: 0,
      filterQuery: '',
      images: resImages
    };



    // canvas
    this.canvasSettings = {
      downloadableImage: '',
      rowCount: 8,
      colCount: 8
    };

    //sizes
    this.sizeSettings = {
      selectedSizeIndex: 0,
      sizes: [
        {
          name: "Instagram",
          width: 150,
          height: 150,
        },
        {
          name: "Pinterest",
          width: 300,
          height: 400
        },

        {
          name: "Twitter and Facebook",
          width: 200,
          height: 300
        }
      ]
    };

    //filters
    this.filterSettings = {
      selectedFilterIndex: 0,
      filters: [
        {
          name: "None",
          //method: "channels",
          //args: [{
          //  red: 0,
          //  green: 0,
          //  blue: 0
          //}]
        }, {
          name: "Light Contrast",
          //method: "contrast",
          //args: [10]
        }, {
          name: "Heavy Contrast",
          //method: "contrast",
          //args: [20]
        }, {
          name: "Grayscale",
          //method: "greyscale",
          //args: null
        }, {
          name: "Red Tint",
          //method: "channels",
          //args: [{
          //  red: 30,
          //  green: 0,
          //  blue: 0
          //}]
        }, {
          name: "Green Tint",
          //method: "channels",
          //args: [{
          //  red: 0,
          //  green: 30,
          //  blue: 0
          //}]
        }, {
          name: "Blue Tint",
          method: "channels",
          //args: [{
          //  red: 0,
          //  green: 0,
          //  blue: 30
          //}]
        }
      ]
    }

    //text
    this.textSettings = {
      hasHeader: false,
      hasBody: true,
      hasCaption: false,
      selectedModelUniqueId: -1,
      models: [
        { uniqueId: 0, type: 'header', text: "Double-click to Edit", fontIndex: 0, colorIndex: 0, alignIndex: 0, sizeIndex: 0, isBold: false, isItalic: false },
        { uniqueId: 1, type: 'body', text: "Double-click to Edit", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: false, isItalic: false },
        { uniqueId: 2, type: 'caption', text: "Double-click to Edit", fontIndex: 0, colorIndex: 0, alignIndex: 2, sizeIndex: 0, isBold: false, isItalic: false },
      ],
      selectedQuoteIndex: 0,
      quotes: [{
        text: "So it goes."
      }, {
        text: "Whatever you are, be a good one."
      }, {
        text: "Try and fail, but never fail to try."
      }
      ],
      options: {
        align: ['align-left', 'align-center', 'align-right'],
        sizes: ['normal', 'large', 'largest'],
        fonts: [
          { name: 'Arial', family: 'Arial, Helvetica, sans-serif' },
          { name: 'Times', family: '"Times New Roman", Times, serif' }
        ],
        colors: ['Black', '#9C27B0', '#2196F3', '#009688', '#CDDC39', '#FF9800']
      }
    };

    //logo
    this.logoSettings = {
      isGraphicHidden: false,
      selectedFile: null,
      size: 50,
      radius: 0
    };


  }
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  onShuffleImages() {
    this.imageSettings.images = this.shuffle(this.imageSettings.images);
    this.imageSettings.selectedImageUniqueId = this.imageSettings.images[0].uniqueId;
    this.editSettingsService.updateCanvas();
  }

  onImageSettingsChange(payload) {
    this.editSettingsService.updateCanvas();
    console.log(payload)
    //this.viewContainerRef.changeDetectorRef.detectChanges();
  }

  onCanvasReposition() {
    // console.log("canvas reposition");
  }

  onSizeSettingsChange(payload) {
    this.editSettingsService.updateCanvas();

    this.editSettingsService.updateOverlays();
  }

  onFilterReset() {
    this.filterSettings.selectedFilterIndex = 0;
    this.imageFilterService.updateFilter(this.filterSettings.filters[this.filterSettings.selectedFilterIndex]);
  }

  onFilterSettingsChange(payload) {
    this.imageFilterService.updateFilter(this.filterSettings.filters[this.filterSettings.selectedFilterIndex]);
  }

  onTextSettingsChange(payload) {
    this.editSettingsService.updateOverlays();
  }

  onLogoSettingsChange(payload) {
    this.editSettingsService.updateOverlays();
  }

  onDownload() {
    this.generateImageService.generateImage();
  }


}
