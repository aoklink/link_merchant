<template>
    <div class="menu">
        <router-link
            :to="{path:'/'}"
            class="menu-hidden"
            :class="[cur==1?'menu-item':'menu-hidden']"
            @click.native="clik(0)"
        >
            <img src="../assets/nava.png">
            店铺管理
            <span class="click-area" @click="scal(0)">
                <svg width="8px" height="8px" class="svg">
                    <polygon points="0,0 8,0 4,8" style="fill:#000;stroke:#000;stroke-width:1" />
                </svg>
            </span>
        </router-link>
        <router-link
            v-show="v1==true"
            :to="{path:'/'}"
            :class="[incur==1?'menu-item-chil':'menu-hidden']"
            @click.native="clia(0)"
        >
            店铺列表
            <span class="spaa" />
        </router-link>
        <router-link
            v-show="v1==true"
            :to="{path:'/BigScreenList'}"
            :class="[incur==2?'menu-item-chil':'menu-hidden']"
            @click.native="clia(1)"
        >
            大屏管理
            <span class="spaa" />
        </router-link>
        <router-link
            :to="{path:'/BaseMember'}"
            :class="[cur==2?'menu-item':'menu-hidden']"
            @click.native="clik(1)"
        >
            <img src="../assets/nava.png">
            会员管理
        </router-link>
        <router-link
            :to="{path:'/BaseBind'}"
            :class="[cur==3?'menu-item':'menu-hidden']"
            @click.native="clik(2)"
        >
            <img src="../assets/nava.png">
            手环管理
        </router-link>
        <router-link
            :to="{path:'/CoachManage'}"
            :class="[cur==4?'menu-item':'menu-hidden']"
            @click.native="clik(3)"
        >
            <img src="../assets/nava.png">
            教练管理
            <span class="click-area" @click="scal(1)">
                <svg width="8px" height="8px" class="svg">
                    <polygon points="0,0 8,0 4,8" style="fill:#000;stroke:#000;stroke-width:1" />
                </svg>
            </span>
        </router-link>
        <router-link
            v-show="v2==true"
            :to="{path:'/CoachManage'}"
            :class="[incur==3?'menu-item-chil':'menu-hidden']"
            @click.native="clia(2)"
        >
            教练列表
            <span class="spaa" />
        </router-link>
        <router-link
            v-show="v2==true"
            :to="{path:'/ClassScene'}"
            :class="[incur==4?'menu-item-chil':'menu-hidden']"
            @click.native="clia(3)"
        >
            上课统计
            <span class="spaa" />
        </router-link>
        <router-link
            v-show="v2==true"
            :to="{path:'/EffectScene'}"
            :class="[incur==5?'menu-item-chil':'menu-hidden']"
            @click.native="clia(4)"
        >
            效果统计
            <span class="spaa" />
        </router-link>
        <router-link
            :to="{path:'/AccountManagement'}"
            :class="[cur==5?'menu-item':'menu-hidden']"
            @click.native="clik(4)"
        >
            <img src="../assets/nava.png">
            账户管理
        </router-link>
        <router-link
            :to="{path:'/Battery'}"
            :class="[cur==6?'menu-item':'menu-hidden']"
            @click.native="clik(5)"
        >
            <img src="../assets/nav_battery.png">
            电量管理
        </router-link>
        <!-- <router-link v-for="(item,index) in list"
            :key="item.value" :to="{path:item.path,query:{item:index}}"
            :class="{'menu-item':ind == index}"
            @click.native="changeBgc(index)"  class="menu-hidden"
            v-show="item.vv==0 || item.gg==true"
            >
            <img :src="item.img" v-show="item.vv==0">
            {{item.label}}
            <span class="spaa" v-show="item.kk==1"></span>
            <span class="click-area" @click="scal" v-show="item.kk==0">
                <svg width="8px" height="8px" class="svg">
                    <polygon points="0,0 8,0 4,8" style="fill:#000;stroke:#000;stroke-width:1" />
                </svg>
            </span>
        </router-link>  -->
    </div>
</template>

<script>
export default {
    data () {
        return {
            // list: [
            //     {path:'/',label:'店铺管理',img: require('../assets/nava.png'),kk:0,vv:0},
            //     {path:'/',label:'店铺列表',img: require('../assets/navb.png'),kk:1,gg:true,vv:1},
            //     {path:'/BaseMember',label:'大屏管理',img: require('../assets/navb.png'),kk:1,gg:true,vv:1},
            //     {path:'/BaseMember',label:'会员管理',img: require('../assets/navb.png'),vv:0},
            //     {path:'/BaseBind',label:'手环管理',img: require('../assets/navc.png'),vv:0},
            //     {path:'/CoachManage',label:'教练管理',img: require('../assets/navd.png'),kk:0,vv:0},
            //     {path:'/AccountManagement',label:'教练列表',img: require('../assets/navd.png'),kk:1,gg:true,vv:1},
            //     {path:'/AccountManagement',label:'上课统计',img: require('../assets/navd.png'),kk:1,gg:true,vv:1},
            //     {path:'/AccountManagement',label:'效果统计',img: require('../assets/navd.png'),kk:1,gg:true,vv:1},
            //     {path:'/AccountManagement',label:'账户管理',img: require('../assets/nave.png'),vv:0}
            // ],
            list: [
                {path: '/',
                    label: '店铺管理',
                    img: require('../assets/nava.png'),
                    kk: 0,
                    vv: 0,
                    children: [
                        {path: '/', label: '店铺列表', img: require('../assets/navb.png'), kk: 1, gg: true, vv: 1},
                        {path: '/BaseMember', label: '大屏管理', img: require('../assets/navb.png'), kk: 1, gg: true, vv: 1}
                    ]},
                {path: '/BaseMember', label: '会员管理', img: require('../assets/navb.png'), vv: 0},
                {path: '/BaseBind', label: '手环管理', img: require('../assets/navc.png'), vv: 0},
                {path: '/CoachManage', label: '教练管理', img: require('../assets/navd.png'), kk: 0, vv: 0},
                {path: '/AccountManagement', label: '教练列表', img: require('../assets/navd.png'), kk: 1, gg: true, vv: 1},
                {path: '/AccountManagement', label: '上课统计', img: require('../assets/navd.png'), kk: 1, gg: true, vv: 1},
                {path: '/AccountManagement', label: '效果统计', img: require('../assets/navd.png'), kk: 1, gg: true, vv: 1},
                {path: '/AccountManagement', label: '账户管理', img: require('../assets/nave.png'), vv: 0}
            ],
            ind: '0',
            cur: localStorage.getItem('cur') || 1,
            incur: localStorage.getItem('incur') || 1,
            v1: localStorage.getItem('v1')=='true'?true:false || true,
            v2: localStorage.getItem('v2')=='true'?true:false || false
        };
    },
    created () {
        console.log(typeof(this.v2))
        console.log(this.v2==true?'123':'no')
    },
    mounted () {
        // if(this.$route.query.item){
        //     this.ind = this.$route.query.item;
        // }else{
        //     this.ind = 0;
        // }
    },
    methods: {
        changeBgc (index) {
            this.ind = index;
            if (index == 1 || index == 2) {

            }
        },
        // scal () {
        //     for(var i=0;i<this.list.length;i++){
        //         if(this.list[i].gg == true || this.list[i].gg ==false){
        //            this.list[i].gg  = !this.list[i].gg
        //         }
        //     }
        // },
        clik (index) {
            this.cur = 0;
            this.incur = 0;
            if (index == 0) {
                this.cur = 1;
                this.incur = 1;
            }
            if (index == 1) {
                this.cur = 2;
            }
            if (index == 2) {
                this.cur = 3;
            }
            if (index == 3) {
                this.cur = 4;
                this.incur = 3;
            }
            if (index == 4) {
                this.cur = 5;
            }
            if (index == 5) {
                this.cur = 6;
            }
            localStorage.setItem('cur',this.cur)
            localStorage.setItem('incur',this.incur)
        },
        clia (index) {
            this.cur = 0;
            this.incur = 0;
            if (index == 0) {
                this.incur = 1;
                this.cur = 1;
            }
            if (index == 1) {
                this.incur = 2;
                this.cur = 1;
            }
            if (index == 2) {
                this.incur = 3;
                this.cur = 4;
            }
            if (index == 3) {
                this.incur = 4;
                this.cur = 4;
            }
            if (index == 4) {
                this.incur = 5;
                this.cur = 4;
            }
            localStorage.setItem('cur',this.cur)
            localStorage.setItem('incur',this.incur)
        },
        scal (index) {
            if (index == 0) {
                this.v1 = !this.v1;
            }
            if (index == 1) {
                this.v2 = !this.v2;
            }
            localStorage.setItem('v1',this.v1)
            localStorage.setItem('v2',this.v2)
        }
    }
};
</script>

<style>
    .menu{
        padding-top: 1rem;
        height: calc(100% - 1rem);
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
        height: 1.39rem;
        display: inline-block;
        width: 100%;
        text-decoration: none;
    }
    .menu-item-chil{
        border-right: 0.22rem solid rgba(255,192,1,1);
        /* background:rgba(255,236,178,1); */
        font-size:0.39rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:#FFC001;
        line-height:1.39rem;
        text-align: left;
        height: 1.39rem;
        display: inline-block;
        width: 100%;
        text-decoration: none;
    }
    .menu-item img{
        display: inline-block;
        margin:0 .5rem 0 1rem;
        vertical-align: middle;
        width: 25px;
        height: 25px;
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
    .spaa{
        display: inline-block;
        margin: 0 .5rem 0 1rem;
        vertical-align: middle;
        width: 0.833rem;
        height: 0.694rem;
        float: left;
    }
</style>
