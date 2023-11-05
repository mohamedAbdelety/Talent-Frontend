import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';
import { TalentsComponent } from './talents/talents.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { StarComponent } from './star/star.component';
import { HiringComponent } from './hiring/hiring.component';
import { ContarctDialogComponent } from './contarct-dialog/contarct-dialog.component';



@NgModule({
  declarations: [
    HomeComponent,
    TalentsComponent,
    StarComponent,
    HiringComponent,
    ContarctDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    SharedModule,
    FormsModule
  ],
  exports:[

  ]
})
export class AdminModule { }
