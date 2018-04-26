export class User {
  id:string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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
  status:string;
  users: User[];
}