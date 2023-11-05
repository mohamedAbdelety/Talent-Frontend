import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Talent } from 'src/app/core/models/Talent';
import { publicService } from 'src/app/core/services/public-service.service';
import { TalentComponent } from '../../../shared/components/talent/talent.component';

@Component({
  selector: 'app-talents',
  templateUrl: './talents.component.html',
  styleUrls: ['./talents.component.css']
})
export class TalentsComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'phone','gender','birthdate','action'];
  dataSource = new MatTableDataSource<Talent>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private service : publicService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.service.getAll('Talent/GetAllTalents').subscribe((res : Talent[])=>{
      this.dataSource.data = res;
      console.log(res);
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id : string){
    this.service.Remove(null,'talent/delete/'+id).subscribe((res)=>{
      this.loadData();
    })
  }
  reverseStatus(id : string){
    this.service.patch('talent/ReverseApproveStatus/'+id,null).subscribe((res)=>{
      this.loadData();
    })
  }
  onView(talent : Talent){
    this.dialog.open(TalentComponent, {
      data: [talent,false],
      autoFocus: false,
      panelClass: 'talent-dialog',
      width: '800px', height: '600px',
    });
  }

}
