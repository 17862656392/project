// 打包入口文件


// Vue.config.productTip = false
// vue开发页面的根实例


//let Vue = require('vue');  //node平台commonJS导入vue语法
import Vue from 'vue';    //es6导入vue语法
import router from './router';       //导入路由对象
import store from './store'; //导入仓库对象
import App from './App.vue';  //导入根组件
import './assets/css/miReset.css'; //导入小米专用复位样式
import http from './utils/http.js';

Vue.prototype.$http = http; //自己扩展的属性加$符号

//创建vue根实例，并将根组件App渲染到挂载点#app
let vm = new Vue({
        el: '#app',
        router,  //注入自定义的路由对象
        store, //注入自定义的数据仓库
        //components: { App: App} //注册根组件
        components: { App },   //注册根组件(简写)
        template: '<App></App>' //模板
});