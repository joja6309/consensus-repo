import { Injectable } from '@angular/core';
import {
  HttpClient, HttpEvent
  , HttpResponse, HttpInterceptor,
  HttpEventType, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Image } from './image.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class BackendService {
  ngOnInit() {

  }


  constructor(private http: HttpClient) {
  }
  getImages() {
    return this.http.get('http://localhost:3000/getallfiles');
  }
}

