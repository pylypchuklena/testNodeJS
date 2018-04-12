import * as constants from '../constants';
import { User, AppState } from '../types/userModel';
import fetch from 'node-fetch';

export interface IAction{
  type: string;
  value:any;
}

export function addUser(item:User):IAction{
  return{
    type: constants.ADD_USER,
    value: item
  }
}
export function toggleButton(isUser:boolean):IAction{
  
  return{
    type: constants.TOGGLE_USER,
    value: isUser
  }
}
export function signUpStatus(status:string):IAction{
  return{
    type: constants.SHOW_STATUS,
    value: status
  }
}


export function logInUser(user:User):IAction{
  return{
    type: constants.LOGGED_IN_USER,
    value: user
  }
}


export function logOutUser():IAction{
  return{
    type: constants.LOGGED_OUT_USER,
    value: null
  }
}