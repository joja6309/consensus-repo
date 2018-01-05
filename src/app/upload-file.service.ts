import {Injectable} from '@angular/core';
import { HttpClient, HttpEvent
  ,HttpResponse, HttpInterceptor,
  HttpEventType, HttpHandler, HttpRequest} from '@angular/common/http';
import { Image } from './image.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


@Injectable()
export class UploadFileService {
  
  uploadedFiles: Array<Image>;
  currentFileUpload: File
  showProgressBar: Boolean = false;
  showUploadButton: Boolean = false;
  progress: { percentage: number } = { percentage: 0 }
  selectedImage: Image = null;
  imgSrc: string = null;
  disText: string = "Select or drop an image to get started!";
  constructor(private http: HttpClient) {

   }
  ngOnInit() {
    
    }

  getImages() {
    return this.http.get('http://localhost:3000/getallfiles');
    
  }

  upload() {
    this.progress.percentage = 0;
    this.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    })
  }
  completeUpload() {
    this.currentFileUpload = null;
    this.showProgressBar = false;
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    this.showProgressBar = true;
    let formdata: FormData = new FormData();
    console.log(formdata);
    formdata.append('file', file);
    console.log(file.name);

    const req = new HttpRequest('POST', 'http://localhost:3000/upload', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  
    //    return promise;
    //   return 
    //     .then((response) => {
    //   for (let name of file_names) {
    //     console.log(name)
    //   }
    //     return 
    // }
  }

