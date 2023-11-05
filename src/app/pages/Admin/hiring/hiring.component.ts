import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Star } from 'src/app/core/models/star';
import { publicService } from 'src/app/core/services/public-service.service';
import { StarCardDialogComponent } from '../../star-card-dialog/star-card-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Contract } from 'src/app/core/models/Contract';
import { ContarctDialogComponent } from '../contarct-dialog/contarct-dialog.component';

@Component({
  selector: 'app-hiring',
  templateUrl: './hiring.component.html',
  styleUrls: ['./hiring.component.css']
})
export class HiringComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'phone','action'];
  dataSource = new MatTableDataSource<Contract>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private service : publicService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.service.getAll('Contract/all').subscribe((res : Contract[])=>{
      this.dataSource.data = res;
      console.log(res);
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id : string){
    this.service.Remove(null,'Contract/delete/'+id).subscribe((res)=>{
      this.loadData();
    })
  }


  onView(Contract : Contract){
    this.dialog.open(ContarctDialogComponent, {
      data: Contract,
      autoFocus: false,
      width: '450px', height: '500px',
    });
  }

}
