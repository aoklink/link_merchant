<template>
    <div class="menu">
        <!-- <div :class="active==0?'menu-item':'menu-hidden'" @click="changeRouter(0)">
            <img class="menu-white" src="../assets/icon1.png">
            店铺管理
        </div>
        <div :class="active==1?'menu-item':'menu-hidden'" @click="changeRouter(1)">
            <img src="../assets/icon1.png">
            手环管理
        </div>
        <div :class="active==2?'menu-item':'menu-hidden'" @click="changeRouter(2)">
            <img src="../assets/icon1.png">
            成员管理
        </div>
        <div :class="active==3?'menu-item':'menu-hidden'" @click="changeRouter(3)">
            <img src="../assets/icon1.png">
            教练管理
        </div>
        <div :class="active==4?'menu-item':'menu-hidden'" @click="changeRouter(4)">
            <img src="../assets/icon1.png">
            账户管理
        </div> -->
        <router-link v-for="(item,index) in list" 
            :key="item.value" :to="{path:item.path,query:{item:index}}"
            :class="{'menu-item':ind == index}"
            @click.native="changeBgc(index)"  class="menu-hidden"
            > 
            <img :src="item.img">
            {{item.label}} 
        </router-link> 
    </div>
</template>

<script>
export default {
    data () {
        return {
            // active: 0,
            // hidden: false,
            list: [
                {path:'/',label:'店铺管理',img: require('../assets/nava.png')},
                {path:'/BaseMember',label:'会员管理',img: require('../assets/navb.png')},
                {path:'/BaseBind',label:'手环管理',img: require('../assets/navc.png')},
                {path:'/CoachManage',label:'教练管理',img: require('../assets/navd.png')},
                {path:'/AccountManagement',label:'账户管理',img: require('../assets/nave.png')}
            ],
            ind: '0'
        };
    },
    methods: {
        // changeRouter (data) {
        //     if (data === 0) {
        //         this.$router.push({path: '/'});
        //     }
        //     if (data === 1) {
        //         this.$router.push({path: '/BaseBind'});
        //     }
        //     if (data === 2) {
        //         this.$router.push({path: '/BaseBind'});
        //     }
        //     if (data === 3) {
        //         this.$router.push({path: '/CoachManage'});
        //     }
        //     if (data === 4) {
        //         this.$router.push({path: '/AccountManagement'});
        //     }
        //     this.active = data;
        // },
        // scal () {
        //     this.hidden = !this.hidden
        // }
        changeBgc(index){
            this.ind = index;
        },
    },
    mounted(){
        if(this.$route.query.item){
            this.ind = this.$route.query.item;
        }else{
            this.ind = 0;
        }
    }
};
</script>

<style>
    .menu{
        padding-top: 1rem;
        min-height: 100%;
        width: 6.11rem;
        float: left;
        min-width: 6.11rem;
        background:rgba(255,255,255,1);
    }
    .menu-hidden{
        border-right: 0.22rem solid rgba(255,255,255,1);
        background:#fff;
        font-size:0.39rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:1.39rem;
        text-align: left;
        display: inline-block;
        width: 100%;
        text-decoration:none;
        box-sizing: border-box;
    }
    .menu-hidden img{
        display: inline-block;
        margin:0 .5rem 0 1rem;
        vertical-align: middle;
        width: 25px;
        height: 25px;
    }
    .menu-item{
        border-right: 0.22rem solid rgba(255,192,1,1);
        background:rgba(255,236,178,1);
        font-size:0.39rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:1.39rem;
        text-align: left;
    }
    .menu-item img{
        display: inline-block;
        margin:0 .5rem 0 1rem;
        vertical-align: middle;
    }
    .menu-white{
        display: inline-block;
        margin:0 .5rem 0 1rem;
        vertical-align: middle;
        width: 25px;
        height: 25px;
    }
    .click-area{
        display: inline-block;
        width: 1.5rem;
        height: 1.39rem;
        position: relative;
        text-align: center;
    }
</style>
