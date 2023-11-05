
import { SocailMedia } from "./SocailMedia";
import { BodyType, ColorType, EthnicityType, MediaType } from "./enums";
export class Talent{
  id: string;
  personId : string;
  createdOn : Date;
  modifiedOn : Date;
  name: string;
  email: string;
  gender: string;
  phone: string;
  birthDate:Date;
  weight : number;
  height : number;
  hair : ColorType;
  eye : ColorType;
  body : BodyType;
  ethnicity : EthnicityType;
  education : string;
  previousProject: string;
  award : string;
  training : string;
  img:any;
  isPrefered : boolean;
  isApproved : boolean;
  medias : Media[];
  socailMedias: SocailMedia[];
}

export class Media{
  content : any;
  type : MediaType;
}

