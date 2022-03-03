import axios from 'axios';
import { MessageBox } from 'element-ui';
import router from '../router';
import Cookies from 'js-cookie';

// 一个永远是pending的promise对象那个
var alwaysPendingPromise = new Promise(() => {});
export default function(option) {
        var defaultOption = {
                ...option,
                withCredentials: true,                  // 让axios发ajax请求自动携带当前页面的Cookie
                timeout: 5000                             // 让axios发ajax最大的请求时间为5秒，5秒内没有响应则认为请求超时
        };
        return axios(defaultOption)
                .then(response =>response.data || JSON.parse(response.request.responseText))
                .then(result => {
                        if(result.message !=='') MessageBox.alert(result.message);
                        switch(result.status) {
                                case 200:
                                        if(result.message !== '')
                                                return MessageBox.alert(result.message, {
                                                        title: '提示',
                                                        type: 'success'
                                                }).then(() => result.data);
                                        return result.data;
                                case 401:
                                        Cookies.set('target', router.history.current.fullPath);
                                        router.replace('./login');
                                case 404:
                                case 199:
                                case 500:
                                default:
                                        return alwaysPendingPromise;
                        }
                })
                .catch(error =>{
                        MessageBox.alert(error.message,{ title: '提示', type: 'error' });
                        return alwaysPendingPromise;
                });
}