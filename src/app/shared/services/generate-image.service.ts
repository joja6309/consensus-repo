import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Injectable()
export class GenerateImageService {

	private service: any = new Subject();
	public store: Observable<any> = this.service.asObservable();

	public generateImage() {
		this.service.next();
	}

}
