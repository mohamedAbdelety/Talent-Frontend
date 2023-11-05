import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Star } from 'src/app/core/models/star';
import { publicService } from 'src/app/core/services/public-service.service';
import { StarCardDialogComponent } from '../../star-card-dialog/star-card-dialog.component';
import { UploadService } from 'src/app/core/services/upload.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { UploadFileDialogComponent } from 'src/app/shared/components/upload-file-dialog/upload-file-dialog.component';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
  progress = 0;
  displayedColumns: string[] = ['name', 'followers', 'following','uploads','action'];
  dataSource = new MatTableDataSource<Star>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private service : publicService,
    private dialog: MatDialog,
    private _uploadService: UploadService,
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.service.getAll('Star/all').subscribe((res : Star[])=>{
      this.dataSource.data = res;
      console.log(res);
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id : string){
    this.service.Remove(null,'Star/delete/'+id).subscribe((res)=>{
      this.loadData();
    })
  }

  reverseStatus(id : string){
    this.service.patch('Star/ReverseApproveStatus/'+id,null).subscribe((res)=>{
      this.loadData();
    })
  }
  onView(star : Star){
    this.dialog.open(StarCardDialogComponent, {
      data: [star,false],
      autoFocus: false,
      width: '450px', height: '600px',
    });
  }

  onUploadFile(event: any) {
    let file = ((event.target as HTMLInputElement).files as FileList)[0];
    if (!this._uploadService.validFile(file)) {
      this._sharedService.openRedSnackBar(`${file.type} is not supported extention`, 3000)
      return;
    }
    (event.target as HTMLInputElement).value = "";
    const formdata = new FormData();
    formdata.append('File', file);

    let dialogRef = this._sharedService.openDialog(UploadFileDialogComponent, {
      disableClose: true,
      width: '62.75rem',
      height: '27.313rem',
      data: {
        fileName: file.name,
        type: "Schedule",
        progress: this.progress
      }
    })

    this._uploadService.uploadReturnedJson(formdata, 'Star/import').subscribe(
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          let total = event.total || 1;
          this.progress = Math.round(100 * event.loaded / total);
          dialogRef.componentInstance.data = {
            fileName: file.name,
            type: "Star",
            progress: this.progress
          };
        } else if (event instanceof HttpResponse) {
          this.progress = 0;
          dialogRef.close()
          this.loadData();
        }
      }, async (error) => {
        console.log("error here !");
        dialogRef.close();
        if (error.status != 200) {
          let errorMsg = "Internal Server Error";
          if (error.status < 500)
            errorMsg = await error?.error?.text();
          this._sharedService.openRedSnackBar(errorMsg, 7000)
        }
      });

  }


}
