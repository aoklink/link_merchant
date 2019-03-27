<template>
    <div class="banner">
        <div class="banner-left">
            后台管理系统
        </div>
        <div class="banner-right">
            <div class="banner-userinfo">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="logout">
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import {
    mapState
} from 'vuex';
import {LOGOUT} from '../store/action_type';

export default {
    data () {
        return {

        };
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        handleCommand (command) {
            if (command == 'logout') {
                this.$store.dispatch(LOGOUT);
                this.$router.push({
                    name: 'Login'
                });
            }
        }
    }
};

</script>

<style>
    .banner {
        display: flex;
        height: 1.67rem;
        background: #fff;
    }

    .banner-left {
        line-height: 3;
        width: 6.11rem;
        font-size: 0.5rem;
        text-align: center;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        background: rgba(60, 68, 86, 1);
    }

    .banner-right {
        flex: 1;
        position: relative;
    }

    .banner-userinfo {
        position: absolute;
        right: 1rem;
        top: .5rem;
    }

</style>
