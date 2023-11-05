import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Star } from 'src/app/core/models/star';
import { prefrencesService } from 'src/app/core/services/prefrences.service';

@Component({
  selector: 'app-star-card-dialog',
  templateUrl: './star-card-dialog.component.html',
  styleUrls: ['./star-card-dialog.component.css']
})
export class StarCardDialogComponent implements OnInit {
  images : any[] = [];
  selectedIndex = 0;
  star : Star;
  hireBtn : boolean = true;
  constructor(
    private dialogRef: MatDialogRef<StarCardDialogComponent>,
    private service : prefrencesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _sanitizer: DomSanitizer
  ) {
    this.star = data[0];
    this.hireBtn = data[1];
   }

  ngOnInit(): void {
    this.images.push(this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                 + this.star.img));
    this.star.medias.map(m =>{
        this.images.push(
          this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                   + m)
        );
    });
  }
  makeDeal(){
    this.service.hirePerson(this.star.personId);
    this.dialogRef.close(true);
  }
  close(){
    this.dialogRef.close(false);
  }
}
