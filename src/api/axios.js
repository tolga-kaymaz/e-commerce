import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://ecommerce-backend-production-7cbd.up.railway.app",
})


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers["Authorization"] = token
  }
  return config
})

export default axiosInstance