import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { publicService } from 'src/app/core/services/public-service.service';
import {EthnicityType,BodyType,ColorType} from 'src/app/core/models/enums';
import { SocailMedia } from 'src/app/core/models/SocailMedia';
@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css'],

})
export class JoinComponent implements OnInit {
  firstNextClicked : boolean = false;
  secondNextClicked : boolean = false;
  thirdNextClicked : boolean = false;
  public EthnicityTypeEnum = EthnicityType;
  public BodyTypeEnum = BodyType;
  public ColorTypeEnum = ColorType;
  uploadedImgUrl : string = "";
  uploadedImg : File;
  // additional images
  uploadedImageUrls: string[] = [];
  uploadedImages: File[] = [];
  validMsg : string = "Looks good ✅";
  invalidMsg : string = "The field is not valid";
  validPhone : boolean = false;

  talentFormGroup = this._formBuilder.group({
    personal : this._formBuilder.group({
      name: this._formBuilder.control('',[Validators.required,Validators.minLength(3)]),
      email: this._formBuilder.control('',[Validators.required,Validators.email]),
      gender: this._formBuilder.control('...',this.validSelect),
      phone: this._formBuilder.control('',[Validators.required]),
      birthdate : this._formBuilder.control(null,[Validators.required]),
      body: this._formBuilder.control('...',this.validSelect),
      ethnicity: this._formBuilder.control('...',this.validSelect),
      hair: this._formBuilder.control('...',this.validSelect),
      eye: this._formBuilder.control('...',this.validSelect),
      weight: this._formBuilder.control(70,Validators.required),
      height: this._formBuilder.control(175,Validators.required)
    }),
    experience : this._formBuilder.group({
      education: this._formBuilder.control('',Validators.required),
      previousProject: this._formBuilder.control('',Validators.required),
      award: this._formBuilder.control('',Validators.required),
      training: this._formBuilder.control('',Validators.required)
    }),
    uploads : this._formBuilder.group({
      img : this._formBuilder.control(null,[Validators.required])
    }),
    additional : this._formBuilder.group({
      socailMedias : this._formBuilder.array([
        this.initSocailMedia()
      ], this.uniqueItemsValidator())
    }),
  })

  constructor(
    private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    private service : publicService
  ) { }

  ngOnInit(): void {
  }
  getpersonalForm() : FormGroup{
    return this.talentFormGroup.get("personal") as FormGroup;
  }
  getexperienceForm() : FormGroup{
    return this.talentFormGroup.get("experience") as FormGroup;
  }
  getUploadForm() : FormGroup{
    return this.talentFormGroup.get("uploads") as FormGroup;
  }
  getAdditionalForm() : FormGroup{
    return this.talentFormGroup.get("additional") as FormGroup;
  }
  validSelect(input : AbstractControl){
    if(input.value == "...") return {notfound:true};
    return null;
  }
  onSubmit(){
    if(this.talentFormGroup.valid){
      this.addTalent();
    }
  }
  addTalent(){
    let obj = Object.assign({}, this.talentFormGroup.value);
    let talent = this.flattenObj(obj);
    let formdata = new FormData()
    for ( var key in talent ) {
      if(key == 'img')formdata.append('person.img', this.uploadedImg);
      else if(key == 'name')formdata.append('person.name', talent[key]);
      else if(key == 'socailMedias'){
        talent[key].forEach((obj, index) => {
          for (const attr in obj)
              formdata.append(`person.socailMedias[${index}].${attr}`, obj[attr]);
        });
      }
      else formdata.append(key, talent[key]);
    }
    for (let i = 0; i < this.uploadedImages.length; i++)
      formdata.append('person.imgs',this.uploadedImages[i]);
    this.service.post(formdata, 'talent').subscribe((res)=>{
      this.talentFormGroup.reset();
      this.redirect();
      this.snackBar.open(res.person.name+" Added Successfully", "X",{
        duration: 3500
      });
    })
  }
  preview(e : any){
    if(e.target.files){
      this.uploadedImg = e.target.files[0];
      let reader = new FileReader()
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event : any) => {
        this.uploadedImgUrl = event.target.result;
      }
    }
  }
  redirect(){
    this.router.navigate(['/admin/talent']);
  }
  flattenObj(ob){
    let result = {};
    for (const i in ob) {
        if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
            const temp = this.flattenObj(ob[i]);
            for (const j in temp) {
                result[j] = temp[j];
            }
        }
        else {
            result[i] = ob[i];
        }
    }
    return result;
  }
  iterateEnum(obj : any){
    return Object.values(obj);
  }
  private initSocailMedia(): FormGroup {
    return new FormGroup({
      website: this._formBuilder.control('...',this.validSelect),
      link: new FormControl('', [Validators.required])
    })
  }
  get socailMediaFormArr() {
    return this.getAdditionalForm().get('socailMedias') as FormArray;
  }
  public AddSocailProfile() {
      this.socailMediaFormArr.push(this.initSocailMedia())
  }
  removeWebsite(idx : number){
    this.socailMediaFormArr.removeAt(idx);
  }

  uniqueItemsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const items = control.value as SocailMedia[];
      // Check for duplicates
      const duplicateItems = items.filter((item, index) =>
        items.findIndex(i => i.website === item.website) !== index
      );
      // Return validation error if duplicates are found
      return duplicateItems.length > 0 ? { duplicates: true } : null;
    };
  }

  onNumberChange(isValid : boolean) {
    this.validPhone = isValid;
  }

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.uploadedImages.push(files[i]);
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImageUrls.push(reader.result as string);
      };
      reader.readAsDataURL(files[i]);
    }
  }
}
