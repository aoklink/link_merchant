<template>
    <div class="menu">
        <div class="menu-item" @click="changeRouter(1)">
            <img src="../assets/icon1.png">
            店铺管理
        </div>
        <div class="menu-item" @click="changeRouter(2)">
            <img src="../assets/icon1.png">
            手环管理
        </div>
        <div class="menu-item" @click="changeRouter(3)">
            <img src="../assets/icon1.png">
            成员管理
        </div>
        <div class="menu-item" @click="changeRouter(4)">
            <img src="../assets/icon1.png">
            账户管理
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },
    methods: {
        changeRouter (data) {
            if (data === 2) {
                this.$router.push({path: '/BaseBind'});
            }
            if (data === 1) {
                this.$router.push({path: '/'});
            }
            if (data === 3) {
                this.$router.push({path: '/BaseMember'});
            }
            if (data === 4) {
                this.$router.push({path: '/BaseAccount'});
            }
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

</style>
