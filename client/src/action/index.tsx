import * as constants from '../constants';
import { User, AppState } from '../types/userModel';
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
// export function toggleButton(isUser: boolean): IAction {

//   return {
//     type: constants.TOGGLE_USER,
//     value: isUser
//   }
// }
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
export function getDataFromDB(): any {
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
// export function selectedUser(item: User): IAction {
//   return {
//     type: constants.SELECTED_USER,
//     value: item
//   }
// }

export function updateDataUser(user: User): any {
  console.log('action user',user)
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
      console.log(res)
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