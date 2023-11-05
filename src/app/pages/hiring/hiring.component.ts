import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Preference } from 'src/app/core/models/Preference';
import { prefrencesService } from 'src/app/core/services/prefrences.service';
import { publicService } from 'src/app/core/services/public-service.service';

@Component({
  selector: 'app-hiring',
  templateUrl: './hiring.component.html',
  styleUrls: ['./hiring.component.css']
})
export class HiringComponent implements OnInit {
  data : Preference[] = [];
  validMsg : string = "Looks good ✅";
  invalidMsg : string = "The field is not valid";
  validPhone : boolean = false;
  hiringFormGroup = this._formBuilder.group({
    name: this._formBuilder.control('',[Validators.required,Validators.minLength(3)]),
    email: this._formBuilder.control('',[Validators.required,Validators.email]),
    phone: this._formBuilder.control('',[Validators.required]),
    description: this._formBuilder.control('',[Validators.required,Validators.minLength(10)])
  })
  constructor(
    private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    private prefService : prefrencesService,
    private _sanitizer: DomSanitizer,
    private service : publicService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.prefService.getPrefrences();
    this.prefService.preferencesListObservable
    .subscribe((res : Preference[])=>{
      this.data = res;
    })
  }

  getImgSrc(idx : number){
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                 + this.data[idx].img);
  }

  delete(idx){
    this.prefService.deletePrefrences(idx);
  }


  onNumberChange(isValid : boolean) {
    this.validPhone = isValid;
  }

  onSubmit(){
    if(this.hiringFormGroup.valid){
      this.service.post(this.hiringFormGroup.value, 'Contract').subscribe((res)=>{
        this.prefService.reset();
        this.router.navigate(['/look']);
        this.snackBar.open("Your Contract Added Successfully", "X",{
          duration: 3500
        });
      });
    }
  }

}
