import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Talent } from 'src/app/core/models/Talent';
import { MediaType } from 'src/app/core/models/enums';
import { prefrencesService } from 'src/app/core/services/prefrences.service';

@Component({
  selector: 'app-talent',
  templateUrl: './talent.component.html',
  styleUrls: ['./talent.component.css']
})
export class TalentComponent implements OnInit {
  imagePaths : any[] = [];
  hireBtn : boolean = false;
  talent : Talent;
  selectedIndex = 0;
  constructor(
    private dialogRef: MatDialogRef<TalentComponent>,
    private service : prefrencesService,
		@Inject(MAT_DIALOG_DATA) public data: any,
    private _sanitizer: DomSanitizer
  ) {
    this.talent = data[0];
    this.hireBtn = data[1];
  }

  ngOnInit(): void {
    this.imagePaths.push(this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                 + this.talent.img));
    this.talent.medias.map(m =>{
      if(m.type == MediaType.Image){
        this.imagePaths.push(
          this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                   + m.content)
        );
      }
    });
  }
  close(){
    this.dialogRef.close(false);
  }
  makeDeal(){
    this.service.hirePerson(this.talent.personId);
    this.dialogRef.close(true);
  }
}
