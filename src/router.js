import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import BaseBind from './components/BaseBind.vue';
import BaseMember from './components/BaseMember.vue';
import BaseInfo from './components/BaseInfo.vue';

import CoachManage from './components/CoachManage.vue';

import AccountManagement from './components/AccountManagement.vue';


import {
    isLogin
} from './utils/auth';

Vue.use(Router);

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            name: 'Login',
            path: '/Login',
            component: Login,
            meta: {
                title: '商家后台-领客菲力（杭州）健康技术有限公司',
                keepAlive: false
            }
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                title: '商家后台-领客菲力（杭州）健康技术有限公司',
                requiresAuth: true,
                keepAlive: true
            }
        },
        {
            name: 'baseinfo',
            path: '/BaseInfo',
            component: BaseInfo,
            displayName: '会员信息',
            meta: {
                title: '商家后台-领客菲力（杭州）健康技术有限公司',
                keepAlive: true
            }
        },
        {
            name: 'basebind',
            path: '/BaseBind',
            component: BaseBind,
            displayName: '手环管理',
            meta: {
                keepAlive: true
            }
        },
        {
            name: 'basemember',
            path: '/BaseMember',
            component: BaseMember,
            displayName: '会员管理',
            meta: {
                keepAlive: true
            }
        },
    
        {
            name: 'accountmanagement',
            path: '/AccountManagement',
            component: AccountManagement,
            displayName: '账户管理',
            meta: {
                keepAlive: true
            }
        },
        {
            name: 'coachmanage',
            path: '/CoachManage',
            component: CoachManage,
            displayName: '教练管理',
            meta: {
                keepAlive: true
            }
        },
        {
            name: 'baseaccount',
            path: '/BaseAccount',
            component: AccountManagement,
            displayName: '账户管理',
            meta: {
                keepAlive: true
            }
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
