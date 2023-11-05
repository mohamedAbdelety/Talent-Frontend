import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PagedApiResponse, PaginationRequest } from 'src/app/core/models/PagedApiResponse';
import { talentFilter } from 'src/app/core/models/talentFilter';
import { Talent } from 'src/app/core/models/Talent';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { publicService } from 'src/app/core/services/public-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Star } from 'src/app/core/models/star';
import { starFilter } from 'src/app/core/models/starFilter';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  dataSource = new MatTableDataSource<Star>();
  @ViewChild(MatSort)
  sort!: MatSort;
  filter : starFilter;
  public currentPaginator: PagedApiResponse<any> = new PagedApiResponse();

  constructor(
    private service : publicService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData(new PaginationRequest())
  }

  loadData(pageination: PaginationRequest){
    this.service.getData('Star',{ ...this.filter, ...pageination })
    .pipe(
      map((data: PagedApiResponse<any>) => {
        this.currentPaginator = data;
        return data.data;
      })
    )
    .subscribe((res : Star[])=>{
      this.dataSource.data = res;
    })
  }
  ngAfterViewInit() {
    this.loadData(new PaginationRequest());
  }

  applyFilter(filterObj : starFilter){
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
