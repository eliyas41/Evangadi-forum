import axios from "axios";
let baseURL = "http://localhost:5500/api/users";

const endPoints = {
  LOGIN: `${baseURL}/login`,
  REGISTER: `${baseURL}/register`,
  ME: `${baseURL}/me`
}