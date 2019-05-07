<template>
    <div class="account-management">
        <div class="crumbs">
            <div class="oo">
                账户管理
            </div>
            <div class="celllist">
                账户列表
            </div>
        </div>
        <!-- <div class="account-management-top">
            <h3>
                账号列表
            </h3> -->
            <!-- <app-button
                theme="grey"
                size="large"
                @click="onAdd"
            >
                <i class="el-icon-plus">
                    添加账号
                </i>
            </app-button> -->
        <!-- </div> -->
        <!-- <div style="height:600px;">
            <el-table :data="accountList" style="height:600px;">
                <el-table-column
                    label="负责人"
                    prop="name"
                />
                <el-table-column
                    label="联系方式"
                    prop="phone"
                />
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <app-button
                            size="mini"
                            theme="yellow"
                            @click="handleEditb (scope.row)"
                        >
                            查看
                        </app-button>
                        <app-button
                            size="mini"
                            @click="handleEdit (scope.row)"
                        >
                            编辑
                        </app-button>
                    </template>
                </el-table-column>
            </el-table>
        </div> -->
        <div class="container" style="600px">
            <el-table :data="accountList" style="height:600px;" border
                    class="table"
            >
                <el-table-column prop="name" label="负责人" 
                />
                <el-table-column prop="phone" label="联系方式"
                />
                <el-table-column label="操作" align="center" padding="0"
                                prop="status"
                >
                    <template slot-scope="scope">
                        <app-button
                            size="mini"
                            theme="yellow"
                            @click="handleEditb (scope.row)"
                        >
                            查看
                        </app-button>
                        <app-button
                            size="mini"
                            @click="handleEdit (scope.row)"
                        >
                            编辑
                        </app-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            :visible.sync="dialogAddEditVisible"
            top="1rem"
            :show-close="false"
            custom-class="dialog-add-edit-account"
            :close-on-click-modal="false"
        >
            <div>
                <h3>{{ isEdit?'编辑':'添加' }}账户</h3>
                <form class="form-add-account">
                    <h4>账户管理</h4>
                    <div class="app-form-item">
                        <label>负责人</label>
                        <input
                            v-model="formAccountInfo.name"
                            autocomplete="false"
                            type="text"
                            placeholder="请输入负责人名称"
                        >
                    </div>
                    <div class="app-form-item">
                        <label>密码</label>
                        <input
                            v-model="formAccountInfo.password"
                            autocomplete="false"
                            type="password"
                            placeholder="请输入6-18位密码"
                        >
                    </div>
                    <div class="app-form-item">
                        <label>手机号</label>
                        <input
                            v-model="formAccountInfo.phone"
                            autocomplete="false"
                            type="text"
                            placeholder="请输入手机号"
                        >
                    </div>
                </form>
                <button
                    class="btn-close-dialog-form-add-edit-account"
                    @click="onClose"
                >
                    <i class="el-icon-close" />
                </button>
                <div class="dialog-footer">
                    <app-button
                        size="large"
                        theme="plain"
                        @click="onClose"
                    >
                        取消
                    </app-button>
                    <app-button
                        size="large"
                        theme="yellow"
                        @click="onSave"
                    >
                        保存
                    </app-button>
                </div>
            </div>
        </el-dialog>
        
        <el-dialog
            :visible.sync="dialogAddEditVisibleb"
            top="1rem"
            :show-close="false"
            custom-class="dialog-add-edit-account"
            :close-on-click-modal="false"
        >
            <div>
                <h3>{{ isEdit?'编辑':'添加' }}账户</h3>
                <form class="form-add-account">
                    <h4>账户管理</h4>
                    <div class="app-form-item">
                        <label>负责人</label>
                        <input
                            readonly="readonly"
                            v-model="formAccountInfo.name"
                            autocomplete="false"
                            type="text"
                            placeholder="请输入负责人名称"
                        >
                    </div>
                    <div class="app-form-item">
                        <label>密码</label>
                        <input
                            readonly="readonly"
                            v-model="formAccountInfo.password"
                            autocomplete="false"
                            type="password"
                            placeholder="请输入6-18位密码"
                        >
                    </div>
                    <div class="app-form-item">
                        <label>手机号</label>
                        <input
                            readonly="readonly"
                            v-model="formAccountInfo.phone"
                            autocomplete="false"
                            type="text"
                            placeholder="请输入手机号"
                        >
                    </div>
                </form>
                <button
                    class="btn-close-dialog-form-add-edit-account"
                    @click="onCloseb"
                >
                    <i class="el-icon-close" />
                </button>
                <!-- <div class="dialog-footer">
                    <app-button
                        size="large"
                        theme="plain"
                        @click="onClose"
                    >
                        取消
                    </app-button>
                    <app-button
                        size="large"
                        theme="yellow"
                        @click="onSave"
                    >
                        保存
                    </app-button>
                </div> -->
            </div>
        </el-dialog>
    </div>
</template>

<script>
import AppButton from './AppButton.vue';
import {mapState} from 'vuex';
import {GET_ACCOUNT_LIST,
    UPDATE_GYM_ADMIN_USER,
    ADD_GYM_ADMIN } from '../store/action_type';
import {verifyEmptyHelper} from '../utils/index.js';

export default {
    components: {
        AppButton
    },
    data () {
        return {
            dialogAddEditVisible: false,
            dialogAddEditVisibleb: false,
            formAccountInfo: {
                name: '',
                password: '',
                phone: '',
                id: null
            },
            isEdit: false
        };
    },
    computed: {
        gymId () {
            return this.userInfo.gym_id;
        },
        ...mapState(['accountList', 'userInfo'])
    },
    created () {
        this.$store.dispatch(GET_ACCOUNT_LIST);
    },
    methods: {
        onAdd () {
            this.dialogAddEditVisible = true;
            this.formAccountInfo.name = ' ';
            this.formAccountInfo.phone = '';
            this.isEdit = false;
            this.id = null;
        },
        handleEdit (row) {
            this.dialogAddEditVisible = true;
            this.formAccountInfo.name = row.name;
            this.formAccountInfo.phone = row.phone;
            this.formAccountInfo.id = row.id;
            this.isEdit = true;
        },
        handleEditb (row) {
            this.dialogAddEditVisibleb = true;
            this.formAccountInfo.name = row.name;
            this.formAccountInfo.phone = row.phone;
            this.formAccountInfo.id = row.id;
            this.isEdit = false;
        },
        async onSave () {
            let validResult = verifyEmptyHelper(this.formAccountInfo, [
                {
                    field: 'name',
                    label: '负责人'
                },
                {
                    field: 'phone',
                    label: '手机号'
                }
            ]);
            if (!validResult.valid) {
                this.$message.warning(validResult.msg);
                return {success: false};
            }
            let result;
            let payload = {...this.formAccountInfo, gym_id: this.gymId};
            if (!payload.password) {
                delete payload.password;
            }
            payload.permission_array = JSON.stringify(['normal']);
            if (this.isEdit) {
                result = await this.$store.dispatch(UPDATE_GYM_ADMIN_USER, payload);
            } else {
                result = await this.$store.dispatch(ADD_GYM_ADMIN, payload);
            }

            if (result.success) {
                this.$notify({
                    title: this.isEdit ? '编辑成功' : '添加成功',
                    type: 'success'
                });
                this.$store.dispatch(GET_ACCOUNT_LIST);
                this.onClose();
            } else {
                this.$notify.error({
                    title: this.isEdit ? '添加失败' : '添加失败',
                    message: result.data
                });
            }
        },
        onClose () {
            this.dialogAddEditVisible = false;
        },
        onCloseb () {
            this.dialogAddEditVisibleb = false;
        }
    }
};
</script>

<style lang="css">
.account-management {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #F6F7F8;
}
.account-management-top {
  display: flex;
  position: relative;
  flex-direction: row;
  margin: 0;
  padding: 0 0 0 0;
  height: 1.66rem;
}
.account-management-top h3 {
  margin: 0;
  text-align: left;
  line-height: 1.66rem;
  background: #fff;
  flex: 1;
  text-indent: 10px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(60,68,86,1);
}
.management-top{
    line-height: 1.66rem !important;
}
.dialog-add-edit-account {
  display: flex;
  width: 27.78rem !important;
  height: 24.72rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.06rem;
}

.dialog-add-edit-account .el-dialog__header,
.dialog-add-edit-account .el-dialog__body {
  padding: 0;
}
.dialog-add-edit-account .el-dialog__body {
  flex: 1;
  display: flex;
}
.form-add-account {
  padding: 0 1rem;
  text-align: left;
}
.btn-close-dialog-form-add-edit-account {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border: none;
  background: none;
  color: #ccc;
  cursor: pointer;
}
.has-gutter tr th:last-of-type .cell{
    padding: 0 !important;
}
.has-gutter tr th:last-child .cell{
    padding: 0 !important;
}
thead tr th:last-child .cell{
    padding: 0 !important;
}
.mini{
    line-height: 0 !important;
}
.management-top h3{
    height: 100%;
    line-height: 1.66rem;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(60,68,86,1);
}
.crumbs{
    margin: 0;
}
.oo{
    width: 240px;
    height: 46px;
    background: #fff;
    text-indent: 22px;
    line-height: 46px;
    border:1px solid rgba(198,204,220,1);
    border-bottom: 0px;
    box-sizing: border-box;
    font-size: 12px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(60,68,86,1);
    text-align: left;
}
.celllist{
    width: 100%;
    background: #fff;
    height: 60px;
    text-indent: 20px;
    line-height: 60px;
    box-sizing: border-box;
    border:1px solid rgba(198,204,220,1);
    font-size: 14px;
    border-bottom: 0;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(60,68,86,1);
    text-align: left;
}
</style>
