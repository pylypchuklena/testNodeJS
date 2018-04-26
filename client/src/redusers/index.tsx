import { AppState, User } from "../types/userModel";
import { IAction } from "../action";
import * as constants from '../constants';
import { combineReducers } from "redux";
import Auth from "../models/Auth";


// function selectedUser(users: User[], item: User): User[] {
//   return users.map(user => {
//     if (user.id != item.id) {
//       if (user.isSelected)
//         return { ...user, isSelected: false } as User;
//       return user;
//     }
//     return { ...user, isSelected: true } as User;
//   })
// }

function updateUser(users: User[], item: User): User[]{
  return users.map(user=>{
    if(user.id == item.id){
      return item;
    }
    return user;
  })
}

function deleteUser(users: User[], item: User): User[]{
  return users.filter(user=>{ return user.id != item.id })
}

const initialState = new AppState()

function statusReducer(state: string, action: any): string {
  switch (action.type) {
    case constants.SHOW_STATUS:
      return action.value;
    default:
      return "";
  }
}

function getAllUsers(users: User[], item: any): User[]{

  var itemId = Auth.getAuthUser();  ///figna
  return users.filter(user=>{ return user.id != itemId })
}

function userReduser(state: User[] = [], action: IAction): User[] {
  switch (action.type) {
    case constants.GET_ALL_USER:
      return action.value;
    case constants.DELETE_USER:
      return deleteUser(state, action.value as User)
    case constants.UPDATE_USER:
      return updateUser(state, action.value as User)
    default: {
      return state
    }
  }
}

export const rootReducer = combineReducers<AppState>({
  status: statusReducer,
  users: userReduser
})

export default rootReducer;