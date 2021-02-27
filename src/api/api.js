import axios from 'axios';
import urls from './apiUrl';

// import router from '/src/router';

let mAxios = axios.create();

// http request 拦截器
// instance.interceptors.request.use(config => {
//         const token = sessionStorage.getItem('token');
//         if (token ) { // 判断是否存在token，如果存在的话，则每个http header都加上token
//             config.headers.authorization = token  //请求头加上token
//         }
//         return config
//     },
//     err => {
//         return Promise.reject(err)
//     });

// http response 拦截器
mAxios.interceptors.response.use(response => {
        //data: "unauthorized"
        // if(response.data.data==="unauthorized"){
        //     localStorage.removeItem("admin_info");
        //     localStorage.removeItem("isAuth");
        //     router.replace({
        //         path: '/login'
        //     });
        // }
        return response;

    },error => {
    //接口错误状态处理，也就是说无响应时的处理
    // 返回接口返回的错误信息
        return Promise.reject(error);
    });

export { mAxios, urls };
