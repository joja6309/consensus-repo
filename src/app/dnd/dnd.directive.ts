import {Directive, HostListener, HostBinding, EventEmitter, Output, Input} from '@angular/core';
//import {forEach} from "@angular/router/src/utils/collection";
import { UploadFileService } from '../upload-file.service';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  @Input() private allowed_extensions : Array<string> = [];
  @Output() private filesChangeEmiter : EventEmitter<FileList> = new EventEmitter();
  @Output() private filesInvalidEmiter : EventEmitter<File[]> = new EventEmitter();
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
    let files = evt.dataTransfer.files;
    let valid_files: Array<File> = [];
    let invalid_files : Array<File> = [];
    if (files.length > 0) {
     for (let file of files){
        let ext = file.name.split('.')[file.name.split('.').length - 1];
        if(this.allowed_extensions.lastIndexOf(ext) != -1){
          valid_files.push(file);
        }else{
          invalid_files.push(file);
        }
      };
      this.uploadService.currentFileUpload = valid_files[0];
      //this.filesChangeEmiter.emit(valid_files);
      //this.filesInvalidEmiter.emit(invalid_files);
    }
  }

}
