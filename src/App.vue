<template>
    <div id="app">
        <Banner v-if="headerShow" />
        <div class="allCon">
            <Nav v-if="headerShow" />
            <div class="main-container">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script>
import Banner from './components/Banner';
import Nav from './components/nav';
export default {
    components: {
        Nav,
        Banner
    },
    data () {
        return {
            headerShow: true
        };
    },
    watch: {
        $route (to, from) {
            // 隐藏侧边栏
            if (this.$route.path === './views/Login.vue' || this.$route.path === './views/Login') {
                this.headerShow = false;
            } else {
                this.headerShow = true;
            }
            if (this.$route.path === '/' || this.$route.path === '/BaseBind' || this.$route.path === '/BaseMember' || this.$route.path === 'BaseAccount') {
                this.headerShow = true;
            }
        }
    }
};
</script>

<style>
    html{
        min-height: 700px;
        min-width: 1360px;
        font-size: 36px;
    }
    body{
        font-size: 14px;
    }

    body,html,#app{
        position: relative;
        min-height: 100%;
        height: 100%;
    }
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    .allCon{
        height: 100%;
        width: 100%;
        display: flex;
    }

    .main-container{
        flex: 1;
        height: 100%;
    }
</style>
