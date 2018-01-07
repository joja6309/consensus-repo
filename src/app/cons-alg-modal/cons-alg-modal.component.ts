import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SliderComponent } from '../slider/slider.component'; 
@Component({
  selector: 'app-cons-alg-modal',
  templateUrl: './cons-alg-modal.component.html',
  styleUrls: ['./cons-alg-modal.component.css']
})
export class NgbdModalContent implements OnInit{
  @Input() name;
  @ViewChild("myCanvas") myCanvas;
  @ViewChild("mySlider") mySlider: SliderComponent;
  @ViewChild('layout') canvasRef;
  image: string = '';
  lineSep: number = 20;
  lineColor: string = "black";
  rectW: number = 100;
  rectH: number = 100;
  iWidth: number = 0;
  iHeight: number = 0;
  colCount = 2;
  rowCount = 2;
  rectColor: string = "#FF0000";
  context: CanvasRenderingContext2D;
  cnvEl: Element = null;
  ngAfterViewInit() {
    
  }
  constructor(public activeModal: NgbActiveModal) { }
  ngOnInit() {
    let canvas = this.myCanvas.nativeElement;
    this.iWidth = canvas.height;
    this.iHeight = canvas.width;
    this.context = canvas.getContext('2d');
    this.drawImage();
  }
  drawImage() {
    this.context.clearRect(0, 0, this.iWidth, this.iHeight);
    let source = new Image();
    source.crossOrigin = 'Anonymous';
    source.onload = () => {
      // canvas.height = source.height;
      // canvas.width = source.width;
      this.context.drawImage(source, 0, 0);
      this.image = this.name.url;
      this.drawGridLines();

    };
    source.src = this.name.url;
  }
  
  rowChangeHandler(event: number) {
    this.rowCount = event;
    this.drawImage();
  }
  colChangeHandler(event: number) {
    this.colCount = event;
    this.drawImage();
  }
  
  drawGridLines() {
    
    var ctx = this.context;
    ctx.strokeStyle = this.lineColor;
    ctx.beginPath();
    var i, x, y, iCount = null;
    var col_index = this.colCount - 1;
    var col_sep = Math.floor(this.iWidth / this.colCount);
    var row_index = this.rowCount - 1;
    var row_sep = Math.floor(this.iWidth / this.rowCount);
    for (i = 1; i <= col_index; i++) {
      x = (i * col_sep);
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.iHeight);
      ctx.stroke();
    }
    for (i = 1; i <= row_index; i++) {
      y = (i * row_sep);
      ctx.moveTo(0, y);
      ctx.lineTo(this.iWidth, y);
      ctx.stroke();
    }
    ctx.closePath();
}

}
