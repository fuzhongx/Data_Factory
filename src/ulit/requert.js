import axios from "axios";
import cookies from "vue-cookies";
// import { useRouter } from "vue-router";
// import { jwtDecode } from "jwt-decode"
// import { ElMessage } from "element-plus";
// const router = useRouter();

const service = axios.create({
  baseURL: "https://www.cp-mes.cn/prod-api/",
  // baseURL:process.env.VUE_APP_API_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});
service.interceptors.request.use((config) => {
  const token = cookies.get("token");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
}),
  (error) => {
    return Promise.reject(error);
  },
  service.interceptors.response.use((response) => {
    return response;
  }),
  (error) => {
    return Promise.reject(error);
  };

export default service;
