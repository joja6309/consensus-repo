import { Component, OnInit, ViewChild, 
  ViewEncapsulation, Output, Input, 
  ViewContainerRef, ComponentFactory, ComponentFactoryResolver
} from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { EditSettingsService } from '../edit-settings.service';
import { ImageFilterService } from '../image-filter.service';
import { GenerateImageService } from '../generate-image.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Image,ResponseImage } from '../image.model';
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
  @ViewChild("canvasContainer", { read: ViewContainerRef }) container;
  componentRef: CanvasSelectComponent;
  @ViewChild("canvasContainer2", { read: ViewContainerRef }) container2;
  componentRef2: CanvasSelectComponent;

  
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
    private resolver: ComponentFactoryResolver,
    private uploadService: UploadFileService,
    private config: NgbCarouselConfig,
    private modalService: NgbModal,
    private editSettingsService: EditSettingsService,
    private generateImageService: GenerateImageService,
    private imageFilterService: ImageFilterService
  ) { 
    
   
  }
  createCanvasComponents() {
    //this.container.clear();
    

    // this.componentRef.instance.output.subscribe(event => console.log(event));

  }
   
  ngAfterViewInit() {
   

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
      rowCount:2,
      colCount:2
    };

    //sizes
    this.sizeSettings = {
      selectedSizeIndex: 0,
      sizes: [
        {
          name: "Instagram",
          width: 250,
          height: 250,
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
  
    const factory: ComponentFactory<CanvasSelectComponent> = this.resolver.resolveComponentFactory(CanvasSelectComponent);

    this.componentRef = this.container.createComponent(factory);
    this.componentRef2 = this.container.createComponent(factory);

    this.componentRef.imageSettings = this.imageSettings;
    this.componentRef.canvasSettings = this.canvasSettings;
    this.componentRef.sizeSettings = this.sizeSettings;
    this.componentRef.textSettings = this.textSettings;
    this.componentRef.logoSettings = this.logoSettings;
    this.componentRef.isGrid = false;

    this.componentRef2.imageSettings = this.imageSettings;
    this.componentRef2.canvasSettings = this.canvasSettings;
    this.componentRef2.sizeSettings = this.sizeSettings;
    this.componentRef2.textSettings = this.textSettings;
    this.componentRef2.logoSettings = this.logoSettings;
    this.componentRef2.isGrid = true;
    
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
// ,
// images: [
//   {
//     url: "http://localhost:3000/photo_6.jpeg",
//     name: "Cool Beach",
//     author: "Michael Durana",
//     location: "Big Sur, United States",
//     tags: "water, ocean, rocks, nature, sky, sun",
//     uniqueId: 0
//   }, {
//     url: "https://images.unsplash.com/photo-1460378150801-e2c95cb65a50?crop=entropy&fit=crop&fm=jpg&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80",
//     name: "Snowscape",
//     author: "Joe Reed",
//     location: "Hole-in-the-Wall, Penrith, United Kingdom",
//     tags: "nature, mountains, snow, sky, cold, winter",
//     uniqueId: 1
//   }, {
//     url: "https://images.unsplash.com/photo-1458400411386-5ae465c4e57e?crop=entropy&fit=crop&fm=jpg&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80",
//     name: "Lift Chairs",
//     author: "Geoffrey Arduini",
//     location: "Morillon, France",
//     tags: "snow, winter, cold, nature, outside, chairs, ski, snowboard",
//     uniqueId: 2
//   }, {
//     url: "https://images.unsplash.com/photo-1452827073306-6e6e661baf57?crop=entropy&fit=crop&fm=jpg&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80",
//     name: "Flower Gift",
//     author: "Leonardo Wong",
//     location: "Singapore",
//     tags: "rose, gift, petal, flower, scent",
//     uniqueId: 3
//   }, {
//     url: "https://images.unsplash.com/photo-1452215199360-c16ba37005fe?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&fit=crop&s=ba433e209f134b4c8b2a7804a3db2b49",
//     name: "Mountains Backdrop",
//     author: "Caryle Tylkowski",
//     location: "Unknown",
//     tags: "mountains, sky, blue, rocky, nature",
//     uniqueId: 4
//   }, {
//     url: "https://images.unsplash.com/photo-1442551382982-e59a4efb3c86?crop=entropy&fit=crop&fm=jpg&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80",
//     name: "NY Skyline",
//     author: "Nirzar Pangarkar",
//     location: "New York, United States",
//     tags: "sky, skyline, new york, buildings, water",
//     uniqueId: 5
//   }, {
//     url: "https://images.unsplash.com/photo-1440613905118-99b921706b5c?crop=entropy&fit=crop&fm=jpg&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80",
//     name: "Bridge in City",
//     author: "valor kopeny",
//     location: "Dumbo , New York, USA",
//     tags: "city, bridge, outside, structures",
//     uniqueId: 6
//   }, {
//     url: "https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?crop=entropy&fit=crop&fm=jpg&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80",
//     name: "iPhone Habit",
//     author: "Gilles Lambert",
//     location: "Unknown",
//     tags: "iphone, tech, habit, people, screen",
//     uniqueId: 7
//   }, {
//     url: "https://images.unsplash.com/reserve/imNop2O1Rit190cSkxXv_1-7069.jpg?crop=entropy&fit=crop&fm=jpg&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80",
//     name: "Flowers on Stand",
//     author: "Julia Janeta",
//     location: "Unknown",
//     tags: "rose, gift, petal, flower, scent, drawer, white",
//     uniqueId: 8
//   }]