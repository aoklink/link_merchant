<template>
    <div class="form-add-edit-gym">
        <el-tabs :value="activeName" :before-leave="onTabBeforeLeave">
            <el-tab-pane label="店铺资料" name="first">
                <div class="form-add-store">
                    <h3>店铺资料</h3>
                    <div class="gym-info">
                        <div class="app-form-item">
                            <label>店铺名称</label>
                            <input v-model="formGYMInfo.name" type="text" placeholder="请输入店铺名称"
                                   autocomplete="false"
                            >
                        </div>
                        <div class="app-form-item">
                            <label>联系电话</label>
                            <input v-model="formGYMInfo.phone" autocomplete="false" type="text"
                                   placeholder="联系电话"
                            >
                        </div>
                        <div class="app-form-item">
                            <label>所在城市</label>
                            <div class="select-group">
                                <el-select v-model="formArea.province" placeholder="省">
                                    <el-option v-for="province in provinceList" :key="province" :label="province"
                                               :value="province"
                                    />
                                </el-select>
                                <el-select v-model="formArea.city" placeholder="市">
                                    <el-option v-for="city in cityList" :key="city" :label="city"
                                               :value="city"
                                    />
                                </el-select>
                                <el-select v-model="formArea.district" placeholder="区/县">
                                    <el-option v-for="district in districtList" :key="district" :label="district"
                                               :value="district"
                                    />
                                </el-select>
                            </div>
                        </div>
                        <div class="app-form-item">
                            <label>标签</label>
                            <input v-model="formGYMInfo.label" autocomplete="false" type="text"
                                   placeholder="请输入标签，用空格隔开"
                            >
                        </div>
                        <div class="app-form-item gym-info-address">
                            <label>店铺地址</label>
                            <input v-model="formGYMInfo.address" autocomplete="false" type="text"
                                   placeholder="如：浙江省杭州市西湖区xx街道118号"
                            >
                        </div>
                        <div>
                            <address-map :keyword="formGYMInfo.address" :position="formMap.position" @change="onMapChange" />
                        </div>
                        <div class="form-upload-img-item">
                            <label>
                                <h6>店铺logo</h6>
                                <p>请尽量保证图片是正方形， 建议上传尺寸80*80像素， 大小不超过3M。</p>
                            </label>
                            <upload-img v-model="formGYMInfo.logo_url" @error="onUploadImgError" />
                        </div>
                        <div class="form-upload-img-item">
                            <label>
                                <h6>小程序二维码</h6>
                            </label>
                            <upload-img v-model="formGYMInfo.mini_program_code_url" @error="onUploadImgError" />
                        </div>
                        <div class="form-upload-img-item img-show">
                            <label>
                                <h6>展示图</h6>
                                <p>请上传店铺相关图片进行展示，每张图片大小不超过3M</p>
                            </label>
                            <div class="img-show-list">
                                <img-list v-model="formGYMInfo.display_img_urls" />
                                <upload-img :one-image="false" @error="onUploadImgError" @addimg="onAddDisplayImg" />
                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="教练信息" name="second">
                <form-coach-info :gym-id="gymId" />
            </el-tab-pane>
            <el-tab-pane label="课程活动" name="third">
                <form-class-info :gym-id="gymId" />
            </el-tab-pane>
            <el-tab-pane label="账号设定" name="fourth">
                <div v-if="activeName=='fourth'" class="form-add-account">
                    <h3>
                        账号设定
                    </h3>
                    <div class="app-form-item">
                        <label>负责人</label>
                        <input v-model="formAccountInfo.name" autocomplete="false" type="text"
                               placeholder="请输入负责人名称"
                        >
                    </div>
                    <div class="app-form-item">
                        <label>密码</label>
                        <input v-model="formAccountInfo.password" autocomplete="false" type="password"
                               placeholder="请输入6-18位密码"
                        >
                    </div>
                    <div class="app-form-item">
                        <label>手机号</label>
                        <input v-model="formAccountInfo.phone" autocomplete="false" type="text"
                               placeholder="请输入手机号"
                        >
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <button class="btn-close-dialog-form-add-edit-gym" @click="onClose">
            <i class="el-icon-close" />
        </button>
        <div class="dialog-footer">
            <app-button size="large" theme="plain" @click="onClose">
                取消
            </app-button>
            <app-button v-if="activeName!='first'" size="large" theme="yellow"
                        @click="onPrev"
            >
                上一步
            </app-button>
            <app-button size="large" theme="yellow" @click="onNext">
                {{ activeName=='fourth'?'保存':'下一步' }}
            </app-button>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import UploadImg from './UploadImg.vue';
import ImgList from './ImgList.vue';
import AppButton from './AppButton.vue';
import FormClassInfo from './FormClassInfo.vue';
import FormCoachInfo from './FormCoachInfo.vue';
import { ADD_GYM, ADD_COASH, ADD_GYM_ADMIN, GET_OSS_SESSION, GET_GYM_INFO, UPDATE_GYM
    , GET_CLASS_INFO_LIST_BY_GYMID, UPDATE_GYM_ADMIN_USER, GET_GYM_ADMIN_USER_GET_BIND, GET_COACH_LIST_BY_GYMID } from
    '../store/action_type';
import { md5 } from '../utils/crypto';
import {verifyEmptyHelper} from '../utils/index.js';
import area from '../utils/area.js';
import AddressMap from './AddressMap.vue';

export default {
    components: {
        AddressMap,
        UploadImg,
        AppButton,
        ImgList,
        FormCoachInfo,
        FormClassInfo
    },
    props: {
        isEdit: {
            type: Boolean,
            default: false
        },
        editGymId: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            activeName: 'first',
            formArea: {
                province: '',
                city: '',
                district: ''
            },
            formMap: {
                position: null
            },
            formGYMInfo: {
                name: '',
                address: '',
                label: '',
                phone: '',
                logo_url: '',
                display_img_urls: [],
                mini_program_code_url: ''
            },
            formAccountInfo: {
                name: '',
                phone: '',
                password: ''
            },
            gymId: null
        };
    },
    computed: {
        city () {
            return this.formArea.province && this.formArea.city && this.formArea.district
                ? `${this.formArea.province}-${this.formArea.city}-${this.formArea.district}` : '';
        },
        provinceList () {
            return Object.keys(area);
        },
        cityList () {
            let city = area[this.formArea.province];
            return city ? Object.keys(city) : [];
        },
        districtList () {
            let district = [];
            try {
                district = area[this.formArea.province][this.formArea.city];
            } catch (error) {
            }
            return district;
        },
        ...mapState(['classInfoListSelected', 'gymAdminInfoSelected'])
    },
    async mounted () {
        this.$store.dispatch(GET_OSS_SESSION);
        if (this.isEdit) {
            this.gymId = this.editGymId;
            let result = await this.$store.dispatch(GET_GYM_INFO, {id: this.editGymId});
            if (result.success) {
                let displayImgUrls = [];
                try {
                    displayImgUrls = JSON.parse(result.data.display_img_urls);
                } catch (error) {

                }
                this.formGYMInfo = {...result.data, display_img_urls: displayImgUrls};
                try {
                    let city = result.data.city.split('-');
                    this.formArea.province = city[0];
                    this.formArea.city = city[1];
                    this.formArea.district = city[2];

                    let address = JSON.parse(result.data.address);
                    this.formGYMInfo.address = address.address;
                    this.formMap.position = address.position;
                } catch (error) {

                }
            }
        }
    },
    methods: {
        onMapChange (position) {
            this.formMap.position = position;
        },
        onTabBeforeLeave (activeName) {
            return activeName == this.activeName;
        },
        onClose () {
            this.$emit('close');
        },
        onAddDisplayImg (url) {
            this.formGYMInfo.display_img_urls = [...this.formGYMInfo.display_img_urls, url];
        },
        async onSubmitGYMInfo () {
            if (this.formGYMInfo.display_img_urls.length == 0) {
                this.$message.warning('展示图片不能为空');
                return {success: false};
            }
            let validResult = verifyEmptyHelper(this.formGYMInfo, [
                {
                    field: 'name',
                    label: '店铺名称'
                },
                {
                    field: 'address',
                    label: '店铺地址'
                },
                {
                    field: 'phone',
                    label: '联系电话'
                },
                {
                    field: 'mini_program_code_url',
                    label: '小程序二维码'
                },
                {
                    field: 'logo_url',
                    label: '店铺logo'
                }
            ]);
            if (!validResult.valid) {
                this.$message.warning(validResult.msg);
                return {success: false};
            }
            validResult = verifyEmptyHelper(this.formArea, [
                {
                    field: 'province',
                    label: '省份'
                },
                {
                    field: 'city',
                    label: '城市'
                },
                {
                    field: 'district',
                    label: '区县'
                }
            ]);
            if (!validResult.valid) {
                this.$message.warning(validResult.msg);
                return {success: false};
            }
            validResult = verifyEmptyHelper(this.formMap, [
                {
                    field: 'position',
                    label: '地图标记'
                }
            ]);
            if (!validResult.valid) {
                this.$message.warning(validResult.msg);
                return {success: false};
            }

            let result;
            if (this.isEdit) {
                result = await this.$store.dispatch(UPDATE_GYM, {
                    ...this.formGYMInfo,
                    id: this.gymId,
                    city: this.city,
                    address: JSON.stringify({
                        position: this.formMap.position,
                        address: this.formGYMInfo.address
                    }),
                    display_img_urls: JSON.stringify(this.formGYMInfo.display_img_urls)
                });
            } else {
                result = await this.$store.dispatch(ADD_GYM, {...this.formGYMInfo,
                    city: this.city,
                    address: JSON.stringify({
                        position: this.formMap.position,
                        address: this.formGYMInfo.address
                    }),
                    display_img_urls: JSON.stringify(this.formGYMInfo.display_img_urls)
                });
            }
            if (result.success) {
                this.$notify({
                    title: this.isEdit ? '编辑成功' : '添加成功',
                    type: 'success'
                });
                this.gymId = result.data.id;
            } else {
                this.$message.error(result.data);
            }
            return result;
        },
        onPrev () {
            if (this.activeName == 'second') {
                this.activeName = 'first';
            } else if (this.activeName == 'third') {
                this.activeName = 'second';
            } else if (this.activeName == 'fourth') {
                this.activeName = 'third';
            }
        },
        async onNext () {
            if (this.activeName == 'first') {
                let result = await this.onSubmitGYMInfo();
                if (result.success) {
                    this.$store.dispatch(GET_COACH_LIST_BY_GYMID, {gym_id: this.gymId});
                    this.activeName = 'second';
                }
            } else if (this.activeName == 'second') {
                this.$store.dispatch(GET_CLASS_INFO_LIST_BY_GYMID, {gym_id: this.gymId});
                this.activeName = 'third';
            } else if (this.activeName == 'third') {
                if (this.isEdit) {
                    let result = await this.$store.dispatch(GET_GYM_ADMIN_USER_GET_BIND, {gym_id: this.gymId});
                    if (result.success) {
                        this.formAccountInfo.name = result.data.name;
                        this.formAccountInfo.phone = result.data.phone;
                    }
                }
                this.activeName = 'fourth';
            } else if (this.activeName == 'fourth') {
                this.onSubmitAddAccount();
            }
        },
        async onUploadImgError (msg) {
            this.$notify.error({
                title: '图片上传失败',
                message: msg
            });
        },
        async onSubmitCoachInfo () {
            let validResult = verifyEmptyHelper(this.formCoachInfo, [{
                field: 'name',
                label: '姓名'
            }]);
            if (!validResult.valid) {
                this.$message.warning(validResult.msg);
                return;
            }
            let result = await this.$store.dispatch(ADD_COASH, {...this.formCoachInfo, gym_id: this.gymId});
            if (result.success) {
                this.$notify({
                    title: '添加成功',
                    type: 'success'
                });
            } else {
                this.$notify.error({
                    title: '添加失败',
                    message: result.data
                });
            }
        },
        async onSubmitAddAccount () {
            let result;
            let payload = {...this.formAccountInfo, gym_id: this.gymId};
            if (payload.password) {
                payload.password = md5(payload.password);
            } else {
                delete payload.password;
            }
            if (this.isEdit) {
                payload.id = this.gymAdminInfoSelected.id;
                result = await this.$store.dispatch(UPDATE_GYM_ADMIN_USER, payload);
            } else {
                result = await this.$store.dispatch(ADD_GYM_ADMIN, payload);
            }

            if (result.success) {
                this.$notify({
                    title: this.isEdit ? '编辑成功' : '添加成功',
                    type: 'success'
                });
                this.onClose();
            } else {
                this.$notify.error({
                    title: '添加失败',
                    message: result.data
                });
            }
        }
    }
};
</script>

<style>
    .form-add-edit-gym{
        position: relative;
        flex: 1;
    }
    .form-add-edit-gym .el-tabs__nav.is-top{
        line-height: 1.67rem;
        margin-left: 20px;
    }
    .form-add-edit-gym .el-tabs__item:hover{
        color: #303133;
        cursor: default;
    }
    .form-add-edit-gym #tab-first{
        padding-left: 0;
    }
    .form-add-edit-gym .el-tabs__item.is-active{
        color: #000;
        font-weight: 600;
    }
    .form-add-edit-gym .el-tabs__active-bar{
        width:0.83rem!important;
        height:0.11rem;
        background:rgba(255,192,1,1);
    }
    .btn-close-dialog-form-add-edit-gym{
        position: absolute;
        top:.5rem;
        right: .5rem;
        border: none;
        background: none;
        color: #ccc;
        cursor: pointer;
    }
    .app-form-item.gym-info-address{
        margin: .5rem 0;
        margin-right: 0!important;
        width: 25.44rem;
        box-sizing: border-box;
    }
    .form-add-store,.form-add-coach, .form-add-account{
        padding:0 1rem;
    }
    .form-add-coach h3{
        padding-bottom: .47rem;
    }
    .form-add-coach .form-btn-add{
        position: absolute;
        right: 1rem;
    }
    .app-form-item.form-class-info-content{
        margin-top:.5rem;
        margin-right: 0!important;
        width: 25rem;
        height: 5.56rem;
        box-sizing: border-box;
    }
    .dialog-footer{
        padding: .3rem 1rem;
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        text-align: right;
    }
    .dialog-footer >button{
        margin-left: .3rem;
    }
    .select-group .el-select{
        width: 4rem;
    }

    .form-add-store .form-upload-img-item:nth-of-type(2n){
        margin-right: 0;
        margin-left: .83rem;
    }
</style>
