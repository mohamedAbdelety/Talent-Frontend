import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Talent } from 'src/app/core/models/Talent';
import { publicService } from 'src/app/core/services/public-service.service';
import { TalentComponent } from '../../shared/components/talent/talent.component';
import { DomSanitizer } from '@angular/platform-browser';
import { talentFilter } from 'src/app/core/models/talentFilter';
import { PagedApiResponse, PaginationRequest } from 'src/app/core/models/PagedApiResponse';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-look-listen',
  templateUrl: './look-listen.component.html',
  styleUrls: ['./look-listen.component.css']
})
export class LookListenComponent implements OnInit {
  dataSource = new MatTableDataSource<Talent>();
  @ViewChild(MatSort)
  sort!: MatSort;
  filter : talentFilter;
  public currentPaginator: PagedApiResponse<any> = new PagedApiResponse();

  constructor(
    private service : publicService,
    private dialog: MatDialog,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loadData(new PaginationRequest())
  }

  loadData(pageination: PaginationRequest){
    this.service.getData('Talent/GetApprovedTalents',{ ...this.filter, ...pageination })
    .pipe(
      map((data: PagedApiResponse<any>) => {
        this.currentPaginator = data;
        return data.data;
      })
    )
    .subscribe((res : Talent[])=>{
      this.dataSource.data = res;
    })
  }
  ngAfterViewInit() {
    this.loadData(new PaginationRequest());
  }

  onView(talent : Talent){
    const dialogRef = this.dialog.open(TalentComponent, {
      data: [talent,true],
      autoFocus: false,
      panelClass: 'talent-dialog',
      width: '800px', height: '600px',
    });
    dialogRef.afterClosed().subscribe(hiring => {
      if(hiring)
        this.loadData(new PaginationRequest())
    });
  }
  getImgUrl(img : any){
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                 + img);
  }

  applyFilter(filterObj : talentFilter){
    this.filter = filterObj;
    this.loadData(new PaginationRequest())
  }

  onPageChange(pageEvent: PageEvent) {
    const paginationRequest = pageEvent
      ? new PaginationRequest({ pageNumber: pageEvent.pageIndex, pageSize: pageEvent.pageSize })
      : new PaginationRequest();
    this.loadData(paginationRequest);
  }

}
