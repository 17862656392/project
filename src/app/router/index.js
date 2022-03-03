// vue项目路由配置文件
import Vue from 'vue';
import Router from 'vue-router';
//导入所有需要vue-router控制的页面级组件 @表示src路径
// import Home from '@/views/Home.vue';
import Home from '../views/Home.vue';
import Category from '../views/Category.vue';
import List from '../views/List.vue';
import Detail from '../views/Detail.vue';
import Taste from '../views/Taste.vue';
import Cart from '../views/Cart.vue';
import Profile from '../views/Profile.vue';
import Login from '../views/Login.vue';
//向vue体系注入vue-router路由体系
Vue.use(Router);

//创建路由对象并导出路由对象
export default new Router({
        linkActiveClass: 'active',
        routes: [
                { path: '/', component: Home },
                {
                        path: '/category',
                        component: Category,
                        meta: { //藏和路由相关的值
                                keepAlive: true
                        }
                },
                {
                        path: '/list/:mainId/:subId', //:表示要传的参数，变量
                        component: List,
                        meta: {
                                keepAlive: true
                        }
                },
                { path: '/detail', component: Detail },
                { path: '/taste', component: Taste },
                { path: '/cart', component: Cart },
                { path: '/profile', component: Profile },
                { path: '/login', component: Login }
        ]
});

