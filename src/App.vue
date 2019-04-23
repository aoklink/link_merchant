<template>
    <div id="app">
        <template v-if="$route.meta.keepAlive">
            <keep-alive>
                <Banner v-if="headerShow" />
            </keep-alive>
            <div class="allCon">
                <keep-alive>
                    <Nav v-if="headerShow" />
                </keep-alive>
                <div class="main-container">
                    <router-view />
                </div> 
            </div>
        </template>    
        <router-view v-if="!$route.meta.keepAlive"></router-view>
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
