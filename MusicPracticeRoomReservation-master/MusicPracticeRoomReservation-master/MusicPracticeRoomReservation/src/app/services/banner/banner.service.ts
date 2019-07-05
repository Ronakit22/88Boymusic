import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BannerService {

  private url: string = "http://localhost:8081/banner/";

  constructor(private http: HttpClient) { }

  getAllBanner() {
    return this.http.get(this.url).pipe();
  }

  getBannerById(img_name : any){
    return this.http.get(this.url + img_name, { responseType: 'text' });
  }


}
