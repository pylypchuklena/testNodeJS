export class User {
  id:string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

export class Errors {
  fieldName: string;
  fieldPassword: string;
  fieldEmail: string;
  fieldConfirm: string;
  summary: string;
  [k: string]: any;
}
export class Order{
  userId: string;
  type: string[];
  orderDate: string;
  orderId:string;
  dayOfOrder:string;
  isActive: boolean;
  orderStatus:number;
}
export class Service{
  _id:string;
  type:number;
  name:string;
  price:number;
  description:string;
}

export class AppState{
  status:string;
  users: User[];
  orders: Order[];
  services:Service[];
}