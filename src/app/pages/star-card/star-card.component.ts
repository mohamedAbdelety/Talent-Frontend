import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StarCardDialogComponent } from '../star-card-dialog/star-card-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Star } from 'src/app/core/models/star';
import { prefrencesService } from 'src/app/core/services/prefrences.service';

@Component({
  selector: 'app-star-card',
  templateUrl: './star-card.component.html',
  styleUrls: ['./star-card.component.css']
})
export class StarCardComponent implements OnInit {
  @Input() star : Star;
  starImg : any;
  constructor(
    private dialog: MatDialog,
    private _sanitizer: DomSanitizer,
    private service : prefrencesService
  ) { }
  ngOnInit(): void {
    this.starImg = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                 + this.star.img);
  }
  viewImgs(){
      const dialogRef = this.dialog.open(StarCardDialogComponent, {
        data: [this.star,true],
        autoFocus: false,
        width: '450px', height: '600px',
      });
      dialogRef.afterClosed().subscribe(hiring => {
        if(hiring) this.star.isPrefered = true;
      });
  }
  makeDeal(){
    this.service.hirePerson(this.star.personId);
    this.star.isPrefered = true;
  }
}
