import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import BaseBind from './components/BaseBind.vue';
import BaseMember from './components/BaseMember.vue';
import BigScreenList from './components/BigScreenList.vue';
import ClassScene from './components/ClassScene.vue';
import EffectScene from './components/EffectScene.vue';
import BaseInfo from './components/BaseInfo.vue';
import Exchart from './components/Exchart.vue';
import PhotoShop from './components/PhotoShop.vue';
import CoachManage from './components/CoachManage.vue';
import Pp from './components/Pp.vue';
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
                requiresAuth: true,
                keepAlive: true
            }
        },
        {
            name: 'basebind',
            path: '/BaseBind',
            component: BaseBind,
            displayName: '手环管理',
            meta: {
                requiresAuth: true,
                keepAlive: true
            }
        },
        {
            name: 'basemember',
            path: '/BaseMember',
            component: BaseMember,
            displayName: '会员管理',
            meta: {
                requiresAuth: true,
                keepAlive: true
            }
        },
        {
            name: 'bigscreenlist',
            path: '/BigScreenList',
            component: BigScreenList,
            displayName: '大屏列表',
            meta: {
                requiresAuth: true,
                keepAlive: true
            }
        },
        {
            name: 'accountmanagement',
            path: '/AccountManagement',
            component: AccountManagement,
            displayName: '账户管理',
            meta: {
                requiresAuth: true,
                keepAlive: true
            }
        },
        {
            name: 'coachmanage',
            path: '/CoachManage',
            component: CoachManage,
            displayName: '教练管理',
            meta: {
                requiresAuth: true,
                keepAlive: true
            }
        },
        {
            name: 'classscene',
            path: '/ClassScene',
            component: ClassScene,
            displayName: '上课统计',
            meta: {
                requiresAuth: true,
                keepAlive: true
            }
        },
        {
            name: 'effectscene',
            path: '/EffectScene',
            component: EffectScene,
            displayName: '效果统计',
            meta: {
                requiresAuth: true,
                keepAlive: true
            }
        },
        {
            name: 'exchart',
            path: '/Exchart',
            component: Exchart,
            displayName: '体侧数据',
            meta: {
                requiresAuth: true,
                keepAlive: true
            }
        },
        {
            name: 'photoshop',
            path: '/PhotoShop',
            component: PhotoShop,
            displayName: '体侧照片',
            meta: {
                requiresAuth: true,
                keepAlive: true
            }
        },
        {
            name: 'baseaccount',
            path: '/BaseAccount',
            component: AccountManagement,
            displayName: '账户管理',
            meta: {
                requiresAuth: true,
                keepAlive: true
            }
        },
        {
            name: 'pp',
            path: '/Pp',
            component: Pp,
            displayName: '账户管理',
            meta: {
                requiresAuth: true,
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
