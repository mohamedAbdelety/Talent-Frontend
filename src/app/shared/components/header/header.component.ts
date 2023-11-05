import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { publicService } from 'src/app/core/services/public-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service : publicService,private router : Router) { }

  ngOnInit(): void {
  }
  reset(){
    this.service.Remove(null,'Retention').subscribe((res)=>{
      this.router.navigate(['/look']);
    })
  }
}
