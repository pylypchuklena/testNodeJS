export class User {
  id:string;
  name: string;
  email: string;
  token: string;
}

export class Errors {
  fieldName: string;
  fieldPassword: string;
  fieldEmail: string;
  fieldConfirm: string;
  summary: string;
  [k: string]: any;
}

export class AppState{
  isUser: boolean;
  status:string;
  loggedInUser:User
}