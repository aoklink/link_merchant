<template>
    <div id="app">
        <router-view />
    </div>
</template>

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
</style>
