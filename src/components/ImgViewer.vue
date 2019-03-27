<template>
    <div v-show="visible" class="img-viewer">
        <div class="arrow-left">
            <i v-show="curIndex>0" class="el-icon-back" @click="onLeft" />
        </div>
        <div class="img-content">
            <img :src="src">
        </div>
        <div class="arrow-right">
            <i v-show="curIndex<imgList.length-1" class="el-icon-back" @click="onRight" />
        </div>
        <button class="btn-close" @click="close">
            <i class="el-icon-close" />
        </button>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        imgList: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    data () {
        return {
            curIndex: 0
        };
    },
    computed: {
        src () {
            return this.imgList[this.curIndex];
        }
    },
    methods: {
        onLeft () {
            this.curIndex -= 1;
        },
        onRight () {
            this.curIndex += 1;
        },
        close () {
            this.$emit('update:visible', false);
        }
    }
};
</script>

<style scoped>
    .img-viewer{
        display: flex;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background:rgba(60,68,86,0.2);
        z-index: 33;
    }
    .arrow-left,.arrow-right{
        margin: 0 1rem;
        min-width: 2.78rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .arrow-right{
        margin-right: 4rem;
    }
    .arrow-left{
        margin-left: 4rem;
    }
    .arrow-left>i,.arrow-right>i{
        width: 2.78rem;
        line-height: 2.78rem;
        height: 2.78rem;
        font-size: 1.5rem;
        text-align: center;
        color: #fff;
        border: 4px solid #fff;
        border-radius: 50% 50%;
        cursor: pointer;
    }
    .arrow-right>i{
        transform: rotate(180deg);
    }
    .img-content{
        margin: 5% 0;
        flex: 1;
        max-height: 100%;
        text-align: center;
        position: relative;
        background: #fff;
    }
    .img-content img{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        max-height: 90%;
        max-width: 90%;
    }
    .btn-close{
        position: absolute;
        right: 1rem;
        top: 1rem;
        width: 1rem;
        height: 1rem;
        background: none;
        border: none;
        color: #fff;
        font-size: 1rem;
        cursor: pointer;
    }
</style>
