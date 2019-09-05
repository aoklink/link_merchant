<template>
    <div class="content">
        <div class="table">
            <div class="crumbs">
                <div class="oo">
                    大屏管理
                </div>
                <div class="celllist">
                    大屏管理
                    <!-- <div @click="yhhy" class="addccb">
                                        添加大屏
                                        <svg width="14px" height="14px" class="svgg">
                                            <line x1="7" y1="0" x2="7" y2="14"
                    style="stroke:#888EA7;stroke-width:1"/>
                                            <line x1="0" y1="7" x2="14" y2="7"
                    style="stroke:#888EA7;stroke-width:1"/>
                                        </svg>
                                    </div> -->
                </div>
            </div>
            <div class="container">
                <!-- <div class="handle-box">
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                    <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                        <el-option key="1" label="广东省" value="广东省"></el-option>
                        <el-option key="2" label="湖南省" value="湖南省"></el-option>
                    </el-select>
                    <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                    <el-button type="primary" icon="search" @click="tadd">添加手环</el-button>
                </div> -->
                <el-table ref="multipleTable" :data="data" border
                          class="table" @selection-change="handleSelectionChange"
                >
                    <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                    <el-table-column prop="screen_code" label="编号"
                    />
                    <el-table-column prop="screen_id" label="大屏ID">
                    </el-table-column>
                    <el-table-column prop="device_name" label="显示器械">
                    </el-table-column>
                    <el-table-column prop="remark" label="备注">
                    </el-table-column>
                    <el-table-column label="操作" align="center"
                                     prop="status"
                    >
                        <template slot-scope="scope">
                            <div :class="tableData[scope.$index].status == 0?'cc':'cc'" type="text" class="red" @click="yhhyb(scope.$index, scope.row)">编辑</div>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                    </el-pagination>
                </div> -->
            </div>

            <!-- 解绑弹出框 -->
            <el-dialog title="解除绑定" :visible.sync="unBindVisible" width="30%">
                <el-form ref="form" :model="form" label-width="50px">
                    <el-form-item label="手环">
                        <div v-model="form.id">
                            {{ form.id }}
                        </div>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="unBindVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveUn">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 添加大屏 -->
            <div class="bindloga" v-if="editVisiblep">
                <div class="bindboxa">
                    <div class="bdup">
                        <div>添加大屏
                            <span></span>
                            <span @click="editVisiblep=false">
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
                            <span class="icuu">大屏ID</span>
                            <input type="text" v-model="form.screen_id" placeholder="请输入大屏ID">
                        </div>
                        <div class="bdta bdtb">
                            <span class="icuu">编号</span>
                            <input type="text" v-model="form.screen_code" placeholder="请输入编号">
                        </div>
                        <div class="bdta bdtb">
                            <span class="icuu">人数设定</span>
                            <input type="text" v-model="form.people_num" readonly placeholder="请选择人数设定">
                            <el-dropdown split-button type="primary" class="drop">
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="sect(1)">1</el-dropdown-item>
                                    <el-dropdown-item @click.native="sect(2)">2</el-dropdown-item>
                                    <el-dropdown-item @click.native="sect(3)">3</el-dropdown-item>
                                    <el-dropdown-item @click.native="sect(4)">4</el-dropdown-item>
                                    <el-dropdown-item @click.native="sect(5)">5</el-dropdown-item>
                                    <el-dropdown-item @click.native="sect(6)">6</el-dropdown-item>
                                    <el-dropdown-item @click.native="sect(7)">7</el-dropdown-item>
                                    <el-dropdown-item @click.native="sect(8)">8</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <div class="bdta bdtb">
                            <span class="icuu">备注</span>
                            <input type="text" v-model="form.remark" placeholder="请填写备注">
                        </div>
                    </div>
                    <div class="midtit">
                        <span>器械</span>
                        <span>请勾选此大屏上需要显示的数据所对应的器械</span>
                    </div>
                    <template>
                        <el-checkbox-group v-model="checkList">

                            <el-checkbox 
                                v-for="(item, index) in devicelist"
                                :key="index"
                                :label="item"
                            ></el-checkbox>
                        </el-checkbox-group>
                    </template>
                    <div class="bdbt">
                        <span @click="editVisiblep=false">取消</span>
                        <span @click="saveAdd">确定</span>
                    </div>
                </div>
            </div>
            <!-- 编辑大屏 -->
            <div class="bindloga" v-if="editVisiblepb">
                <div class="bindboxa">
                    <div class="bdup">
                        <div>编辑大屏
                            <span></span>
                            <span @click="editVisiblepb=false">
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
                        <div class="bdta">
                            <span class="icuu">大屏ID</span>
                            <div class="bdttn" v-model="formb.screen_id">{{formb.screen_id}}</div>
                        </div>
                        <div class="bdta bdtb">
                            <span class="icuu">编号</span>
                            <input type="text" v-model="formb.screen_code" placeholder="请输入编号">
                        </div>
                        <div class="bdta bdtb">
                            <span class="icuu">人数设定</span>
                            <input type="text" v-model="formb.people_num" readonly placeholder="请选择人数设定">
                            <el-dropdown split-button type="primary" class="drop">
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="sectb(1)">1</el-dropdown-item>
                                    <el-dropdown-item @click.native="sectb(2)">2</el-dropdown-item>
                                    <el-dropdown-item @click.native="sectb(3)">3</el-dropdown-item>
                                    <el-dropdown-item @click.native="sectb(4)">4</el-dropdown-item>
                                    <el-dropdown-item @click.native="sectb(5)">5</el-dropdown-item>
                                    <el-dropdown-item @click.native="sectb(6)">6</el-dropdown-item>
                                    <el-dropdown-item @click.native="sectb(7)">7</el-dropdown-item>
                                    <el-dropdown-item @click.native="sectb(8)">8</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <div class="bdta bdtb">
                            <span class="icuu">备注</span>
                            <input type="text" v-model="formb.remark" placeholder="请填写备注">
                        </div>
                    </div>
                    <div class="midtit">
                        <span>器械</span>
                        <span>请勾选此大屏上需要显示的数据所对应的器械</span>
                    </div>
                    <template>
                        <el-checkbox-group v-model="checkListb">

                            <el-checkbox 
                                v-for="(item, index) in devicelist"
                                :key="index"
                                :label="item"
                            ></el-checkbox>
                        </el-checkbox-group>
                    </template>
                    <div class="bdbt">
                        <span @click="editVisiblepb=false">取消</span>
                        <span @click="saveAddb">确定</span>
                    </div>
                </div>
            </div>
            <!-- 删除提示框 -->
            <el-dialog title="提示" :visible.sync="delVisible" width="300px"
                       center
            >
                <el-form ref="form" :model="form" label-width="50px">
                    <el-form-item label="手环">
                        <el-input v-model="form.id" />
                    </el-form-item>
                </el-form>
                <div class="del-dialog-cnt">
                    删除不可恢复，是否确定删除？
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteRow">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import global from '../components/Global';
export default {
    name: 'Basemember',
    data () {
        return {
            localhost: 'http://test.linkfeeling.cn',
            // localhost: 'https://dev.linkfeeling.cn',
            // url: './static/vuetable.json',
            url: this.localhost + '/api/platform/members',
            tableData: [],
            checkList: [],
            devicelist: [],
            checkListb: [],
            devicelistb: [],
            yybox: {},
            ttbox: [],
            cur_page: 1,
            inquiry: '',
            multipleSelection: [],
            select_cate: '',
            select_word: '',
            del_list: [],
            is_search: false,
            editVisiblep: false,
            editVisiblepb: false,
            editVisible: false,
            unBindVisible: false,
            taddVisible: false,
            delVisible: false,
            taddcellnumber: '',
            form: {
                device_name: '',
                name: '',
                screen_code: '',
                screen_id: '',
                people_num: '',
                status: '',
                remark: '',
                checkList: []
            },
            formb: {
                device_name: '',
                name: '',
                screen_code: '',
                screen_id: '',
                people_num: '',
                status: '',
                remark: '',
                checkList: [],
                usb: []
            },
            idx: -1
        };
    },
    computed: {
        data () {
            return this.tableData.filter((d) => {
                let is_del = false;
                for (let i = 0; i < this.del_list.length; i++) {
                    if (d.screen_id === this.del_list[i].screen_id) {
                        is_del = true;
                        break;
                    }
                }
                if (!is_del) {
                    console.log(d);
                    // console.log(this.select_cate)
                    if (d.screen_id.indexOf(this.select_cate) > -1) {
                        return d;
                    }
                }
            });
        }
    },
    created () {
        this.getData();
        this.getDev()
    },
    mounted () {

    },
    updated () {
        console.log(this.del_list);
    },
    methods: {
        mon () {
            console.log(999)
        },
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
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
                        ' ' + date.getHours() + seperator2 + date.getMinutes() +
                        seperator2 + date.getSeconds();
            return currentdate;
        },
        // 获取器械
        getDev () {
            let datt = {
                gym_name: global.gym_name || localStorage.getItem('gym_name'),
                page: this.cur_page
            };
            console.log(this);
            this.$axios.post(this.localhost + '/api/platform/gym/devices/list', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res)
                    var xbox = res.data.data;
                    this.devicelist = xbox;
                    this.devicelistb = xbox;
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        // 获取 easy-mock 的模拟数据
        getData () {
            let datt = {
                gym_name: global.gym_name || localStorage.getItem('gym_name'),
                page: this.cur_page
            };
            console.log(this);
            this.$axios.post(this.localhost + '/api/platform/gym/screen/setting/list', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {            
                    console.log(res)
                    var xbox = res.data.data
                    console.log(xbox);
                    // console.log(new Date(xbox[0].bind_time));
                    var aDiv = [];
                    for (var i = 0; i < xbox.length; i++) {
                        // xbox[i].device_name=xbox[i].device_name.split(',');  
                        aDiv.push(xbox[i]);
                    }
                    aDiv.sort(function (a, b) { return new Date(b.id || 0) - new Date(a.id || 0); });
                    for (var i = 0; i < aDiv.length; i++) {
                        aDiv[i].ncc = (i + 1);
                    }
                    this.tableData = aDiv;
                    console.log(this.tableData);
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        yzy () {
            console.log('yzy');
        },
        // 添加手环请求接口
        // getadd() {
        //     let that =this;
        //     let datt = {
        //         gym_name: 'link_office',
        //         id: this.taddcellnumber,
        //         nick_name: '',
        //         phone_num: '',
        //         bind_time: '',
        //         page: this.cur_page
        //         }
        //         console.log("add1")
        //     this.$axios.post('https://ll.linkfeeling.cn/api/platform/bracelet/add',JSON.stringify(datt))
        //     .then((res) => {
        //         console.log(res.data.code)
        //         if(res.data.code == 200){
        //             that.getData();
        //         }else{
        //             console.log(res.data)
        //         }
        //     })
        //     .catch((res) => {
        //         console.log(res)
        //     })
        // },
        // 绑定手环请求接口
        getedit () {
            let that = this;
            let datt = {
                gym_name: global.gym_name || localStorage.getItem('gym_name'),
                id: this.form.id,
                uid: this.form.uid,
                nick_name: this.form.nick_name,
                phone_num: this.form.phone_num,
                bind_time: Date.parse(new Date()),
                page: this.cur_page
            };
            this.$axios.post(this.localhost + '/api/platform/bracelet/bind', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res.data.code);
                    if (res.data.code == 200) {
                        that.$set(that.tableData, that.idx, that.form);
                        that.editVisible = false;
                        that.$message.success(`绑定手环成功`);
                        that.getData();
                    } else {
                        console.log(res.data);
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        sect(index) {
            console.log(index)
            this.form.people_num = index
            console.log(this.form.people_num)
            this.$set(this.form);
        },
        sectb(index) {
            console.log(index)
            this.formb.people_num = index
            this.$set(this.formb);
        },
        // 解绑手环请求接口
        getfalseedit () {
            this.$route.path(editor);
            let that = this;
            let datt = {
                gym_name: global.gym_name || localStorage.getItem('gym_name'),
                id: this.form.id,
                end_time: Date.parse(new Date()),
                page: this.cur_page
            };
            this.$axios.post(this.localhost + '/api/platform/bracelet/unbind', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res.data.code);
                    if (res.data.code == 200) {
                        that.$set(that.tableData, that.idx, that.form);
                        that.unBindVisible = false;
                        that.$message.success(`解绑手环成功`);
                        that.getData();
                    } else {
                        console.log(res.data);
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        // 添加大屏请求接口
        saveAdd () {
            let that = this;
            console.log(this.form)
            // if(this.form.id.length == 0){
            //     that.$message.error(`大屏ID不能为空`);
            //     return;
            // }
            if(this.form.screen_code.length == 0){
                that.$message.error(`大屏ID不能为空`);
                return;
            }
            if(this.form.people_num.length == 0){
                that.$message.error(`人数不能为空`);
                return;
            }
            if(this.checkList.length == 0){
                that.$message.error(`器械不能为空`);
                return;
            }
            var cckbu = this.checkList.join(',')
            console.log(cckbu)
            console.log(typeof(cckbu))
            let datt = {
                gym_name: global.gym_name || localStorage.getItem("gym_name"),
                id: this.form.id,
                screen_code: this.form.screen_code,
                people_num: this.form.people_num,
                device_name: cckbu,
                remark: this.form.remark
            };
            this.$axios.post(this.localhost + '/api/platform/gym/screen/setting/save', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res.data.code);
                    if (res.data.code == 200) {
                        that.$set(that.tableData, that.idx, that.form);
                        that.editVisiblep = false;
                        that.$message.success(`添加大屏成功`);
                        that.getData();
                    }
                    if (res.data.code == 101) {
                        that.$message.error(res.data.msg);
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        // 添加大屏请求接口
        saveAddb () {
            let that = this;
            console.log(this.formb)
            // if(this.formb.screen_id.length == 0){
            //     that.$message.error(`大屏ID不能为空`);
            //     return;
            // }
            if(this.formb.screen_code.length == 0){
                that.$message.error(`编号不能为空`);
                return;
            }
            if(this.formb.people_num.length == 0){
                that.$message.error(`人数不能为空`);
                return;
            }
            if(this.checkListb.length == 0){
                that.$message.error(`器械不能为空`);
                return;
            }
            var cckbu = this.checkListb.join(',')
            console.log(cckbu)
            console.log(typeof(cckbu))
            let datt = {
                id: this.formb.id,
                gym_name: global.gym_name || localStorage.getItem("gym_name"),
                screen_id: this.formb.screen_id,
                screen_code: this.formb.screen_code,
                people_num: this.formb.people_num,
                device_name: cckbu,
                remark: this.formb.remark
            };
            this.$axios.post(this.localhost + '/api/platform/gym/screen/setting/save', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res.data.code);
                    if (res.data.code == 200) {
                        that.$set(that.tableData, that.idx, that.form);
                        that.editVisiblepb = false;
                        that.$message.success(`编辑大屏成功`);
                        that.getData();
                    }
                    if (res.data.code == 101) {
                        that.$message.error(res.data.msg);
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        // 删除手环请求接口
        getdel () {
            let that = this;
            let datt = {
                gym_name: global.gym_name || localStorage.getItem('gym_name'),
                id: this.form.id,
                page: this.cur_page
            };
            console.log('del');
            this.$axios.post(this.localhost + '/api/platform/bracelet/delete', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    if (res.data.code == 200) {
                        that.$message.success('删除成功');
                        that.delVisible = false;
                    } else {
                        console.log(res.data);
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        search () {
            this.is_search = true;
        },
        formatter (row, column) {
            return row.address;
        },
        filterTag (value, row) {
            return row.tag === value;
        },
        handleEdit (uid) {
            // this.inquiry = phone_num
            // console.log(this.inquiry)
            // this.$router.push('/info');
            this.$router.push({
                path: '/info',
                name: '/info',
                params: {
                    uid: uid
                }
            });
        },
        tadd () {
            this.taddVisible = true;
        },
        handleDelete (index, row) {
            this.idx = index;
            const item = this.tableData[index];
            this.form = {
                id: item.id
            };
            this.delVisible = true;
        },
        delAll () {
            const length = this.multipleSelection.length;
            let str = '';
            this.del_list = this.del_list.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].id + ' ';
            }
            this.$message.error('删除了' + str);
            this.multipleSelection = [];
        },
        handleSelectionChange (val) {
            this.multipleSelection = val;
        },
        yhhy () {
            this.editVisiblep = true;
            this.form = [];
            this.checkList = []
        },
        yhhyb (index,row) {
            this.editVisiblepb = true;
            this.formb = this.tableData[index]
            this.formb.usb = JSON.parse(JSON.stringify(this.formb.device_name));
            this.checkListb = this.formb.usb.split(',');  
            console.log(this.formb)
            this.$set(this.formb);
        },
        // 确定添加
        saveTadd () {
            console.log('点击添加1');
            this.getadd();
            this.taddVisible = false;
            this.$message.success(`添加第 ${this.idx + 1} 行成功`);
        },
        // 确定绑定
        saveEdit () {
            this.getedit();
        },
        // 确定解绑
        saveUn () {
            this.getfalseedit();
        },
        // 确定删除
        deleteRow () {
            this.tableData.splice(this.idx, 1);
            this.getdel();
        }
    }
};

</script>

<style>
    .container .el-table thead{
        color: #5A6286;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(90,98,134,1);

    }
    .el-table th{
        background: #E9EEF6;
        margin-left: 1px;
        height: 35px;
        box-sizing: content-box;
        padding: 0;
    }
    .el-table tr{
        height: 50px;
    }
    .el-table td, .el-table th.is-leaf{
        border:1px solid rgba(198,204,220,1);
        border-left: 0;
        border-top: 0;
    }
    .el-table tr:nth-child(even){
        background: #F9FAFC;
    }
    .el-table--small td, .el-table--small th{
        padding: 5px 0;
        box-sizing: content-box !important;
    }
    .el-table--small td{
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(48,56,73,1);
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(90,98,134,1);
    }
    .el-table--small th{
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(90,98,134,1);
    }
    .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
        padding-left: 30px;
        box-sizing: border-box;
    }
    .has-gutter tr{
    }
    .el-table__row .cell{
        width: 130px;
        height: 25px;
        padding: 0;
        display: flex;
        justify-content: space-between;
        text-align: left;
    }
    tbody tr td:last-child .cell{
        margin: 0 auto;
    }
    tbody tr td:nth-of-type(1) .cell{
        margin-left: 0;
    }
    .has-gutter tr th:last-of-type .cell{
        padding: 0 !important;
    }
    .el-table td.is-center, .el-table th.is-center .cell{
        padding: 0 !important;
    }
    tbody{
        overflow: auto;
    }
    .el-table__body-wrapper{
        overflow: overlay !important;
        height: 435px !important;
    }
    .my-autocomplete{
        position: fixed;
        left: 50% !important;
        transform: translateX(-50%) !important;
        top: 58% !important;
    }
    .container .el-table thead{
        color: #5A6286;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(90,98,134,1);

    }
    .el-table th{
        background: #E9EEF6;
        margin-left: 1px;
        height: 35px;
        box-sizing: content-box;
        padding: 0;
    }
    .el-table tr{
        height: 50px;
    }
    .el-table td, .el-table th.is-leaf{
        border:1px solid rgba(198,204,220,1);
        border-left: 0;
        border-top: 0;
    }
    .el-table tr:nth-child(even){
        background: #F9FAFC;
    }
    .el-table--small td, .el-table--small th{
        padding: 5px 0;
        box-sizing: content-box !important;
    }
    .el-table--small td{
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(48,56,73,1);
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(90,98,134,1);
    }
    .el-table--small th{
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(90,98,134,1);
    }
    .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
        padding-left: 30px;

        box-sizing: border-box;
    }
    .has-gutter tr{
        background: #E9EEF6;
    }
    .el-table__row .cell{
        position: relative;
        width: 150px;
        height: 25px;
        padding: 0;
        display: flex;
        justify-content: space-between;
    }
    tbody tr td:nth-of-type(1) .cell{
        margin-left: 0;
    }
    .dialog-footer{
        position: inherit;
    }
    .el-dialog__header{
        padding: 20px 30px 20px !important;
        text-align: center;
    }
    .el-dialog__title{
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
    }
    .el-dialog__body{
        padding: 40px 30px 30px !important;
        box-shadow: 0px 5px 50px rgba(246,247,248,1) inset;
    }
    .bindlog{
        z-index: 99;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 0 auto;
        background: rgba(0,0,0,.2);
    }
    .bindbox{
        width: 500px;
        height: 13.39rem;
        box-sizing: border-box;
        background: #fff;
        margin: 1.38rem auto 0;
        padding: 0 30px 0;
    }
    .bindboxa{
        width: 500px;
        height: auto;
        box-sizing: border-box;
        background: #fff;
        margin: .56rem auto 0;
        padding: 0 30px 0;
    }
    .unbindbox{
        width: 500px;
        height: 300px;
        box-sizing: border-box;
        background: #fff;
        margin: 50px auto 0;
        padding: 0 30px 0;
    }
    .bdup{
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        text-align: left;
        position: relative;
    }
    .ubdup{
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        text-align: left;
        position: relative;
    }
    .ubdup div span:nth-of-type(1){
        position: absolute;
        left: 0;
        bottom: 0;
        height: 4px;
        width: 30px;
        box-sizing: border-box;
        background: #FF6464;
    }
    .bdup div span:nth-of-type(1){
        position: absolute;
        left: 0;
        bottom: 0;
        height: 4px;
        width: 30px;
        box-sizing: border-box;
        background: #FFC001;
    }
    .bdup div span:nth-of-type(2){
        position: absolute;
        right: -22px;
        top: 50%;
        transform: translateY(-50%);
        height: 60px;
        width: 60px;
        box-sizing: border-box;
        text-align: center;
        cursor:pointer;
    }
    .ubdup div span:nth-of-type(2){
        position: absolute;
        right: -22px;
        top: 50%;
        transform: translateY(-50%);
        height: 60px;
        width: 60px;
        box-sizing: border-box;
        text-align: center;
        cursor:pointer;
    }
    .svg{
        margin: 0 auto;
    }
    .bdmd{
        height: 280px;
        width: 100%;
        box-sizing: content-box;
        padding: 40px 0 0px;
        position: relative;
    }
    .ubdmd{
        height: 130px;
        width: 100%;
        box-sizing: content-box;
        padding: 40px 0 0px;
        position: relative;
        border-bottom: 1px solid #E5E7EB;
    }
    .bdta{
        height: 70px;
        box-sizing: border-box;
        background:rgba(246,247,248,1);
        position: relative;
        border:1px solid rgba(225,227,232,1);
    }
    .bdta span:nth-of-type(1){
        position: absolute;
        height: 17px;
        line-height: 17px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(91,99,126,1);
        top: 11px;
        left: 20px;
    }
    .bdta span:nth-of-type(2){
        position: absolute;
        height: 17px;
        font-family:PingFangSC-Regular;
        color:rgba(91,99,126,1);
        top: 35px;
        left: 20px;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(48,56,73,1);
        line-height:20px;
    }
    .bdbt{
        height: 70px;
        border-top:1px solid rgba(229,231,235,1);
        position: relative;
    }
    .bdbt span:nth-of-type(1){
        box-sizing: border-box;
        width: 80px;
        height: 40px;
        position: absolute;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:40px;
        top: 12px;
        right: 146px;
        font-weight:500;
        border-radius:2px;
        text-align: center;
        border:1px solid rgba(192,199,216,1);
        cursor:pointer;
    }
    .bdbt span:nth-of-type(2){
        box-sizing: border-box;
        width: 100px;
        height: 40px;
        position: absolute;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:40px;
        top: 12px;
        right: 36px;
        background: rgba(255,192,1,1);
        font-weight:500;
        border-radius:2px;
        text-align: center;
        cursor:pointer;
    }
    .ubdbt{
        height: 70px;
        border-top:1px solid rgba(229,231,235,1);
        position: relative;
    }
    .ubdbt span:nth-of-type(1){
        box-sizing: border-box;
        width: 80px;
        height: 40px;
        position: absolute;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:40px;
        top: 12px;
        right: 146px;
        font-weight:500;
        border-radius:2px;
        border:1px solid rgba(192,199,216,1);
        text-align: center;
        cursor:pointer;
    }
    .ubdbt span:nth-of-type(2){
        box-sizing: border-box;
        width: 100px;
        height: 40px;
        position: absolute;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:#fff;
        line-height:40px;
        top: 12px;
        right: 36px;
        background: #FF6464;
        font-weight:500;
        border-radius:2px;
        text-align: center;
        cursor:pointer;
    }
    .bdta input{
        position: absolute;
        height: 17px;
        font-family:PingFangSC-Regular;
        color:rgba(91,99,126,1);
        top: 35px;
        left: 20px;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(48,56,73,1);
        line-height:20px;
        width: 200px;
    }
    .bdttn{
        position: absolute;
        height: 17px;
        font-family:PingFangSC-Regular;
        color:rgba(91,99,126,1);
        top: 35px;
        left: 20px;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(48,56,73,1);
        line-height:20px;
        width: 200px;
    }
    .bdtb{
        background: #fff;
        position: relative;
    }
    .bdtb input{
        outline: none;
        border: 0;
    }
    .bdtb input::-webkit-input-placeholder{
        color: #BFC4D1;
    }
    .ubdta{
        text-align: left;
        text-indent: 49px;
        height:22px;
        font-size:16px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:22px;
    }
    .ubdtb{
        margin-top: 10px;
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(91,99,126,1);
        line-height:17px;
        text-align: left;
        text-indent: 49px;
    }
    .unce{
        position: absolute;
        top: 40px;
        width: 30px;
        height: 30px;
        background: url('../assets/unce.png') no-repeat center;
        left: 0;
    }
    .dece{
        position: absolute;
        top: 40px;
        width: 30px;
        height: 30px;
        background: url('../assets/dele.png') no-repeat center;
        left: 0;
    }
    .has-gutter tr th{
        background: #E9EEF6;
    }
    .has-gutter tr td:last-child .cell{
        padding: 0 !important;
    }
    tbody tr td:last-child .cell{
        padding: 0 !important;
        height: 25px;
        margin: 0 auto;
        width: 150px;
        box-sizing: content-box;
        padding: 0;
    }
    thead tr th:last-child .cell{
        padding: 0 !important;
    }
    .has-gutter tr th:last-of-type .cell{
        padding: 0 !important;
    }
    .ccyb{
        position: relative;
    }
    .ccyb input{
        position: absolute;
        padding: 0;
        top: 0.67rem;
        cursor:pointer;
    }
    .el-autocomplete-suggestion{
        width: 13rem !important;
    }
    .drop .el-button-group>.el-button:first-child{
        display: none;
    }
    .drop .el-button-group>.el-button:last-child{
        width: 0;
        visibility: hidden;
        position: absolute;
        right: 0;
    }
    .drop span{
        visibility: visible;
        position: absolute;
        right: 1rem;
    }
    .bindloga .el-checkbox__input{
        float: right;
    }
</style>

<style scoped>
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
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
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
    }
    .el-breadcrumb__inner{
        width: 240px;
        height: 46px;
    }
    .content{
        padding-top: 20px;
        padding-left: 20px;
    }
    .crumbs{
        margin: 0;
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
        position: relative;
    }
    .container{
        border-radius: 0;
        padding: 0;
    }
    .aa{
        background: #5780FF;
        height: 25px;
        width: 60px;
        display: inline-block;
        color: #fff;
        font-size: 12px;
        text-indent: 10px;
        letter-spacing: 2px;
        line-height: 25px;
        font-family:PingFangSC-Medium;
        font-weight:500;
    }
    .bb{
        background: #E8EAEE;
        height: 25px;
        width: 60px;
        display: inline-block;
        color: rgba(90,98,134,1);
        letter-spacing: 2px;
        font-size: 12px;
        text-indent: 10px;
        line-height: 25px;
        font-family:PingFangSC-Medium;
    }
    .cc{
        background: #FFC001;
        height: 25px;
        width: 60px;
        display: inline-block;
        color: rgba(60,68,86,1);
        font-size: 12px;
        text-align: center;
        line-height: 25px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        letter-spacing: 2px;
        margin: 0 auto;
        text-decoration: none;
        border-radius: 0.05rem;
    }
    .dd{
        background: #3C4456;
        height: 25px;
        width: 60px;
        display: inline-block;
        font-size: 12px;
        text-align: center;
        line-height: 25px;
        font-weight:500;
        text-align: center;
        color:#fff;
        letter-spacing: 2px;
        font-family:PingFangSC-Medium;
    }
    .ee{
        background: #fff;
        border: 1px solid #3C4456;
        height: 25px;
        width: 60px;
        letter-spacing: 2px;
        display: inline-block;
        font-size: 12px;
        text-align: center;
        line-height: 25px;
        font-weight:500;
        color:#3C4456;
        font-family:PingFangSC-Medium;
    }
    .table{
        height: 550px;
    }
    .content{
        background: #F6F7F8;
        height: 670px;
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
        cursor: pointer;
    }
    .svgg{
        position: absolute;
        top: 0.275rem;
        left: 0.475rem;
    }
    .bindloga{
        z-index: 99;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 0 auto;
        background: rgba(0,0,0,.2);
        height: min-content;
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
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
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
    }
    .el-breadcrumb__inner{
        width: 240px;
        height: 46px;
    }
    .table{
        height: 550px;
    }
    .crumbs{
        margin: 0;
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
        position: relative;
    }
    .container{
        border-radius: 0;
        padding: 0;
    }
    .aa{
        background: #5780FF;
        height: 25px;
        width: 60px;
        display: inline-block;
        color: #fff;
        font-size: 12px;
        text-indent: 10px;
        letter-spacing: 2px;
        line-height: 25px;
        font-family:PingFangSC-Medium;
        font-weight:500;
    }
    .bb{
        background: #E8EAEE;
        height: 25px;
        width: 60px;
        display: inline-block;
        color: rgba(90,98,134,1);
        letter-spacing: 2px;
        font-size: 12px;
        text-indent: 10px;
        line-height: 25px;
        font-family:PingFangSC-Medium;
    }
    .cc{
        background: #FFC001;
        height: 25px;
        width: 60px;
        display: inline-block;
        color: rgba(60,68,86,1);
        font-size: 12px;
        text-align: center;
        line-height: 25px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        letter-spacing: 2px;
        margin: 0 auto;
        border-radius: 0.05rem;
        cursor:pointer;
    }
    .dd{
        background: #3C4456;
        height: 25px;
        width: 60px;
        display: inline-block;
        font-size: 12px;
        text-align: center;
        line-height: 25px;
        font-weight:500;
        text-align: center;
        color:#fff;
        letter-spacing: 2px;
        font-family:PingFangSC-Medium;
        margin: 0 auto;
        border-radius: 0.05rem;
        cursor:pointer;
    }
    .ee{
        background: #fff;
        border: 1px solid #3C4456;
        height: 25px;
        width: 60px;
        letter-spacing: 2px;
        display: inline-block;
        font-size: 12px;
        text-align: center;
        line-height: 25px;
        font-weight:500;
        color:#3C4456;
        font-family:PingFangSC-Medium;
        position: absolute;
        right: 0%;
        cursor:pointer;
    }
    .content{
        background: #F6F7F8;
        height: 670px;
    }
    .el-table--border th, .el-table__fixed-right-patch{
        background: red !important;
    }
    .has-gutter tr th .cell{
        background: red !important;
    }
    .tbody tr td:last-child .cell{
        margin: 0 auto;
        width: 150px;
        box-sizing: content-box;
        padding: 0;
        height: 26px;
    }
    .has-gutter tr td:last-child .cell{
        padding: 0 !important;
    }
    tbody tr td:last-child .cell{
        padding: 0 !important;
    }
    thead tr th:last-child .cell{
        padding: 0 !important;
    }
    .shead{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-size: 30px 30px !important;
    }
    .name{
        position: relative;
        height: 50px;
        line-height: 50px;
    }
    .sttk{
        position: absolute;
        height: 50px;
        line-height: 50px;
        left: 180px;
    }
    .addr{
        position: absolute;
        left: 290px;
        height: 50px;
        line-height: 50px;
    }
    .stna{
        position: absolute;
        height: 50px;
        line-height: 50px;
        left: 50px;
        width: 130px;
        overflow: hidden;
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
        cursor: pointer;
    }
    .svgg{
        position: absolute;
        top: 0.275rem;
        left: 0.475rem;
    }
    @media screen and (max-height: 850px){
        .bindloga{
            z-index: 99;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: 0 auto;
            background: rgba(0,0,0,.2);
            height: min-content;
            width: 100%;
        }
    }
    .drop{
        position: absolute;
        right: 1.1rem;
        width: 0;
        height: 0;
        top: .75rem;
    }
    .drop .el-button-group{
        width: 0;
        height: 0;
        display: none;
    }
    .midtit{
        position: relative;
        height: 47px;
        width: 100%;
    }
    .midtit span:nth-of-type(1){
        height: 47px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(91,99,126,1);
        line-height: 47px;
        position: absolute;
        left: 0;
        top: 0;
        display: inline-block;
    }
    .midtit span:nth-of-type(2){
        height: 47px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(191,196,209,1);
        line-height:47px;
        position: absolute;
        left: 35px;
        top: 0;
        display: inline-block;
    }
    .bindloga .el-checkbox{
        width: 100%;
        padding: 13px 0 13px;
        border-top: 1px solid rgba(229,231,235,1);
    }
</style> 
