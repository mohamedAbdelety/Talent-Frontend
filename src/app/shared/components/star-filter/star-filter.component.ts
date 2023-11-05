import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { starFilter } from 'src/app/core/models/starFilter';

@Component({
  selector: 'app-star-filter',
  templateUrl: './star-filter.component.html',
  styleUrls: ['./star-filter.component.css']
})
export class StarFilterComponent implements OnInit {
  starFilter = new starFilter;
  @Output() filterEvent = new EventEmitter<starFilter>();
  constructor() { }

  ngOnInit(): void {
  }
  changeItem(){
    this.filterEvent.emit(this.starFilter);
  }

}
