import axios from "axios";
import { Message } from "element-ui";

axios.defaults.baseURL = window.location.origin; // 自己访问自己的域名，再做转发
axios.interceptors.request.use(
  config => {
    // 如果有token 那么我们要带上token请求
    if (localStorage.token) {
      config.headers.token = localStorage.getItem("token");
    }
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code <= 299) {
      Message({
        message: response.data.msg,
        type: "success"
      });
    } else if (response.data.code >= 400) {
      Message({
        message: response.data.msg,
        type: "error"
      });
    }
    return response.data; // 只保留后台返回的数据，其他数据不要
  },
  (error, c) => {
    console.log(error, c);
    Message({
      message: error,
      type: "error"
    });
  }
);

// 简化请求写法
export const $post = async (path, data) => await axios.post(path, data);
export const $get = async (path, params = {}) =>
  await axios.get(path, { params });
export const $axios = axios;
