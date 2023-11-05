import { Component, OnInit } from '@angular/core';
import { prefrencesService } from 'src/app/core/services/prefrences.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  count : number = 0;
  constructor(
    private service : prefrencesService
  ) { }

  ngOnInit(): void {
    this.service.preferencesCountObservable.subscribe((data : number)=>{
      this.count= data ;
    });
  }

}
