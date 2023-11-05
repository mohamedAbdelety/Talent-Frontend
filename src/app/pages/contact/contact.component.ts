import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { publicService } from 'src/app/core/services/public-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  validMsg : string = "Looks good ✅";
  invalidMsg : string = "The field is not valid ❌";
  contactFormGroup = this._formBuilder.group({
      name: this._formBuilder.control('',[Validators.required,Validators.minLength(3)]),
      email: this._formBuilder.control('',[Validators.required,Validators.email]),
      message: this._formBuilder.control('',[Validators.required,Validators.minLength(5)])
  })
  constructor(
    private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    private service : publicService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.contactFormGroup.valid){
      this.contactFormGroup.reset();
      this.snackBar.open("Your Message Added Successfully", "X",{
        duration: 3500
      });
    }
  }
}
