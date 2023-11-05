import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinComponent } from './pages/join/join.component';
import { TalentsComponent } from './pages/Admin/talents/talents.component';
import { LookListenComponent } from './pages/look-listen/look-listen.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { StarsComponent } from './pages/stars/stars.component';
import { HiringComponent } from './pages/hiring/hiring.component';

const routes: Routes = [
  // admin
  {
    path: 'admin',
    loadChildren: () => import('./pages/Admin/Admin.module').then((m) => m.AdminModule)
  },
  { path:'join', component:JoinComponent,pathMatch:"full"},
  { path:'look', component:LookListenComponent,pathMatch:"full"},
  { path:'about', component:AboutComponent,pathMatch:"full"},
  { path:'contact', component:ContactComponent,pathMatch:"full"},
  { path:'starts', component:StarsComponent,pathMatch:"full"},
  { path:'hiring', component:HiringComponent,pathMatch:"full"},
  {path:'**',redirectTo:'join',pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
