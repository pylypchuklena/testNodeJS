import { AppState, User } from "../types/userModel";
import { IAction } from "../action";
import * as constants from '../constants';

const initialState = new AppState()

export function rootReducer(state = initialState, action: any): AppState {
  switch (action.type) {
    case constants.TOGGLE_USER:
      return ({ ...state, isUser: action.value })
    case constants.SHOW_STATUS:
      return ({ ...state, status: action.value })
    case constants.LOGGED_IN_USER:
      return ({ ...state, loggedInUser: action.value })
      case constants.LOGGED_OUT_USER:
      return ({ ...state, loggedInUser: null })
    default: {
      state.status = '';
      return state
    }
  }

}

export default rootReducer;