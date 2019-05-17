<template>
    <div class="content">
        <el-tabs v-model="editableTabsValue" type="card" closable
             @tab-remove="removeTab"
    >
            <el-tab-pane
                v-for="(item) in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
                :closable="item.closable"
                :lazy="true"
            >
                <!-- 教练管理 -->
                <div v-if="item.type === 1" class="table">
                    <div class="crumbs">
                        <div class="celllist">
                            <el-row type="flex" class="row-bg" justify="space-between">
                                <el-col :span="6">
                                    <div class="grid-content">
                                        教练列表
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div @click="addCoachVisible = true" class="addccb">
                                        添加教练
                                        <svg width="14px" height="14px" class="svgg">
                                            <line x1="7" y1="0" x2="7" y2="14"
                    style="stroke:#888EA7;stroke-width:1"/>
                                            <line x1="0" y1="7" x2="14" y2="7"
                    style="stroke:#888EA7;stroke-width:1"/>
                                        </svg>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="container">
                        <el-table ref="multipleTable" :data="tableData" border
                                class="table"
                        >
                            <el-table-column prop="user_name" label="教练姓名" style="color: red !important" />

                            <el-table-column prop="phone_num" label="手机号">
                                <!-- <template slot-scope="scope">
                            <div type="text">
                                {{ tableData[scope.$index].status == 1?tableData[scope.$index].user_name:'-' }}
                            </div>
                </template>-->
                            </el-table-column>
                            <el-table-column prop="bind_time" label="加入时间">
                                <template slot-scope="scope">
                                    <div type="text">
                                        <!-- {{ getDd(new Date(tableData[scope.$index].bind_time)) }} -->
                                        {{tableData[scope.$index].bind_time}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="student_count" label="学员数量">
                                <template slot-scope="scope">
                                    <a
                                        type="text"
                                        style="color: red !important"
                                        @click="openNewMemberList(tableData[scope.$index])"
                                    >{{ tableData[scope.$index].student_count }}</a>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template slot-scope="scope">
                                    <div class="transbox">
                                        <div :class="tableData[scope.$index].student_count == 0?'gg':'bb'" type="text" @click="handleEdit(scope.$index, scope.row,tableData[scope.$index].student_count)">
                                            转移学员
                                        </div>
                                        <div class="dels" @click="handleDelete(scope.$index, scope.row)">
                                            删除
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                    </el-pagination>
            </div>-->
                    </div>

                    <!-- 转移学员弹出框 -->
                    <div class="trabox">
                        <el-dialog title="转移学员" :visible.sync="editVisible" width="700px">
                            <el-form label-width="50px">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="grid-content bg-purple">
                                            <el-row type="flex" class="row-bg" justify="space-between">
                                                <el-col :span="6">
                                                    <span class="stli">会员列表</span>
                                                    <span class="svgd">
                                                        <svg width="30px" height="4px" >
                                                            <polygon points="0,0 30,0" style="fill:#FFC001;stroke:#FFC001;stroke-width:4" /> 
                                                        </svg> 
                                                    </span>    
                                                </el-col>
                                                <el-col :span="6">
                                                    <div class="stucc">
                                                        <el-checkbox
                                                            v-model="checkAll"
                                                            :indeterminate="isIndeterminate"
                                                            @change="handleCheckAllChange"
                                                        >
                                                            全选
                                                        </el-checkbox>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <div class="stubb">
                                                    <el-checkbox-group
                                                        v-model="checkedMembers"
                                                        class="align-left"
                                                        @change="handleCheckedMemberChange"
                                                    >   
                                                        <el-checkbox
                                                            v-for="(member, ikk) in curMemberList"
                                                            :key="member.student_uid"
                                                            :label="member"
                                                        >
                                                            <span class="svge" v-show="(ikk-curMemberList.length)<-1">
                                                                <svg width="270px" height="1px" >
                                                                    <polygon points="0,0 270,0" style="fill:#E1E3E8;stroke:#E1E3E8;stroke-width:1" /> 
                                                                </svg> 
                                                            </span>
                                                            <span>{{ decodeURIComponent(member.user_name) }}</span>
                                                        </el-checkbox>
                                                    </el-checkbox-group>
                                                </div>
                                            </el-row>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-row>教练列表</el-row>
                                        <el-row class="transfer-coach-list">
                                            <div class="coabb">
                                                <el-radio
                                                    v-for="(coach, ioo) in transCoachList"
                                                    :key="coach.id"
                                                    v-model="desCoach"
                                                    :label="coach.uid"
                                                >
                                                    <span class="svgf" v-show="(ioo-transCoachList.length)<-1">
                                                        <svg width="300px" height="1px" >
                                                            <polygon points="0,0 300,0" style="fill:#E1E3E8;stroke:#E1E3E8;stroke-width:1" /> 
                                                        </svg> 
                                                    </span>
                                                    {{ coach.user_name }}
                                                </el-radio>
                                            </div>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="editVisible = false">取 消</el-button>
                                <el-button type="primary" @click="saveEdit">确 定</el-button>
                            </span>
                        </el-dialog>
                    </div>

                    <!-- 删除提示框 -->
                    <!-- <el-dialog title="提示" :visible.sync="delVisible" width="300px"
                            center
                    >
                        <el-form ref="form" :model="form" label-width="50px">
                            <el-form-item label="教练">
                                {{ form.user_name }}
                            </el-form-item>
                        </el-form>
                        <div class="del-dialog-cnt">
                            删除不可恢复，是否确定删除？
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="delVisible = false">取 消</el-button>
                            <el-button type="primary" @click="deleteRow">确 定</el-button>
                        </span>
                    </el-dialog> -->
                    <div class="bindlog" v-if="delVisiblea">
                        <div class="unbindbox">
                            <div class="ubdup">
                                <div>删除教练
                                    <span></span>
                                    <span @click="delVisiblea=false">
                                        <svg width="10px" height="10px" class="svg">
                                            <line x1="0" y1="0" x2="10" y2="10"
                    style="stroke:#888EA7;stroke-width:1"/>
                                            <line x1="10" y1="0" x2="0" y2="10"
                    style="stroke:#888EA7;stroke-width:1"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div class="ubdmd" :model="form">
                                <span class="dece"></span>
                                <div class="ubdta">是否确认删除教练</div>
                                <div class="debbp">{{ form.user_name }}</div>
                            </div>
                            <div class="ubdbt" :model="form">
                                <span @click="delVisiblea=false">取消</span>
                                <span @click="delyzy(form.student_count,form.uid,1)">删除教练</span>
                            </div>
                        </div>
                    </div>
                    <!-- lll -->
                    <div class="bindlog" v-if="delVisible">
                        <div class="unbindbox">
                            <div class="ubdup">
                                <div>删除教练
                                    <span></span>
                                    <span @click="delVisible=false">
                                        <svg width="10px" height="10px" class="svg">
                                            <line x1="0" y1="0" x2="10" y2="10"
                    style="stroke:#888EA7;stroke-width:1"/>
                                            <line x1="10" y1="0" x2="0" y2="10"
                    style="stroke:#888EA7;stroke-width:1"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div class="ubdmd" :model="form">
                                <span class="dece"></span>
                                <div class="ubdta">确认删除？删除后无法恢复</div>
                                <div class="debbp">{{ form.user_name }}</div>
                            </div>
                            <div class="ubdbt" :model="form">
                                <span @click="delVisible=false">取消</span>
                                <span @click="deleteRow(form.student_count,form.uid,1)">删除教练</span>
                            </div>
                        </div>
                    </div>

                    <div class="bindlog" v-if="addCoachVisible">
                        <div class="bindbox">
                            <div class="bdup">
                                <div>添加教练
                                    <span></span>
                                    <span @click="addCoachVisible=false">
                                        <svg width="10px" height="10px" class="svg">
                                            <line x1="0" y1="0" x2="10" y2="10"
                    style="stroke:#888EA7;stroke-width:1"/>
                                            <line x1="10" y1="0" x2="0" y2="10"
                    style="stroke:#888EA7;stroke-width:1"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div class="bdmd">
                                <div class="bdta bdtb">
                                    <span>教练手机号</span>
                                    <input type="text" v-model="coachPhoneToAdd" placeholder="请输入手机号">
                                </div>
                            </div>
                            <div class="bdbt">
                                <span @click="addCoachVisible=false">取消</span>
                                <span @click="addCoach">确定</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 看教练下面的学员 -->
                <div v-if="item.type === 2" class="table">
                    <div class="crumbs">
                        <div class="celllist">
                            <el-row type="flex" class="row-bg" justify="space-between">
                                <el-col :span="6">
                                    <div class="grid-content">
                                        学员列表
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <el-button @click="addMemberVisible = true">
                                        添加学员
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <!-- <el-table ref="multipleTable" :data="memberData[item.coach_id]" border
                            class="table"
                    > -->
                    <el-table ref="multipleTable" :data="memberData[coah]" border
                            class="table"
                    >
                        <el-table-column prop="user_name" label="学员昵称" style="color: red !important" />

                        <el-table-column prop="phone_num" label="手机号">
                            <!-- <template slot-scope="scope">
                            <div type="text">
                                {{ tableData[scope.$index].status == 1?tableData[scope.$index].user_name:'-' }}
                            </div>
                </template>-->
                        </el-table-column>
                        <el-table-column prop="class_time" label="最近上课时间">
                            <!-- <template slot-scope="scope">
                            <div type="text">
                                {{ tableData[scope.$index].status == 1?tableData[scope.$index].phone_num:'-' }}
                            </div>
                </template>-->
                        </el-table-column>
                        <el-table-column prop="class_num" label="上课次数" />
                        <el-table-column label="上课情况" align="center" width="200">
                            <template slot-scope="scope">
                                <!-- <span class="lose" @click="checkAttend(memberData[coah][scope.$index].student_uid, coah)">
                                    查看
                                </span> -->
                                <span :class="memberData[coah][scope.$index].class_num == 0?'ggp':'lose'" type="text" @click="checkAttend(memberData[coah][scope.$index].student_uid, coah, memberData[coah][scope.$index].class_num)">
                                    查看
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!-- <el-dialog title="添加学员" :visible.sync="addMemberVisible" width="300px"
                            center
                    >
                        <el-form>
                            <el-form-item>
                                学员手机号:
                                <el-input v-model="memberPhoneToAdd" placeholder="请输入手机号" />
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="addMemberVisible = false">取 消</el-button>
                            <el-button type="primary" @click="addMember(item.coach_uid)">确 定</el-button>
                        </span>
                    </el-dialog> -->
                    <div class="bindlog" v-if="addMemberVisible">
                        <div class="bindbox">
                            <div class="bdup">
                                <div>添加学员
                                    <span></span>
                                    <span @click="addMemberVisible=false">
                                        <svg width="10px" height="10px" class="svg">
                                            <line x1="0" y1="0" x2="10" y2="10"
                    style="stroke:#888EA7;stroke-width:1"/>
                                            <line x1="10" y1="0" x2="0" y2="10"
                    style="stroke:#888EA7;stroke-width:1"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div class="bdmd">
                                <div class="bdta bdtb">
                                    <span>学员手机号</span>
                                    <input type="text" v-model="memberPhoneToAdd" placeholder="请输入会员手机号">
                                </div>
                            </div>
                            <div class="bdbt">
                                <span @click="addMemberVisible=false">取消</span>
                                <span @click="addMember(item.coach_uid)">确定</span>
                            </div>
                        </div>
                    </div>

                    <el-dialog
                        class="class-status"
                        title="上课情况"
                        :visible.sync="classStatusVisible"
                        width="1000px"
                    >   
                        <span class="svgb">
                            <svg width="30px" height="4px" class="svg">
                                <polygon points="0,0 30,0" style="fill:#FFC001;stroke:#FFC001;stroke-width:4" /> 
                            </svg>
                        </span>
                        <el-row class="class-status-head">
                            <el-col :span="12">
                                <div class="class-status-info">
                                    <el-row type="flex" align="middle">
                                        <img class="class-status-headimg" :src="classInfo.head_icon">
                                        <div class="kname">{{ decodeURIComponent(classInfo.user_name) }}</div>
                                        <div v-if="classInfo.gender==='男'">
                                            <span class="boy"></span>
                                        </div>
                                        <div v-else>
                                            <span class="girl"></span>
                                        </div>
                                    </el-row>
                                    <el-row type="flex">
                                        <div class="class-status-item">
                                            年龄
                                            <div class="class-status-item-val">
                                                {{ classInfo.age }}岁
                                            </div>
                                        </div>
                                        <span class="svga">
                                            <svg width="2px" height="17px" class="svg">
                                                <polygon points="1,0 1,17" style="fill:#C6CCDC;stroke:#C6CCDC;stroke-width:1" /> 
                                            </svg>
                                        </span>
                                        <div class="class-status-item">
                                            身高
                                            <div class="class-status-item-val">
                                                {{ classInfo.stature }}cm
                                            </div>
                                        </div>
                                        <span class="svga">
                                            <svg width="2px" height="17px" class="svg">
                                                <polygon points="1,0 1,17" style="fill:#C6CCDC;stroke:#C6CCDC;stroke-width:1" /> 
                                            </svg>
                                        </span>
                                        <div class="class-status-item">
                                            体重
                                            <div class="class-status-item-val">
                                                {{ classInfo.weight }}kg
                                            </div>
                                        </div>
                                        <span class="svga">
                                            <svg width="2px" height="17px" class="svg">
                                                <polygon points="1,0 1,17" style="fill:#C6CCDC;stroke:#C6CCDC;stroke-width:1" /> 
                                            </svg>
                                        </span>
                                        <div class="class-status-item">
                                            目标
                                            <div class="class-status-item-val">
                                                {{ classInfo.goal }}
                                            </div>
                                        </div>
                                    </el-row>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <el-row class="class-status" type="flex">
                                    <div class="class-status-store" :span="6">
                                        <div class="class-ktit">入店天数</div>
                                        <div class="class-status-store-num">
                                            {{ classInfo.day_store }}
                                        </div>
                                    </div>
                                    <div class="class-status-store" :span="6">
                                        <div class="class-ktit">锻炼天数</div>
                                        <div class="class-status-store-num">
                                            {{ classInfo.exercise_day }}
                                        </div>
                                    </div>
                                    <div class="class-status-store" :span="6">
                                        <div class="class-ktit">课时次数</div>
                                        <div class="class-status-store-num">
                                            {{ classInfo.class_num }}
                                        </div>
                                    </div>
                                </el-row>
                            </el-col>
                        </el-row>

                        <div class="ydbox">
                            <el-row class="class-status-table">
                                <el-row type="flex" class="class-status-table-head">
                                    <el-col :span="6">
                                        运动记录
                                    </el-col>
                                    <el-col :span="18">
                                        运动数据
                                    </el-col>
                                </el-row>
                                <el-tabs tab-position="left" type="card">
                                    <el-tab-pane v-for="(sportitem, index) in classList" :key="index" :label="sportitem.class_time">
                                        <div class="kbox">
                                            <div class="ksb" v-for="itembb in sportitem.course_data">
                                                <div class="ktit"
                                                    :style="{ 'background': 'url(' +itembb.src + ') no-repeat left center'}">{{itembb.device_name}}
                                                </div>
                                                <div class="kha" v-if="itembb.num==1">
                                                    <div class="kyyb">
                                                        <div class="kya">
                                                            <span>运动时长</span>
                                                            <span>{{itembb.act_time}}</span>  
                                                            <span>分钟</span>
                                                        </div>
                                                        <div class="kyb">
                                                            <span>运动距离</span>
                                                            <span>{{itembb.act_distance}}</span>
                                                            <span>公里</span>
                                                        </div>
                                                        <div class="kyc">
                                                            <span>消耗热量</span>
                                                            <span>{{itembb.act_calorie}}</span>
                                                            <span>千卡</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="kha" v-if="itembb.num==2">
                                                    <div class="lltit" style="margin: 20px 0 14px">{{itembb.type}}</div>
                                                    <div class="kyyb">
                                                        <div class="kya">
                                                            <span>最大重量</span>
                                                            <span>{{itembb.act_weight}}</span>  
                                                            <span>KG</span>
                                                        </div>
                                                        <div class="kyb">
                                                            <span>锻炼次数</span>
                                                            <span>{{itembb.act_per_group_time}}</span>
                                                            <span>次/组</span>
                                                        </div>
                                                        <div class="kyc">
                                                            <span>锻炼组数</span>
                                                            <span>{{itembb.act_group_num}}</span>
                                                            <span>组</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="kha" v-if="itembb.num==3">
                                                    <div class="kya">
                                                        <span>运动时长</span>
                                                        <span>{{itembb.act_time}}</span>  
                                                        <span>分钟</span>
                                                    </div>
                                                    <div class="kyc">
                                                        <span>消耗热量</span>
                                                        <span>{{itembb.act_calorie}}</span>
                                                        <span>千卡</span>
                                                    </div>
                                                </div>
                                                <div class="ksco">
                                                    <div class="kmak"><span>教练点评</span><span v-if="itembb.img.length>0" @click="impp(itembb.img)">查看图片</span></div>
                                                    <div class="kcont">{{itembb.comment.length>0?itembb.comment:'无'}}</div>
                                                    <div v-show="imppvi" class="imppbox">
                                                        <div class="impcont">
                                                            <div class="imtit">
                                                                训练照片
                                                                <span class="svgc" @click="imlp">
                                                                    <svg width="40px" height="40px" class="svg">
                                                                        <polygon points="0,0 40,40" style="fill:#CCC;stroke:#CCC;stroke-width:4" /> 
                                                                        <polygon points="40,0 0,40" style="fill:#CCC;stroke:#CCC;stroke-width:4" /> 
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                            <div class="immn">
                                                                <div
                                                                    v-for="itkk in pharr"
                                                                    :style="{ 'background': 'url(' +itkk+ ') no-repeat center'}"
                                                                    class="impk"
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </el-tab-pane>
                                </el-tabs>
                            </el-row>
                        </div>
                    </el-dialog>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {
    LIST_GYM_PLAY_COACH,
    GET_GYM_PLAY_COACH,
    DELETE_GYM_PLAY_COACH,
    ADD_GYM_PLAY_COACH,
    GET_GYM_PLAY_MEMBER,
    TRANS_GYM_PLAY_MEMBER,
    ADDSTUDENT_GYM_PLAY_MEMBER
} from '@/store/action_type.js';
import global from '../components/Global'

const cityOptions = ['上海', '北京','大佬','大理'];

export default {
    name: 'CoachManage',
    data () {
        return {
            localhost: 'https://ll.linkfeeling.cn',
            // localhost: 'http://test.linkfeeling.cn',
            delVisiblea: '',
            delnum: '1',
            ikk: '',
            ioo: '',
            pharr: [],
            imppvi: false,
            // localhost: 'http://www.linkfeeling.cn',
            tt: "有氧运动",
            oka: 'vis',
            okb: 'hid',
            checkedCities: [],
            cities: cityOptions,
            coah: '',
            tableData: [],
            cur_page: 1,
            editVisible: false,
            addCoachVisible: false,
            delVisible: false,
            taddcellnumber: '',
            form: {},
            idx: -1,
            editableTabsValue: '1',
            editableTabs: [
                {
                    title: '教练管理',
                    name: '1',
                    type: 1,
                    closable: false
                }
            ],
            tabIndex: 2,
            memberData: {},
            coachPhoneToAdd: '',
            curMemberList: [],
            checkAll: false,
            checkedMembers: [],

            isIndeterminate: true,
            // 转移目标教练
            desCoach: null,
            transCoachList: [],
            memberPhoneToAdd: '',
            addMemberVisible: false,
            // TODO 测试数据
            classInfo: {
                goal: '保持健康',
                gender: '男',
                name: 'link234',
                head_icon:
          'https://user-gold-cdn.xitu.io/2019/1/16/1685746c4f59d230?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
                stature: '170',
                weight: '60',
                age: '24',
                day_store: 12,
                exercise_day: 12,
                class_num: 10
            },
            classList: [],
            classStatusVisible: false
        };
    },
    computed: {
        isAllCheck () {
            return this.curMemberList.every(item => {
                return item.checked;
            });
        }
    },
    created () {
        this.getData();
    },
    mounted () {},
    updated () {
        // console.log(this.del_list);
    },
    methods: {
        // handleCheckAllChange(val) {
        //     console.log(this.curMemberList)
        //     this.checkedCities = val ? cityOptions : [];
        //     this.isIndeterminate = false;
        // },
        // handleCheckedCitiesChange(value) {
        //     let checkedCount = value.length;
        //     this.checkAll = checkedCount === this.cities.length;
        //     this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        // },
        imlp () {
            this.imppvi = false;
        },
        impp (aa) {
            console.log(aa)
            let str = aa
            let arr = str
            this.pharr = arr
            this.imppvi = true;
        },
        handleCheckAllChange (val) {
            console.log(this.curMemberList)
            this.checkedMembers = val ? this.curMemberList : [];
            this.isIndeterminate = false;
        },
        handleCheckedMemberChange (value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.curMemberList.length;
            this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.curMemberList.length;
        },
        removeTab (targetName) {
            if (targetName === '1') {
                return;
            }
            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
            }

            this.editableTabsValue = activeName;
            this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        },
        getMember (uid) {
            // TODO 改成vuex action方式请求
            // return this.$axios
            //     .post(
            //         'https://dev.linkfeeling.cn/api/coach/students',
            //         JSON.stringify({
            //             cid: uid,
            //             gym_id: this.$store.state.userInfo.gym_id
            //         })
            //     )
            //     .then(response => {
            //         // TODO 调试接口字段
            //         if (response.code === 200) {
            //             this.memberData[uid] = response.data;
            //         }
            //     });
            // console.log(this.$store.state.userInfo)
            var that = this
            let datt = {
                cid: uid,
                gym_id: this.$store.state.userInfo.gym_id
            };
            this.$axios.post(this.localhost+'/api/coach/students', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}}
            )
                .then((res) => {
                    if (res.data.code == 200) {
                        var data = res.data.data
                        for(var i=0;i<data.length;i++){
                            data[i].user_name = decodeURIComponent(data[i].user_name)
                        }
                        that.memberData[uid] =data
                        that.coah = uid
                        var coach = that.coah
                        that.$set(that.memberData);
                        console.log(that.memberData)
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        // 打开新的学员列表标签
        openNewMemberList (coachItem) {
            let newTabName = ++this.tabIndex + '';
            this.editableTabs.push({
                title: coachItem.user_name + '的学员',
                name: newTabName,
                type: 2,
                closable: true,
                coach_uid: coachItem.coach_uid
            });
            this.editableTabsValue = newTabName;
            // 查询学员信息
            this.getMember(coachItem.coach_uid);
        },
        // 分页导航
        handleCurrentChange (val) {
            this.cur_page = val;
            this.getData();
        },
        getDd: function (no) {
            var date = no;
            var seperator1 = '-';
            var seperator2 = ':';
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = '0' + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate;
            }
            var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        ' ' +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds();
            return currentdate;
        },

        async getData () {
            // console.log(this);
            // console.log(this.$store.state.userInfo)
            let result = await this.$store.dispatch(LIST_GYM_PLAY_COACH, {});

            if (result.success) {
                console.log(result.data)
                this.tableData = result.data;
                global.coaarr = this.tableData
                localStorage.setItem("coaarr",this.tableData);
                
                // console.log(this.$store.state.userInfo)
            } else {
                this.$message.error('数据获取失败');
            }
        },

        // 删除教练
        async getdel (cc, uid) {
            let that = this;
            console.log(cc)
            var ppid = uid;
            if(cc > 0){
               that.$message.error('请先转移学员后,再删除该教练'); 
               return false;
            }
            console.log(global.gym_id || localStorage.getItem("gym_id"));
            let result = await this.$store.dispatch(DELETE_GYM_PLAY_COACH, {
                coach_uid: ppid,
                gym_id: global.gym_id || localStorage.getItem("gym_id")
            });

            if (result.success) {
                that.$message.success('删除成功');
                that.tableData.splice(this.idx, 1);
                that.delVisible = false;
            } else {
                console.log(999)
                that.$message.error(result.data);
                that.delVisible = false;
            }
        },

        handleEdit (index, row, status) {
            if(status == 0){
                return false;
            }
            this.idx = index;
            console.log(this.tableData);
            this.editVisible = true;
            let coachItem = this.tableData[index];
            var that = this
            let datt = {
                cid: coachItem.coach_uid,
                gym_id: this.$store.state.userInfo.gym_id
            };
            this.$axios.post(this.localhost+'/api/coach/students', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}}
            )
                .then((res) => {
                    if (res.data.code == 200) {
                        // debugger;
                        console.log(res.data.data)
                        that.curMemberList = res.data.data;
                        console.log(that.curMemberList)
                        that.curMemberList.forEach(item => (item.checked = false));
                        that.transCoachList = [].concat(that.tableData);
                        that.transCoachList.splice(that.idx, 1);
                        if (that.transCoachList.length > 0) {
                            that.desCoach = that.transCoachList[0].uid;
                            console.log(that.transCoachList)
                        }
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
            // this.getMember(coachItem.coach_uid).then(() => {
            //     this.curMemberList = this.memberData[coachItem.id];
            //     this.curMemberList.forEach(item => (item.checked = false));
            //     this.transCoachList = [].concat(this.tableData);
            //     this.transCoachList.splice(this.idx, 1);

            //     if (this.transCoachList.length > 0) {
            //         this.desCoach = this.transCoachList[0].uid;
            //     }
            // });
        },

        handleDelete (index, row) {
            this.idx = index;
            const item = this.tableData[index];
            this.form = {
                ...item
            };
            this.delVisiblea = true;
        },
        // 添加教练
        async addCoach () {
            // 先用手机号get
            let coachInfo = await this.$store.dispatch(GET_GYM_PLAY_COACH, {
                phone_num: this.coachPhoneToAdd,
                gym_id: this.$store.state.userInfo.gym_id
            });
            if (coachInfo.success) {
                var coaarr =  global.coaarr || localStorage.getItem("coaarr")
                console.log(coaarr)
                for(var i=0;i<coaarr.length;i++){
                    if(coachInfo.data.uid == coaarr[i].coach_uid){
                        this.$message.error('教练已存在, 请不要重复添加');
                        return false;
                    }
                }
                let result = await this.$store.dispatch(ADD_GYM_PLAY_COACH, {
                    coach_uid: coachInfo.data.cid
                });
                console.log(result)
                if (result.success) {
                    this.getData();
                    this.addCoachVisible = false;
                } else {
                    this.$message.error(result.message);
                }
            } else {
                this.$message.error('教练不存在, 请先添加教练');
            }
        },

        // 确定删除
        delyzy (cc,uid) {
            this.delVisiblea = false;
            this.delVisible = true;
        },
        deleteRow (cc,uid,) {   
            this.deltit = '确认删除？删除后无法恢复';
            this.getdel(cc,uid);
        },
        // 查看上课情况
        checkAttend (index, coachId, ppk) {
            if(ppk == 0){
                return false;
            }
            let member = this.memberData[coachId][index];
            console.log(123)
            // TODO 调试接口
            this.$axios
                .post(this.localhost+'/api/coach/student_data/get', {
                    cid: coachId,
                    uid: index,
                    gym_name: global.gym_name || localStorage.getItem("gym_name")
                })
                .then(response => {
                    console.log(response)
                    if (response.data.code == 200) {
                        this.classList = [];
                        this.$set(this.classList);
                        console.log(response.data.data)
                        this.classInfo = response.data.data.info;
                        var yarr = [] 
                        yarr = response.data.data.list
                        console.log(yarr)
                        console.log(yarr[0].course_data.length)
                        // console.log(yarr[3].course_data[0].img)
                        
                        for(var i=0;i<yarr.length;i++){
                            for(var j=0;j<yarr[i].course_data.length;j++){
                                yarr[i].course_data[j].comment = yarr[i].course_data[j].comment || ''
                                yarr[i].course_data[j].img = yarr[i].course_data[j].img || []

                                // let str = yarr[i].course_data[j].img
                                // let arr = str

            
                                // if(arr[0].length<5){
                                //     arr = [] 
                                // }
                                // yarr[i].course_data[j].impp = arr
                                // console.log(yarr[i].course_data[j].impp)

                                if(yarr[i].course_data[j].category=="有氧运动"){
                                    yarr[i].course_data[j].num = 1
                                }
                                if(yarr[i].course_data[j].category=="力量训练"){
                                    yarr[i].course_data[j].num = 2
                                }
                                if(yarr[i].course_data[j].category=="HIIT"){
                                    yarr[i].course_data[j].num = 3
                                }
                                if(yarr[i].course_data[j].device_name=="跑步机"){
                                    yarr[i].course_data[j].src = "https://img.linkfeeling.cn/wx_small/sportdatail/a.png"
                                }
                                if(yarr[i].course_data[j].device_name=="哑铃"){
                                    yarr[i].course_data[j].src = "https://img.linkfeeling.cn/wx_small/sportdatail/b.png"
                                }
                                if(yarr[i].course_data[j].device_name=="飞鸟架"){
                                    yarr[i].course_data[j].src = "https://img.linkfeeling.cn/wx_small/sportdatail/c.png"
                                }
                                if(yarr[i].course_data[j].device_name=="单车"){
                                    yarr[i].course_data[j].src = "https://img.linkfeeling.cn/wx_small/sportdatail/d.png"
                                }
                                if(yarr[i].course_data[j].device_name=="杠铃"){
                                    yarr[i].course_data[j].src = "https://img.linkfeeling.cn/wx_small/sportdatail/e.png"
                                }
                                if(yarr[i].course_data[j].device_name=="椭圆机"){
                                    yarr[i].course_data[j].src = "https://img.linkfeeling.cn/wx_small/sportdatail/f.png"
                                }
                                if(yarr[i].course_data[j].device_name=="HIIT"){
                                    yarr[i].course_data[j].src = "https://img.linkfeeling.cn/wx_small/sportdatail/g.png"
                                }
                                if(yarr[i].course_data[j].device_name=="罗马椅"){
                                    yarr[i].course_data[j].src = "https://img.linkfeeling.cn/wx_small/sportdatail/h.png"
                                }
                                if(yarr[i].course_data[j].device_name=="倒蹬机"){
                                    yarr[i].course_data[j].src = "https://img.linkfeeling.cn/wx_small/sportdatail/i.png"
                                }
                                if(yarr[i].course_data[j].device_name=="腹肌练习椅"){
                                    yarr[i].course_data[j].src = "https://img.linkfeeling.cn/wx_small/sportdatail/j.png"
                                }
                                if(yarr[i].course_data[j].device_name=="史密斯机"){
                                    yarr[i].course_data[j].src = "https://img.linkfeeling.cn/wx_small/sportdatail/k.png"
                                }
                                if(yarr[i].course_data[j].device_name=="奥林匹克上斜椅"){
                                    yarr[i].course_data[j].src = "https://img.linkfeeling.cn/wx_small/sportdatail/l.png"
                                }
                                if(yarr[i].course_data[j].device_name=="奥林匹克平椅"){
                                    yarr[i].course_data[j].src = "https://img.linkfeeling.cn/wx_small/sportdatail/m.png"
                                }
                                if(yarr[i].course_data[j].device_name=="可调试哑铃练习椅"){
                                    yarr[i].course_data[j].src = "https://img.linkfeeling.cn/wx_small/sportdatail/n.png"
                                }
                                if(yarr[i].course_data[j].device_name=="台阶机"){
                                    yarr[i].course_data[j].src = "https://img.linkfeeling.cn/wx_small/sportdatail/o.png"
                                }
                                if(yarr[i].course_data[j].device_name=="蝴蝶机"){
                                    yarr[i].course_data[j].src = "https://img.linkfeeling.cn/wx_small/sportdatail/p.png"
                                }
                                if(yarr[i].course_data[j].device_name=="卧式曲腿训练机"){
                                    yarr[i].course_data[j].src = "https://img.linkfeeling.cn/wx_small/sportdatail/q.png"
                                }
                            }
                        }
                        this.classList = yarr;
                        this.$set(this.classList);
                        console.log(this.classList)
                        this.$set(this.memberData);
                        
                    } else {
                        this.$message(response.data.msg);
                    }
                })
                .catch(error => { console.log(error); });

            this.classStatusVisible = true;
        },

        // 转移学员
        async saveEdit () {
            console.log(this.checkedMembers)
            console.log(localStorage.getItem("gym_id"))
            let index = this.idx;
            const item = this.tableData[index];
            let result = await this.$store.dispatch(TRANS_GYM_PLAY_MEMBER, {
                student_uid_array: JSON.stringify(this.checkedMembers),
                from_coach_uid: item.uid,
                to_coach_uid: this.desCoach,
                gym_id: global.gym_id || localStorage.getItem("gym_id")
            });
            if (result.success) {
                this.$message.success('学员转移成功');
                this.getData();
                this.editVisible = false;
            } else {
                this.$message.error(result.data);
            }
        },
        async addMember (uid) {
            // 先用手机号get
            let memberInfo = await this.$store.dispatch(GET_GYM_PLAY_MEMBER, {
                phone_num: this.memberPhoneToAdd,
                id: global.gym_id || global.gym_id || localStorage.getItem("gym_id")
            });
            console.log(memberInfo)
            if (memberInfo.success) {
                let result = await this.$store.dispatch(
                    ADDSTUDENT_GYM_PLAY_MEMBER, {
                    uid: memberInfo.data.uid,
                    student_nick: memberInfo.data.nick_name,
                    gym_id: global.gym_id || localStorage.getItem("gym_id"),
                    cid: uid,
                    phone_num: memberInfo.data.phone_num
                });
                console.log(result)
                if (result.success == true) {
                    console.log(result)
                    result.data.user_name = decodeURIComponent(result.data.user_name)
                    this.memberData[uid].push(result.data);
                    console.log(this.memberData[uid])
                    this.$set(this.memberData);
                    this.addMemberVisible = false
                    this.$message.success(`添加学员成功`);
                }
                if (result.success == false){
                    console.log(123)
                    this.addMemberVisible = false
                    this.$message.error(`该学员已是当前教练学员,请不要重复添加`);
                }
            } else {
                this.$message.error('学员不存在, 请先添加学员');
            }
        }
    }
};
</script>
<style lang="scss">
@font-face {
  font-family: 'DINEngschriftStd';
  src: local('DINEngschriftStd'), url('../assets/DIN1451Std Engschrift.TTF') format('truetype');
}
a{
    cursor:pointer;
}
.class-status {
    .el-dialog__body {
        padding: 0;
        position: relative;
    }
}
.class-status-head {
    padding: 30px 45px;
    height: 110px;
    box-sizing: content-box !important;
    .class-status-headimg {
        width: 50px;
        height:50px;
        border-radius: 50%;
        margin-right: 20px;
    }
}
.class-status-item {
    margin: 20px 34px 0 27px;
}
.class-status-item:nth-of-type(1) {
    margin: 20px 34px 0 15px;
}
.class-status-table {
    .el-tabs__header {
        width: 25%;
    }
    .class-status-table-head {
        background: #000;
        color: #fff;
        padding: 20px;
    }
    .el-tabs__item.is-active {
        background-color: #ff9900;
        color: #000;
    }
    .class-status-detail {
        padding: 20px;
    }
    .class-status-dataitem {
        border: 1px solid #eee;
        margin-right: 2px;
    }

}
.container .el-table thead {
  color: #5a6286;
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(90, 98, 134, 1);
}
.el-table th {
  background: #e9eef6;
  margin-left: 1px;
  height: 35px;
  box-sizing: content-box;
  padding: 0;
}
.el-table tr {
  height: 50px;
}
.el-table td,
.el-table th.is-leaf {
  border: 1px solid rgba(198, 204, 220, 1);
  border-left: 0;
  border-top: 0;
}
.el-table tr:nth-child(even) {
  background: #f9fafc;
}
.el-table--small td,
.el-table--small th {
  padding: 5px 0;
  box-sizing: content-box !important;
}
.el-table--small td {
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(48, 56, 73, 1);
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(90, 98, 134, 1);
}
.el-table--small th {
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(90, 98, 134, 1);
}
.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 30px;
  box-sizing: border-box;
}
.has-gutter tr {
}
.el-table__row .cell {
  position: relative;
  width: inherit;
  height: inherit;
  padding: 0;
  display: flex;
  justify-content: space-between;
  margin-left: 0;
}
tbody tr td:last-child .cell {
  margin: 0 auto;
}
tbody tr td:nth-of-type(1) .cell {
  margin-left: 0;
}
.content{
    padding: 20px;
    background: #F6F7F8;
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable{
    background: #fff;
}
.el-tabs__header{
    margin: 0 !important;
}
.content{
    height: 615px;
}
.table{
    height: 560px;
}
.el-dialog__body{
    padding: 0 !important;
    position: relative;
}
.el-dialog__header{
    text-align: left;
    position: relative;
}
.stubb .el-checkbox__input{
    float: right;
}
.stubb .el-checkbox__label{
    float: left;
    padding: 0 0 0 0px;
    height: 100%;
    line-height: 47px;
    text-indent: 25px;
}
.stucc .el-checkbox{
    width: 70px;
}
.stucc .el-checkbox__input{
    float: right;
    margin: 2px 15px 0 0;
}
.stubb .el-checkbox__input{
    float: right;
    margin: 16px 17px 0 0;
}
.coabb{
    margin-top: 14px;
    border: 1px solid rgba(225,227,232,1);
    width: 315px;
}
.coabb .el-radio__input{
    float: right;
    margin: 18px 16px 0 0;
}
.coabb .el-radio{
    height: 47px;
    .el-radio__label{
        height: 47px;
        line-height: 47px;
        display: inline-block;
    }
    .el-radio{
        width: 220px;
    }
}
.el-tabs--left.el-tabs--card .el-tabs__item.is-left{
    text-align: left;
    height: 40px;
    line-height: 20px;
    box-sizing: content-box;
    padding: 16px 70px 10px 39px !important;
    width: 3rem;
    display: inline-block;
    white-space: initial;
    font-size:14px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(60,68,86,1);
}
.el-tabs__nav-prev,.el-tabs__nav-next{
    display: none !important;
}
.ydbox .el-tabs__nav-scroll,.ydbox .el-tabs__header{
    width: 220px;

}
.ydbox .el-tabs__nav-wrap{
    padding: 0 !important;
}
.ydbox .el-tabs__nav{
    width: 220px;
    display: flex;
    flex-direction: column;
    .el-tabs__item{
        width: 220px;
        height: 60px;
        box-sizing: border-box;
        display: block;
        flex: 1;
    }
}
.trabox .el-dialog__body{
    padding-top: 24px !important;
}
.trabox .stucc .el-checkbox__input{
    margin: 2px 6px 0 0;
}
.trabox .el-dialog__footer{
    border-top: 1px solid #E5E7EB;
    padding: 10px 28px 20px;
    margin-top: 18px;
    height: 70px;
}
.trabox .dialog-footer{
    height: 40px !important;
    padding: 0 !important;
}
.trabox .el-button--default{
    margin-left: 0;
}
// .trabox .el-button--default:hover{
//     margin-left: 0;
// }
.trabox .el-button--primary{
    width: 100px !important;
    background:rgba(255,192,1,1);
    border-radius:2px;
    color: #000;
    border-color: rgba(255,192,1,1);
}
.trabox .el-button--primary:hover{
    width: 100px !important;
    background:#fff;
    color: rgba(255,192,1,1);
    border-radius:2px;
    border-color: rgba(255,192,1,1);
}
</style>

<style scoped>
.transfer-coach-list .el-radio {
  display: block;
  text-align: left;
  width: 315px;
  box-sizing: border-box;
}
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.oo {
  width: 240px;
  height: 46px;
  background: #fff;
  text-indent: 22px;
  line-height: 46px;
  border: 1px solid rgba(198, 204, 220, 1);
  border-bottom: 0px;
  box-sizing: border-box;
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(60, 68, 86, 1);
}
.el-breadcrumb__inner {
  width: 240px;
  height: 46px;
}
.content {
  padding-top: 20px;
  padding-left: 20px;
}
.crumbs {
  margin: 0;
}
.celllist {
  width: 100%;
  background: #fff;
  height: 60px;
  text-indent: 20px;
  line-height: 60px;
  box-sizing: border-box;
  border: 1px solid rgba(198, 204, 220, 1);
  font-size: 14px;
  border-bottom: 0;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(60, 68, 86, 1);
  text-align: left;
}
.container {
  border-radius: 0;
  padding: 0;
}
.aa {
  background: #5780ff;
  height: 25px;
  width: 60px;
  display: inline-block;
  color: #fff;
  font-size: 12px;
  text-indent: 10px;
  letter-spacing: 2px;
  line-height: 25px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
}
.bb {
  background: #e8eaee;
  height: 25px;
  width: 60px;
  display: inline-block;
  color: rgba(90, 98, 134, 1);
  letter-spacing: 2px;
  font-size: 12px;
  text-indent: 10px;
  line-height: 25px;
  font-family: PingFangSC-Medium;
  letter-spacing: 2px;
  text-indent: 0;
}
.cc {
  background: #ffc001;
  height: 25px;
  width: 60px;
  display: inline-block;
  color: rgba(60, 68, 86, 1);
  font-size: 12px;
  text-align: center;
  line-height: 25px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  letter-spacing: 2px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.dd {
  background: #3c4456;
  height: 25px;
  width: 60px;
  display: inline-block;
  font-size: 12px;
  text-align: center;
  line-height: 25px;
  font-weight: 500;
  text-align: center;
  color: #fff;
  letter-spacing: 2px;
  font-family: PingFangSC-Medium;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.ee {
  background: #fff;
  border: 1px solid #3c4456;
  height: 25px;
  width: 60px;
  letter-spacing: 2px;
  display: inline-block;
  font-size: 12px;
  text-align: center;
  line-height: 25px;
  font-weight: 500;
  color: #3c4456;
  font-family: PingFangSC-Medium;
}

.dialog-footer {
  position: relative;
}
.align-left {
  text-align: left;
}
tbody tr td:last-child .cell button:nth-of-type(1){
    width: 80px !important;
    padding: 0;
    height: 25px;
    background: #FFC001;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(60,68,86,1);
    line-height: 25px;
    font-size: 12px;
}
tbody tr td:last-child .cell button:nth-of-type(2){
    width: 60px !important;
    height: 25px;
    padding: 0;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(60,68,86,1);
    line-height: 25px;
    font-size: 12px;
}
tbody tr td:last-child .cell button span{
    width: 100% !important;
    padding: 0 !important;
    display: inline-block !important;
    height: 100% !important;
}
.has-gutter tr th:last-of-type .cell{
    padding: 0 !important;
}
.lose{
    width: 60px;
    display: inline-block;
    height: 25px;
    text-align: center;
    background:rgba(255,192,1,1);
    border-radius:2px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size:12px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(60,68,86,1);
    line-height:25px;
}
.ggp{
    width: 60px;
    display: inline-block;
    height: 25px;
    text-align: center;
    background:gray;
    border-radius:2px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size:12px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:#fff;
    line-height:25px;
}
.boy{
    display: inline-block;
    width: 21px;
    height: 21px;
    border-radius: 50%;
    background: url(../assets/boy.png) center no-repeat;
    background-size: 21px 21px;
}
.girl{
    display: inline-block;
    width: 21px;
    height: 21px;
    border-radius: 50%;
    background: url(../assets/girl.png) center no-repeat;
    background-size: 21px 21px;
}
.kbox{
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}
.ktit{
    text-indent: 40px;
    height:30px;
    font-size:14px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(39,42,56,1);
    line-height:30px;
    background-size: 30px 30px !important;
}
.vis{
    display: block;
}
.hid{
    display: none;
}
.ksb{
    height: auto;
    /* padding-bottom: 20px; */
}
.kya,.kyb,.kyc{
    margin-top: 15px;
    width: 110px;
    float: left;
    margin-right: 10px;
    position: relative;
    height: 68px;
    border: 1px solid #979797;
}
.kya span:nth-of-type(1),.kyb span:nth-of-type(1),.kyc span:nth-of-type(1){
    display: inline-block;
    position: absolute;
    text-align: left;
    text-indent: 0;
    top: 6px;
    left: 8px;
    height:17px;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(60,68,86,0.5);
    line-height:17px;
}
.kya span:nth-of-type(2),.kyb span:nth-of-type(2),.kyc span:nth-of-type(2){
    display: inline-block;
    position: absolute;
    text-align: left;
    text-indent: 0;
    top: 30px;
    left: 8px;
    font-weight:400;
    height:24px;
    font-size:24px;
    font-family:DINEngschriftStd;
    color:rgba(60,68,86,1);
    line-height:24px;
}
.kya span:nth-of-type(3),.kyb span:nth-of-type(3),.kyc span:nth-of-type(3){
    display: inline-block;
    position: absolute;
    text-align: left;
    text-indent: 0;
    top: 43px;
    left: 79px;
    font-weight:400;
    height:17px;
    font-size:12px;
    font-family:DINEngschriftStd;
    color:rgba(60,68,86,1);
    line-height:17px;
}
.lltit{
    text-indent: 0;
}
.kname{
    margin-right: 10px;
}
.class-status-item-val{
    margin-top: 4px;
}
.svga{
    height: 17px;
    padding-top: 30px;
}
.stubb .el-checkbox{
    height: 47px;
    line-height: 47px;
}
.el-row--flex.is-justify-space-between .el-checkbox .el-checkbox__input span{
    float: right;
    position: absolute;
    right: 0;
}
.stubb .el-checkbox__input{
    float: right;
    margin: 16px 17px 0 0;
}
</style>

<style scoped>
.class-status-store {
    margin-right: 14px;
    width: 114px;
    border-radius: 4px;
    border: 1px solid #979797;
    height: 80px;
    position: relative;
}
.class-status-store-num{
    position: absolute;
    left: 16px;
    top: 45px;
    height:30px;
    font-size:30px;
    font-family:DINEngschriftStd;
    color:rgba(60,68,86,1);
    line-height:30px;
}
.class-ktit{
    height:17px;
    font-size:12px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(60,68,86,0.5);
    line-height:17px;
    position: absolute;
    top: 13px;
    left: 16px;
}
.el-dialog__title{
    font-size:14px !important;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(60,68,86,1);
}
.svgb{
    position: absolute;
    top: -10px;
    left: 30px;
}
.el-row--flex.is-justify-space-between{
    padding: 0 46px 14px 30px;
    position: relative;
}
.el-row--flex.is-justify-space-between .el-checkbox .el-checkbox__input span{
    float: right;
    position: absolute;
    right: 0;
}
.stli{
    width: 200px;
    display: inline-block;
}
.stubb{
    display: inline-block;
    border:1px solid rgba(225,227,232,1);
    width: 286px;
    margin-left: 30px;
}
.stubb .el-checkbox{
    width: 100%;
    margin: 0;
}
.stubb .el-checkbox__input{
    float: right;
    margin: 16px 17px 0 0;
}
.ksco{
    border-top: 1px dashed #C6CCDC;
    width: 739px;
    height: 113px;
    border-bottom: 1px solid #C6CCDC;
    margin-bottom: 20px;
}
.kha{
    min-height: 100px;
}
.kyyb{
    height: 100px;
}
.kmak{
    margin-top: 14px;
}
.kmak span:nth-of-type(1){
    width:80px;
    height:24px;
    background:rgba(39,42,56,1);
    border-radius:2px;
    border:1px solid rgba(39,42,56,1);
    display: inline-block;
    text-align: center;
    line-height: 24px;
    color: #fff;
    font-size:12px;
    font-family:PingFangSC-Medium;
    font-weight:500;
}
.kmak span:nth-of-type(2){
    height:24px;
    text-decoration:underline;
    display: inline-block;
    text-align: center;
    line-height: 24px;
    color:rgba(87,128,255,1);
    font-size:12px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    margin-left: 22px;
}
.kcont{
    margin-top: 11px;
}
.gg{
    width:80px;
    height:25px;
    background:gray;
    border-radius:2px;
    font-size:12px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:#fff;
    line-height:25px;
    text-align: center;
    float: left;
    letter-spacing: 2px;
}
.bb{
    width:80px;
    height:25px;
    background:rgba(255,192,1,1);
    border-radius:2px;
    font-size:12px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(60,68,86,1);
    line-height:25px;
    text-align: center;
    float: left;
    cursor:pointer;
}
.dels{
    float: right;
    width:60px;
    height:25px;
    border-radius:2px;
    border:1px solid rgba(60,68,86,1);
    font-size:12px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(60,68,86,1);
    line-height:25px;
    cursor:pointer;
    text-align: center;
}
.transbox{
    width: 150px;
    height: 25px;
}
.imppbox{
    background: #000;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 3001;
    top: 0;
    left: 0;
    opacity: 1;
}
.imtit{
    display: inline-block;
    height: 80px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    position: relative;
    font-size: 30px;
    line-height: 80px;
    text-indent: 20px;
}
.impcont{
    width: 1000px;
    height: 500px;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    display: inline-block;
    opacity: 1;
}
.immn{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 300px;
    padding-top: 50px;
}
.impk{
    width: 250px;
    height: 300px;
    display: inline-block;
    background-size: 250px 300px !important;
}
.svgc{
    position: absolute;
    right: 30px;
    top: 20px;
    display: inline-block;
    width: 40px;
    height: 40px;
    box-sizing: border-box;
}
.svgc svg{
    position: absolute;
    left: 0;
    top: 0;
}
.debbp{
    padding-top: 20px;
    height: 30px;
    text-align: center;
    font-size: 20px;
}
.bindbox{
    height: 300px;
}
.bdmd{
    height: 103px;
}
.svgd{
    display: inline-block;
    width: 30px;
    height: 4px;
    box-sizing: border-box;
    position: absolute;
    top: -0.9rem;
}
.trabox .el-dialog__body{
    padding-top: 24px !important;
}
.svge{
    position: absolute;
    top: 0.5rem;
    height: 1px;
    width: 270px;
    left: -0.45rem;
}
.svgf{
    position: absolute;
    top: 0.5rem;
    height: 1px;
    width: 300px;
    left: 0.25rem;
}
.stubb .el-checkbox__label{
    color: #303849;
}
.addccb{
    width: 3rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background: #3C4456;
    color: #fff;
    position: absolute;
    right: 0.45rem;
    font-size:0.35rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    top: 0.375rem;
    text-indent: 1.173rem;
}
.svgg{
    position: absolute;
    top: 0.275rem;
    left: 0.475rem;
}
</style>
