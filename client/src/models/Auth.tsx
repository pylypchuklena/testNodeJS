import { User } from '../types/userModel';
class Auth {
  static authenticateUser(token: string) {
    localStorage.setItem("token", token)

  }
  static authUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user))
  }

  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem('token');
  }
  static deleteAuthUser() {
    localStorage.removeItem('user');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem('token');
  }
  static getAuthUser() {
    var obj = localStorage.getItem('user');
    return ((JSON.parse(obj)) as User)
  }
}
export default Auth;