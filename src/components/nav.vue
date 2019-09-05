<template>
    <div class="menu">
        <router-link  
            :to="{path:'/'}"
            class="menu-hidden"
            :class="[ok1==1?'menu-item':'menu-hidden']"
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
            :class="[in1==1?'menu-item-chil':'menu-hidden']"
            @click.native="clia(0)"
            > 
            店铺列表
            <span class="spaa"></span>
        </router-link>
        <router-link  
            v-show="v1==true"
            :to="{path:'/BigScreenList'}"
            :class="[in2==1?'menu-item-chil':'menu-hidden']"
            @click.native="clia(1)"
            > 
            大屏管理
            <span class="spaa"></span>
        </router-link>
        <router-link  
            :to="{path:'/BaseMember'}"
            :class="[ok2==1?'menu-item':'menu-hidden']"
            @click.native="clik(1)"
            > 
            <img src="../assets/nava.png">
            会员管理
        </router-link>
        <router-link  
            :to="{path:'/BaseBind'}"
            :class="[ok3==1?'menu-item':'menu-hidden']"
            @click.native="clik(2)"
            > 
            <img src="../assets/nava.png">
            手环管理
        </router-link>
        <router-link  
            :to="{path:'/CoachManage'}"
            :class="[ok4==1?'menu-item':'menu-hidden']"
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
            :class="[in3==1?'menu-item-chil':'menu-hidden']"
            @click.native="clia(2)"
            > 
            教练列表
            <span class="spaa"></span>
        </router-link>
        <router-link  
            v-show="v2==true"
            :to="{path:'/ClassScene'}"
            :class="[in4==1?'menu-item-chil':'menu-hidden']"
            @click.native="clia(3)"
            > 
            上课统计
            <span class="spaa"></span>
        </router-link>
       <router-link  
            v-show="v2==true"
            :to="{path:'/EffectScene'}"
            :class="[in5==1?'menu-item-chil':'menu-hidden']"
            @click.native="clia(4)"
            > 
            效果统计
            <span class="spaa"></span>
        </router-link>
        <router-link  
            :to="{path:'/AccountManagement'}"
            :class="[ok5==1?'menu-item':'menu-hidden']"
            @click.native="clik(4)"
            > 
            <img src="../assets/nava.png">
            账户管理
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
                {path:'/',label:'店铺管理',img: require('../assets/nava.png'),kk:0,vv:0,children: [
                    {path:'/',label:'店铺列表',img: require('../assets/navb.png'),kk:1,gg:true,vv:1},
                    {path:'/BaseMember',label:'大屏管理',img: require('../assets/navb.png'),kk:1,gg:true,vv:1}
                ]},
                {path:'/BaseMember',label:'会员管理',img: require('../assets/navb.png'),vv:0},
                {path:'/BaseBind',label:'手环管理',img: require('../assets/navc.png'),vv:0},
                {path:'/CoachManage',label:'教练管理',img: require('../assets/navd.png'),kk:0,vv:0},
                {path:'/AccountManagement',label:'教练列表',img: require('../assets/navd.png'),kk:1,gg:true,vv:1},
                {path:'/AccountManagement',label:'上课统计',img: require('../assets/navd.png'),kk:1,gg:true,vv:1},
                {path:'/AccountManagement',label:'效果统计',img: require('../assets/navd.png'),kk:1,gg:true,vv:1},
                {path:'/AccountManagement',label:'账户管理',img: require('../assets/nave.png'),vv:0}
            ],
            ind: '0',
            ok: 0,
            ok1: 1,
            ok2: 0,
            ok3: 0,
            ok4: 0,
            ok5: 0,
            in1: 1,
            in2: 0,
            in3: 0,
            in4: 0,
            in5: 0,
            v1: true,
            v2: false
        };
    },
    methods: {
        changeBgc(index){
            this.ind = index;
            if(index==1 || index==2){

            }
        },
        // scal () {
        //     for(var i=0;i<this.list.length;i++){
        //         if(this.list[i].gg == true || this.list[i].gg ==false){
        //            this.list[i].gg  = !this.list[i].gg 
        //         }
        //     }
        // },
        clik(index){
            this.ok1 = 0
            this.ok2 = 0
            this.ok3 = 0
            this.ok4 = 0
            this.ok5 = 0
            this.in1 = 0
            this.in2 = 0
            this.in3 = 0
            this.in4 = 0
            this.in5 = 0
            if(index==0){
              this.ok1 = 1 
              this.in1 = 1 
            }
            if(index==1){
              this.ok2 = 1  
            }
            if(index==2){
              this.ok3 = 1  
            }
            if(index==3){
              this.ok4 = 1  
              this.in3 = 1
            }
            if(index==4){
              this.ok5 = 1  
            }
        },
        clia(index){
            this.ok1 = 0
            this.ok2 = 0
            this.ok3 = 0
            this.ok4 = 0
            this.ok5 = 0
            this.in1 = 0
            this.in2 = 0
            this.in3 = 0
            this.in4 = 0
            this.in5 = 0
            if(index==0){
                this.in1 = 1
                this.ok1 = 1
            }
            if(index==1){
                this.in2 = 1
                this.ok1 = 1
            }
            if(index==2){
                this.in3 = 1
                this.ok4 = 1
            }
            if(index==3){
                this.in4 = 1
                this.ok4 = 1
            }
            if(index==4){
                this.in5 = 1
                this.ok4 = 1
            }
        },
        scal(index){
          if(index==0){
              this.v1 = !this.v1
          }
          if(index==1){
              this.v2 = !this.v2
          }  
        }
    },
    mounted(){
        // if(this.$route.query.item){
        //     this.ind = this.$route.query.item;
        // }else{
        //     this.ind = 0;
        // }
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
