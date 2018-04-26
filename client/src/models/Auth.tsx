class Auth {
    static authenticateUser(token: string) {
        localStorage.setItem("token", token)

    }
    static authUser(user: string) {
      localStorage.setItem("user", user)
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
    static deleteAuthUser(){
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
    static getAuthUser(){
      return localStorage.getItem('user')
    }
}
export default Auth;