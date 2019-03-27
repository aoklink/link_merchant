<template>
    <div class="management">
        <div class="management-top">
            <h3>店铺列表</h3>
            <app-button custom-class="btn-add-store" size="medium" theme="grey"
                        @click="onAdd"
            >
                <i class="el-icon-plus"> 添加店铺
                </i>
            </app-button>
        </div>
        <div>
            <el-table :data="gymInfoList" style="width: 100%" stripe
                      header-cell-class-name="management-table-header"
            >
                <el-table-column label="健身房名称" prop="name" />
                <el-table-column label="联系人" prop="gymAdminUserName" />
                <el-table-column label="联系方式" prop="phone" />
                <el-table-column label="城市" prop="city" />
                <el-table-column label="用户数" prop="memberCount" />
                <el-table-column align="left" label="操作">
                    <template slot-scope="scope">
                        <app-button size="mini" theme="yellow" @click="handleViewDetail(scope.row)">
                            查看
                        </app-button>
                        <app-button size="mini" theme="plain" @click="handleEdit(scope.row)">
                            编辑
                        </app-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :key="dialogAddEditKey" :visible.sync="dialogAddEdit"
                   top="1rem"
                   :show-close="false"
                   :close-on-click-modal="false"
                   custom-class="dialog-add-edit-gym"
        >
            <form-add-edit-g-y-m :is-edit="dialogIsEdit" :edit-gym-id="editGymId" @close="onClosedialogAddEdit" />
        </el-dialog>
    </div>
</template>

<script>
import FormAddEditGYM from './FormAddEditGYM.vue';
import {GET_ALL_GYM_INFO, GET_GYM_INFO, GET_COACH_LIST_BY_GYMID, GET_CLASS_INFO_LIST_BY_GYMID, GET_GYM_ADMIN_USER_GET_BIND} from '../store/action_type.js';
import {ADD_GYM_INFO_LIST_SELECTED} from '../store/mutation_type.js';
import {mapState} from 'vuex';
import { Promise } from 'q';
import AppButton from './AppButton.vue';

export default {
    components: {
        FormAddEditGYM,
        AppButton
    },
    data () {
        return {
            dialogAddEdit: false,
            dialogAddEditKey: 1,
            dialogIsEdit: false,
            editGymId: 0
        };
    },
    computed: {
        ...mapState(['gymInfoList', 'gymInfoListSelected'])
    },
    created () {
        this.$store.dispatch(GET_ALL_GYM_INFO);
    },
    methods: {
        onClosedialogAddEdit () {
            this.dialogAddEdit = false;
            this.dialogAddEditKey++;
        },
        async handleViewDetail (row) {
            if (this.gymInfoListSelected.find(item => item.id == row.id)) {
                this.$emit('addTab', row.id);
                return;
            }
            let [resultGymInfo] = await Promise.all([
                this.$store.dispatch(GET_GYM_INFO, {id: row.id}),
                this.$store.dispatch(GET_COACH_LIST_BY_GYMID, {gym_id: row.id}),
                this.$store.dispatch(GET_GYM_ADMIN_USER_GET_BIND, {gym_id: row.id}),
                this.$store.dispatch(GET_CLASS_INFO_LIST_BY_GYMID, {gym_id: row.id})
            ]);
            if (resultGymInfo.success) {
                let gymInfo = resultGymInfo.data;
                this.$store.commit(ADD_GYM_INFO_LIST_SELECTED, gymInfo);
                this.$emit('addTab', gymInfo.id);
            } else {
                this.$message.error(resultGymInfo.data);
            }
        },
        async handleEdit (row) {
            this.dialogAddEdit = true;
            this.dialogIsEdit = true;
            this.editGymId = row.id;
        },
        onAdd () {
            this.dialogAddEdit = true;
            this.dialogIsEdit = false;
        }
    }
};

</script>

<style>
    .management{
        display: flex;
        flex-direction: column;
    }
    .management-top{
        position: relative;
        display: flex;
        flex-direction: row;
    }
    .management-top{
        margin: 0;
        padding: 0 1rem ;
        line-height: 2rem;
    }
    .management-top h3{
        margin: 0;
    }
    .management-table-header{
        background:rgba(233,238,246,1)!important;
    }
    .btn-add-store{
        position: absolute;
        right: 1rem;
        top: .5rem;
    }
    .dialog-add-edit-gym{
        display: flex;
        width:27.78rem !important;
        height:24.72rem;
        background:rgba(255,255,255,1);
        border-radius:0.06rem;
    }
    .dialog-add-edit-gym .el-dialog__header,.dialog-add-edit-gym .el-dialog__body{
        padding: 0;
    }
    .dialog-add-edit-gym .el-dialog__body{
        flex: 1;
        display: flex;
    }
</style>
