import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './material.module';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { AppRoutingModule } from '../app-routing.module';
import { TalentFilterComponent } from './components/talent-filter/talent-filter.component';
import { FormsModule } from '@angular/forms';
import { StarFilterComponent } from './components/star-filter/star-filter.component';
import { RouterModule } from '@angular/router';
import { TalentComponent } from './components/talent/talent.component';
import { UploadFileDialogComponent } from './components/upload-file-dialog/upload-file-dialog.component';

@NgModule({
  declarations: [
    LoaderSpinnerComponent,
    HeaderComponent,
    FooterComponent,
    TalentComponent,
    UploadFileDialogComponent,
    BreadcrumbComponent,
    TalentFilterComponent,
    StarFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    FormsModule
  ],
  exports:[
    LoaderSpinnerComponent,
    HeaderComponent,
    FooterComponent,
    TalentComponent,
    UploadFileDialogComponent,
    BreadcrumbComponent,
    TalentFilterComponent,
    StarFilterComponent
  ]
})
export class SharedModule { }
