import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import BaseBind from './components/BaseBind.vue';
import BaseMember from './components/BaseMember.vue';
import BaseInfo from './components/BaseInfo.vue';
import BaseAccount from './components/BaseAccount.vue';

import {
    isLogin
} from './utils/auth';

Vue.use(Router);

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
        name: 'Login',
        path: '/Login',
        component: Login,
        meta: {
            keepAlive: false
        }
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        displayName: '店铺管理',
        meta: {
            requiresAuth: true,
            keepAlive: true
        },
        children: []
    },
    {
        name: 'basebind',
        path: '/BaseBind',
        component: BaseBind,
        displayName: '手环管理',
        meta: {
            keepAlive: true
        },
    },
    {
        name: 'basemember',
        path: '/BaseMember',
        component: BaseMember,
        displayName: '会员管理',
        meta: {
            keepAlive: true
        },
    },
    {
        name: 'baseinfo',
        path: '/BaseInfo',
        component: BaseInfo,
        displayName: '会员信息',
        meta: {
            keepAlive: true
        },
    },
    {
        name: 'baseaccount',
        path: '/BaseAccount',
        component: BaseAccount,
        displayName: '账户管理',
        meta: {
            keepAlive: true
        },
    }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLogin()) {
            router.push({
                name: 'Login',
                query: {
                    from: to.path
                }
            });
            return;
        }
    }
    next();
});

export default router;
