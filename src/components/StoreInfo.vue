<template>
    <div class="store-info">
        <div class="panel">
            <div class="store-detail">
                <h3 class="store-info-title">
                    店铺信息
                </h3>
                <h4 class="store-name">
                    {{ storeData.name }}
                </h4>
                <div class="store-info-item">
                    <h5>所在城市</h5>
                    <div>
                        {{ storeData.city }}
                    </div>
                </div>
                <div class="store-info-item">
                    <h5>店铺地址</h5>
                    <div>
                        {{ address }}
                    </div>
                </div>
                <div class="store-info-item">
                    <h5>联系电话</h5>
                    <div>
                        {{ storeData.phone }}
                    </div>
                </div>
                <div class="store-info-item white">
                    <h5>店铺LOGO</h5>
                    <div>
                        <app-button theme="grey" @click="showLogoUrl">
                            查看
                        </app-button>
                    </div>
                </div>
                <div class="store-info-item white">
                    <h5>小程序二维码</h5>
                    <div>
                        <app-button theme="grey" @click="showMiniProgramCdoe">
                            查看
                        </app-button>
                    </div>
                </div>
                <div class="store-info-item white">
                    <h5>展示图</h5>
                    <div>
                        <app-button theme="grey" @click="showDisplayImg">
                            查看
                        </app-button>
                    </div>
                </div>
            </div>
            <div class="store-coach-info">
                <h3 class="store-info-title">
                    教练信息
                </h3>
                <ul class="store-coach-list">
                    <li v-for="coach in coachData" :key="coach.id">
                        <div class="coach-name">
                            <span>姓名</span>
                            <span>
                                {{ coach.name }}
                            </span>
                        </div>
                        <div class="coach-label">
                            <span>标签</span>
                            <span>
                                {{ coach.label }}
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="store-class-list">
                <h3 class="store-info-title">
                    课程活动列表
                </h3>
                <el-table
                    :data="classInfoListSelected"
                    style="width: 100%"
                >
                    <el-table-column
                        prop="title"
                        label="标题"
                    />
                    <el-table-column
                        prop="price_info"
                        label="价格"
                    />
                    <el-table-column
                        prop="time"
                        label="最后更新时间"
                    />
                    <el-table-column align="left" label="状态">
                        <template slot-scope="scope">
                            <div class="class-info-operation">
                                <span v-if="scope.row.state==0" class="state-offline">下线</span>
                                <span v-else class="state-online">上线</span>
                                <app-button theme="grey" @click="showClassInfoDialog(scope.row)">
                                    查看
                                </app-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="panel">
            <div class="store-account">
                <h3 class="store-info-title">
                    账户信息
                </h3>
                <div>
                    <div class="store-info-item white">
                        <h5>负责人</h5>
                        <div>
                            {{ gymAdminInfoSelected.name }}
                        </div>
                    </div>
                    <div class="store-info-item  white">
                        <h5>手机号</h5>
                        <div>
                            {{ gymAdminInfoSelected.phone }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="isShowClassInfoDialog" top="1rem"
                   width="27.78rem"
                   custom-class="dialog-class-info"
                   title="课程活动详情"
        >
            <div class="class-info-item">
                <label>课程活动名称</label>
                <div>
                    {{ classInfoDetail.title }}
                </div>
            </div>
            <div class="class-info-item">
                <label>价格</label>
                <div>
                    {{ classInfoDetail.price_info }}
                </div>
            </div>
            <div class="class-info-item class-info-content">
                <label>课程内容</label>
                <div>
                    {{ classInfoDetail.content }}
                </div>
            </div>
        </el-dialog>
        <img-viewer :visible.sync="isImgViewerVisible" :img-list="imgViewerList" />
    </div>
</template>

<script>
import {mapState} from 'vuex';
import ImgViewer from './ImgViewer.vue';
import AppButton from './AppButton.vue';
export default {
    components: {
        ImgViewer,
        AppButton
    },
    props: {
        storeData: {
            type: Object,
            default () {
                return {};
            }
        }
    },
    data () {
        return {
            isShowClassInfoDialog: false,
            classInfoDetail: {},
            isImgViewerVisible: false,
            imgViewerList: []
        };
    },
    computed: {
        address () {
            try {
                return JSON.parse(this.storeData.address).address;
            } catch (error) {

            }
            return '';
        },
        ...mapState({
            coachData: 'coachInfoListSelected',
            gymAdminInfoSelected: 'gymAdminInfoSelected',
            classInfoListSelected: 'classInfoListSelected'
        })
    },
    methods: {
        showLogoUrl () {
            this.imgViewerList = [this.storeData.logo_url];
            this.isImgViewerVisible = true;
        },
        showDisplayImg () {
            this.isImgViewerVisible = true;
            let displayImg = [];
            try {
                displayImg = JSON.parse(this.storeData.display_img_urls);
            } catch (error) {

            }
            this.imgViewerList = displayImg;
        },
        showMiniProgramCdoe () {
            this.isImgViewerVisible = true;
            this.imgViewerList = [this.storeData.mini_program_code_url];
        },
        showClassInfoDialog (detail) {
            this.isShowClassInfoDialog = true;
            this.classInfoDetail = detail;
        }
    }
};
</script>

<style scoped>
    .store-info{
        display: flex;
        flex-direction: column;
        padding: .56rem;
        height:27.33rem;
        background:rgba(246,247,248,1);
        border-radius:0.11rem;
        border:0.01rem solid rgba(198,204,220,1);
    }
    .store-info>.panel{
        display: flex;
        flex-direction: row;
    }
    .store-detail{
        width:10.03rem;
        height:18.89rem;
        background:rgba(255,255,255,1);
        border-radius:0.11rem;
        border:0.03rem solid rgba(213,217,229,1);
    }
    .store-coach-info{
        margin-left: .5rem;
        width:10.03rem;
        height:18.89rem;
        background:rgba(255,255,255,1);
        border-radius:0.11rem;
        border:0.03rem solid rgba(213,217,229,1);
    }
    .store-coach-list{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .store-coach-list >li{
        padding:.5rem 1rem;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid rgba(198,204,220,1);
    }
    .coach-name >span, .coach-label > span{
        display: block;
    }
    .coach-name >span:first-of-type,.coach-label>span:first-of-type{
        margin-bottom: .2rem;
    }
    .coach-label {
        padding-left: .6rem;
    }
    .coach-label>span:not(:first-of-type){
        padding: .1rem .5rem;
        background:rgba(199,205,213,1);
        border-radius:0.06rem;
        color: #5B637E;
    }
    .coach-name{
        width: 3rem;
        border-right: 1px solid rgba(198,204,220,1);
    }
    .store-class-list{
        flex: 1;
        margin-left: .5rem;
        height:18.89rem;
        background:rgba(255,255,255,1);
        border-radius:0.11rem;
        border:0.03rem solid rgba(213,217,229,1);
    }
    .store-account{
        margin-top: .5rem;
        width:20.47rem;
        background:rgba(255,255,255,1);
        border-radius:0.11rem;
        border:0.03rem solid rgba(213,217,229,1);

    }
    .store-info-title{
        margin: 0;
        padding: 0;
        padding-left: 1rem;
        line-height: 2rem;
        font-size:0.39rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        border-bottom: .01rem solid rgba(198,204,220,1);
    }
    .store-name{
        margin: 1rem;
        font-size:0.67rem;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(60,68,86,1);
    }
    .store-info-item{
        background:rgba(244,245,249,1);
    }
    .store-info-item.white{
        background: #fff;
    }
    .store-info-item:last-of-type div{
        border-bottom: none;
    }
    .store-info-item h5{
        margin: 0;
        padding: 0;
        padding-top: .5rem;
        padding-bottom: .2rem;
        padding-left: 1rem;
        font-size:0.33rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(48,56,73,1);
        line-height:0.47rem;
    }
    .store-info-item div{
        padding-left: 1rem;
        padding-bottom: .5rem;
        border-bottom:0.01rem solid rgba(198,204,220,1);
        font-size:0.39rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(48,56,73,1);
    }
    .store-account .store-info-item{
        width: 10rem;
        display: inline-block;
        border-right: 1px solid   rgba(198,204,220,1);
    }
    .store-account .store-info-item:nth-of-type(2n){
        border-right: none;
    }
    .state-offline{
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,0.5);
    }
    .class-info-operation .btn-see{
        margin-left: 1rem;
    }

    .class-info-item{
        display: flex;
        width:12.22rem;
        height:1.94rem;
        border:0.01rem solid rgba(225,227,232,1);
        flex-direction: column;
    }
    .class-info-item label{
        padding-left: 1rem;
        padding-top: .5rem;
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(91,99,126,1);
        line-height:0.47rem;
    }
    .class-info-item div{
        padding-left: 1rem;
        padding-top:8px;
        width: 100%;
        background: transparent;
        box-sizing: border-box;
        border: none;
        font-size:16px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        line-height:0.56rem;
    }
    .class-info-content{
        margin-top: .5rem;
        min-height: 3rem;
        width: 25rem;
    }
    .class-info-operation >span{
        margin-right: 1em;
    }

</style>
