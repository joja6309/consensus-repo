import {Injectable} from '@angular/core';
import { HttpClient, HttpEvent
  ,HttpResponse, HttpInterceptor,
  HttpEventType, HttpHandler, HttpRequest} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadFileService  {
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }


  constructor(private http: HttpClient) {}

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    })
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    console.log(formdata);
    formdata.append('file', file);
    console.log(file.name);

    const req = new HttpRequest('POST', 'http://localhost:38420', formdata, {
      reportProgress: true,
      responseType: 'text'
    });
     return this.http.request(req);
  }

  getFiles(): Observable<string[]> {
      
      return this.http.get('http://localhost:38420/getallfiles');
  }
}
