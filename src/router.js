import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
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
        component: Login
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            requiresAuth: true
        },
        children: []
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
