import axiosService from "./axiosService";

const baseURL = "https://localhost:44355/api/Chatapp/" ;


class UserService {
    constructor() {
      this.axiosService = new axiosService();
    }
  
    register(data) {
      let url = baseURL + "Registration";
      console.log(url);
      return this.axiosService.post(url, data);
    }

    login(data) {
        let url = baseURL + "Login";
        return this.axiosService.post(url, data);
      }
  }
  
  export default new UserService();