import * as constants from '../constants';
import { User, AppState, Order, Service } from '../types/userModel';
import axios from 'axios';
import Auth from '../models/Auth';

export interface IAction {
  type: string;
  value: any;
}

export function addUser(item: User): IAction {
  return {
    type: constants.ADD_USER,
    value: item
  }
}
export function signUpStatus(status: string): IAction {
  return {
    type: constants.SHOW_STATUS,
    value: status
  }
}


export function logInUser(user: User): IAction {
  return {
    type: constants.LOGGED_IN_USER,
    value: user
  }
}


export function logOutUser(): IAction {
  return {
    type: constants.LOGGED_OUT_USER,
    value: null
  }
}
export function getUsersFromDB(): any {
  return (dispatch: any) => {
    return axios.get('/api/dashboard',
      {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `bearer ${Auth.getToken()}`
        }
      }).then((res) => {
        if (res.status === 200) {
          dispatch(getAllUser(res.data.users))
          
        }
      })
  }
}

export function getAllUser(items: any): IAction {

  return {
    type: constants.GET_ALL_USER,
    value: items
  }
}


export function updateDataUser(user: User): any {
  return (dispatch: any) => {
    return axios({
      method: 'put',
      url: `/api/profile/${user.id}`,
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
      },
      headers: {
        'Content-type': 'application/json',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    }).then((res) => {
      if (res.status === 200) {
        dispatch(updateUser(res.data.user))
      }
    }
    )
  }
}
export function updateUser(user: User): IAction {
  //map user if need
  return {
    type: constants.UPDATE_USER,
    value: user
  }
}
export function deleteUserFromDB(user: User): any {
  return (dispatch: any) => {
    return axios({
      method: 'delete',
      url: `/api/profile/${user.id}`,
      data: user,
      headers: {
        'Content-type': 'application/json',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    }).then((res) => {
      if (res.status === 200) {
        dispatch(deleteUser(res.data.user))
      }
    }
    )
  }
}

export function deleteUser(user: User): IAction {
  //map user if need
  return {
    type: constants.DELETE_USER,
    value: user
  }
}
export function getOrdersFromDB(): any {
  return (dispatch: any) => {
    return axios.get('/api/order',
      {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `bearer ${Auth.getToken()}`
        }
      }).then((res) => {
        if (res.status === 200) {
          var filteringOrders = res.data.orders;
          var authUser = Auth.getAuthUser();

          if (authUser.role == 'user') {
            filteringOrders = res.data.orders.filter((order: Order) => {
              return authUser.id == order.userId
            })
          }

          dispatch(getAllOrders(filteringOrders))
        }

      })
  }
}

export function updateOrderInDB(order:Order): any {
  return (dispatch: any) => {
    return axios({
      method: 'put',
      url: `/api/order/${order.orderId}`,
      data: {
        type: order.type,
        isActive: order.isActive,
        orderDate: order.orderDate,
        orderStatus: order.orderStatus
      },
      headers: {
        'Content-type': 'application/json',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    }).then((res) => {
      if (res.status === 200) {
        dispatch(updateOrder(res.data.order))
      }
    }
    )
  }
}

export function updateOrder(order:any):IAction{
  return {
    type: constants.UPDATE_ORDER,
    value: order
  }
}

export function getAllOrders(orders: Order[]): IAction {
  return {
    type: constants.GET_ALL_ORDERS,
    value: orders
  }
}

export function getServicesFromDB(): any {
  return (dispatch: any) => {
    return axios.get('/api/service',
      {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `bearer ${Auth.getToken()}`
        }
      }).then((res) => {
        if (res.status === 200) {
          
          dispatch(getAllServices(res.data.services))
        }
      })
  }
}

export function getAllServices(services: Service[]): IAction {
  return {
    type: constants.GET_ALL_SERVICES,
    value: services
  }
}

export function addService():IAction{
  return {
    type: constants.ADD_SERVICES,
    value: {}
  }
}