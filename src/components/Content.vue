<template>
    <div class="container">
        <div class="menu">
            <div class="menu-item">
                <img src="../assets/icon1.png">
                店铺管理
            </div>
        </div>
        <div class="content">
            <div class="tab-content">
                <el-tabs v-model="tabIdSelected" type="border-card"
                         @tab-remove="removeTab"
                >
                    <el-tab-pane name="fixedtab">
                        <span slot="label" class="content-tab-label">店铺管理</span>
                        <management @addTab="addTab" />
                    </el-tab-pane>
                    <el-tab-pane v-for="(item) in gymInfoListSelected" :key="item.id"
                                 closable
                                 :name="item.id+''"
                    >
                        <span slot="label" class="content-tab-label">店铺信息</span>
                        <store-info :store-data="item" />
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import Management from './Management.vue';
import StoreInfo from './StoreInfo.vue';
import {mapState} from 'vuex';
import {REMOVE_ITEM_FROM_GYM_INFO_LIST_SELECTED} from '../store/mutation_type';

export default {
    components: {
        Management,
        StoreInfo
    },
    data () {
        return {
            tabIdSelected: 'fixedtab'
        };
    },
    computed: {
        ...mapState(['gymInfoListSelected'])
    },
    methods: {
        addTab (id) {
            this.tabIdSelected = id + '';
        },
        removeTab (targetId) {
            let tabs = this.gymInfoListSelected;
            let activeId = this.tabIdSelected;
            if (activeId == targetId) {
                tabs.forEach((tab, index) => {
                    if (tab.name == targetId) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeId = nextTab.name;
                        }
                    }
                });
            }
            this.tabIdSelected = activeId + '';
            this.$store.commit(REMOVE_ITEM_FROM_GYM_INFO_LIST_SELECTED, targetId);
            if (this.gymInfoListSelected.length == 0) {
                this.tabIdSelected = 'fixedtab';
            }
        }
    }
};
</script>

<style>
    .container{
        display: flex;
        flex-direction: row;
        flex:1;
        height: 100%;
    }
    .menu{
        padding-top: 1rem;
        width: 6.11rem;
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
    .content{
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: .56rem;
        font-size: 14px;
        text-align: left;
    }
    .tab-content .content-tab-label{
        display: inline-block;
        width: 6rem;
        box-sizing: border-box;
        font-size:0.33rem;
        font-family:PingFangSC-Medium;
        color:rgba(60,68,86,1);
    }
    .tab-content .el-icon-close{
        position: absolute;
        right: .4rem;
        top:.4rem;
    }
    .tab-content{
        display: flex;
        flex: 1;
        background:rgba(255,255,255,1);
        border-radius:0.11rem;
        border:0.01rem solid rgba(198,204,220,1);
    }
    .tab-content .el-tabs__content{
        padding: 0!important;
    }
    .tab-content .el-tabs{
        width: 100%;
    }
</style>
