import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Contract } from 'src/app/core/models/Contract';

@Component({
  selector: 'app-contarct-dialog',
  templateUrl: './contarct-dialog.component.html',
  styleUrls: ['./contarct-dialog.component.css']
})
export class ContarctDialogComponent implements OnInit {
  data : any[];
  constructor(
    private dialogRef: MatDialogRef<ContarctDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public contract: Contract,
    private _sanitizer: DomSanitizer

  ) {
    console.log(contract);
    this.data = contract.contractItems;
   }

  ngOnInit(): void {
  }
  getImgSrc(idx : number){
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                 + this.data[idx].img);
  }
}
