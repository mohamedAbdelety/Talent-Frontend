import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  env = environment;
  acceptedExtentions: string[] = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv'];
  constructor(private http: HttpClient) { }

  upload(formData: FormData, url: string) {
    return this.http.post(this.env.baseUrl + url, formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }


  uploadReturnedJson(formData: FormData, url: string) {
    return this.http.post(this.env.baseUrl + url, formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'json'
    });
  }

  validFile(file: File): boolean {
    if (this.acceptedExtentions.indexOf(file.type) == -1) {
      return false;
    }
    return true;
  }

}
