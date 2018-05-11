import { AppState, User, Order, Service } from "../types/userModel";
import { IAction } from "../action";
import * as constants from '../constants';
import { combineReducers } from "redux";
import Auth from "../models/Auth";



function updateUser(users: User[], item: User): User[] {
  return users.map(user => {
    if (user.id == item.id) {
      return item;
    }
    return user;
  })
}

function deleteUser(users: User[], item: User): User[] {
  return users.filter(user => { return user.id != item.id })
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

function orderReduser(state: Order[] = [], action: IAction): Order[] {
  switch (action.type) {
    case constants.GET_ALL_ORDERS:
      return action.value;
    case constants.UPDATE_ORDER:
      return updateOrder(state,action.value);
    default: {
      return state
    }
  }
}

function serviceReduser(state: Service[] = [], action: IAction): Service[] {
  switch (action.type) {
    case constants.GET_ALL_SERVICES:
      return action.value;
    default: {
      return state
    }
  }
}

function updateOrder(state: Order[],order:Order):Order[]{
  return state.map(item=>{
    if(item.orderId == order.orderId)
     return order;
    return item;
  })
}

export const rootReducer = combineReducers<AppState>({
  status: statusReducer,
  users: userReduser,
  orders: orderReduser,
  services:serviceReduser
})

export default rootReducer;