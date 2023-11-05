import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.css']
})
export class UploadFileDialogComponent implements OnInit {
  stopIconUrl: string = "../../../assets/Icons/close.svg";
  constructor(private dialogRef: MatDialogRef<UploadFileDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { type: string, fileName: string, progress: number }) {
  }

  ngOnInit(): void {
  }

  onExit(): void {
    this.dialogRef.close("cancel")
  }

}
