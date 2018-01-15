import {Injectable} from '@angular/core';
import { HttpClient, HttpEvent
  ,HttpResponse, HttpInterceptor,
  HttpEventType, HttpHandler, HttpRequest} from '@angular/common/http';
import { Image, ResponseImage } from './image.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/Rx'


@Injectable()
export class UploadFileService {
  data: Object;
  
  public results: ResponseImage[]; 

  uploadedFiles: Array<Image>;
  currentFileUpload: File
  showProgressBar: Boolean = false;
  showUploadButton: Boolean = false;
  progress: { percentage: number } = { percentage: 0 }
  selectedImage: Image = null;
  imgSrc: string = null;
  disText: string = "Select or drop an image to get started!";
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

  constructor(private http: HttpClient) {
 }
  getImages(): Promise<any> {
    return this.http.get('http://localhost:3000/getallfiles')
      .toPromise()
      .then((response: Response) => {
        //console.log(response)
        return response;
      });
  }
//   get_products(): Observable<any> {
//     return this.http.get('http://localhost:3000/getallfiles');
// }
//   get_families() {
//     return this.http.get('http://localhost:3000/getallfiles').map({res => return res;});
//   }
//   get_locations() {
//     return this.http.get('http://localhost:3000/getallfiles');
//   }
  
//     setImages()
//     {
//       this.http.get<ResponseImage[]>('http://localhost:3000/getallfiles')
//         .subscribe(data => {
//           // data is now an instance of type ItemsResponse, so you can do this:
//           this.results = data;
//           // console.log(4)
//         });
//   }
    
  // getImages(): void {
  //   // getImages(): Observable<ResponseImage[]> {
    
      // });
      // .catch((error:any)) => Observable.throw(Error)

        // .toPromise()
        // .then(res => res as ResponseImage[]);
        // .catch(this.handleError);
  
      // .map((response: Response) => {
      //   return (
        //   <any>response. .items.map(item => {
        //   // console.log("raw item", item); // uncomment if you want to debug return new SearchResult({
        //   id: item.id.videoId,
        //   title: item.snippet.title,
        //   description: item.snippet.description,
        //   thumbnailUrl: item.snippet.thumbnails.high.url
        // });
      

     
      
      
    
  
  // setImages() {
  //   return this.getImages().then((data: ResponseImage[]) => {
  //     console.log(data)
  //     this.images = data
  //   })
  //     .catch((e: Error) => console.error(e));

  // }

  
  
    //    return promise;
    //   return 
    //     .then((response) => {
    //   for (let name of file_names) {
    //     console.log(name)
    //   }
    //     return 
    // }
  }

