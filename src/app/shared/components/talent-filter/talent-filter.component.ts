import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BodyType, ColorType, EthnicityType } from 'src/app/core/models/enums';
import { talentFilter } from 'src/app/core/models/talentFilter';

@Component({
  selector: 'app-talent-filter',
  templateUrl: './talent-filter.component.html',
  styleUrls: ['./talent-filter.component.css']
})
export class TalentFilterComponent implements OnInit {
  public EthnicityTypeEnum = EthnicityType;
  public BodyTypeEnum = BodyType;
  public ColorTypeEnum = ColorType;
  talentFilter = new talentFilter;
  @Output() filterEvent = new EventEmitter<talentFilter>();
  constructor() { }

  ngOnInit(): void {
  }
  iterateEnum(obj : any){
    return Object.values(obj);
  }
  changeItem(){
    this.filterEvent.emit(this.talentFilter);
  }
}
