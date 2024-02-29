import axios from "axios"

const axiosBaseUrl = axios.create({
  baseURL: 'http://localhost:5500/api'
})

export default axiosBaseUrl