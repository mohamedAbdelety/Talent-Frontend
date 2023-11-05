import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TalentsComponent } from './talents/talents.component';
import { HomeComponent } from './home/home.component';
import { HiringComponent } from './hiring/hiring.component';
import { StarComponent } from './star/star.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'talent', pathMatch: 'full' },
      { path: 'talent', component: TalentsComponent },
      { path: 'hiring', component: HiringComponent },
      { path: 'star', component: StarComponent },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
