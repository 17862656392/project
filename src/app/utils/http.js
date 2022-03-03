import axios from 'axios';
import store from '../store';
import router from '../router';
import Cookies from 'js-cookie';


//一个永远是pending的promise对象
var alwaysPendingPromise = new Promise(() => { });

export default function (option) {
  var defaultOption = {
    ...option,
    withCredentials: true, //让axios发ajax请求自动携带当前页面的cookies
    timeout: 2000 //让axios发ajax请求的时间为2s,2s内没有响应则请求超时
  };
  return axios(defaultOption)
    //ie9使用axios时response.data为null，但可以从response.request.responseText中去拿取返回结果
    .then(response => response.data || JSON.parse(response.request.responseText))
    .then(result => {
      if (result.message !== '') store.commit('alert/open', result.message); //如果有消息需要提示用户，则提示（不管是成功还是失败）
      switch (result.status) {
        case 200:
          return result.data;
        case 401:
          Cookies.set('target', router.history.current.fullPath);
          router.replace('./login');
        default:
          //返回一个永远是pending的promise对象
          return alwaysPendingPromise;
      }
    })
    //只处理ajax发送时客户端产生的物理错误
    .catch(error => {
      store.commit('alert/open', error.message);
      return alwaysPendingPromise;
    });
}
