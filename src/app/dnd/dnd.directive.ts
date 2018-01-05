import {Directive, HostListener, HostBinding, EventEmitter, Output, Input} from '@angular/core';
//import {forEach} from "@angular/router/src/utils/collection";
import { UploadFileService } from '../upload-file.service';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  // @Input() private allowed_extensions : Array<string> = [];
  // @Output() private filesInvalidEmiter: EventEmitter<File[]> = new EventEmitter();
  
  @Output() private filesChangeEmiter : EventEmitter<FileList> = new EventEmitter();
  @HostBinding('style.background') private background = 'rgba(255,255,255,0.3)';

  constructor(private uploadService: UploadFileService) { }

  @HostListener('dragover', ['$event']) public onDragOver(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'rgba(255,255,255,0.3)'
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'rgba(255,255,255,0.7)'
  }

  @HostListener('drop', ['$event']) public onDrop(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'rgba(255,255,255,0.3)'
    this.uploadService.currentFileUpload = evt.dataTransfer.files.item(0);
    this.uploadService.showUploadButton = true;
    
    }
  }


