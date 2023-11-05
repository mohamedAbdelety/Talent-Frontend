import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { publicService } from './public-service.service';
import { Preference } from '../models/Preference';


@Injectable({
  providedIn: 'root'
})
export class prefrencesService {
  data : Preference[] = [];
  preferencesCountSubject = new Subject<number>();
  preferencesListSubject = new Subject<Preference[]>();

  constructor(private service : publicService){
    this.getPrefrences();
  }

  hirePerson(personId : string){
    let formdata = new FormData();
    formdata.append('personId',personId);
    this.service.post(formdata,'Preference').subscribe((obj : Preference)=>{
      if(obj == null) return;
      this.data.push(obj);
      this.preferencesCountSubject.next(this.data.length);
      this.preferencesListSubject.next(this.data);
    });
  }

  getPrefrences(){
    this.service.getData('Preference/list')
    .subscribe((res : Preference[])=>{
      this.data = res;
      this.preferencesCountSubject.next(this.data.length);
      this.preferencesListSubject.next(this.data);
    })
  }

  get preferencesCountObservable(): Observable<number> {
    return this.preferencesCountSubject.asObservable();
  }

  get preferencesListObservable(): Observable<Preference[]> {
    return this.preferencesListSubject.asObservable();
  }

  deletePrefrences(idx){
    this.service.Remove(this.data[idx].id,'Preference').subscribe(()=>{
      this.data.splice(idx,1);
      this.preferencesCountSubject.next(this.data.length);
      this.preferencesListSubject.next(this.data);
    })
  }
  reset(){
    this.data = [];
    this.preferencesCountSubject.next(this.data.length);
    this.preferencesListSubject.next(this.data);
  }

}
