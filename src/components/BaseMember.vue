<template>
    <div class="content">
        <div class="table">
            <div class="crumbs">
                <div class="oo">
                    会员管理
                </div>
                <div class="celllist">
                    会员列表
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
                    <el-table-column prop="ncc" label="会员编号"
                                    style="color: red !important"
                    />
                    <el-table-column prop="nick_name" label="昵称" >
                        <template slot-scope="scope">
                            <div type="text">
                                {{ decodeURIComponent(tableData[scope.$index].nick_name) }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone_num" label="注册手机">
                        <template slot-scope="scope">
                            <div type="text">
                                {{ tableData[scope.$index].phone_num }}
                            </div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="bind_time" label="上一次绑定时间" width="270">
                        <template slot-scope="scope">
                            <div type="text">{{getDd(new Date(parseInt(tableData[scope.$index].bind_time)))}}</div>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="bind_time" label="上一次绑定时间">
                        <template slot-scope="scope">
                            <div type="text">
                                {{ tableData[scope.$index].bind_time }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center"
                                    prop="status"
                    >
                        <template slot-scope="scope">
                            <router-link :class="tableData[scope.$index].status == 0?'cc':'cc'" :to="{ path: '/baseinfo', query: { inquiry: tableData[scope.$index].uid }}">
                                查看
                            </router-link>
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

            <!-- 绑定弹出框 -->
            <el-dialog title="绑定" :visible.sync="editVisible" width="30%">
                <el-form ref="form" :model="form" label-width="50px">
                    <el-form-item label="手环">
                        <div v-model="form.id">
                            {{ form.id }}
                        </div>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.nick_name" />
                    </el-form-item>
                    <el-form-item label="手机">
                        <el-input v-model="form.phone_num" />
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </el-dialog>

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
import global from '../components/Global'
export default {
    name: 'Basemember',
    data () {
        return {
            localhost: 'https://ll.linkfeeling.cn',
            // url: './static/vuetable.json',
            url: this.localhost + '/api/platform/members',
            tableData: [],
            yybox: {},
            ttbox: [],
            cur_page: 1,
            inquiry: '',
            multipleSelection: [],
            select_cate: '',
            select_word: '',
            del_list: [],
            is_search: false,
            editVisible: false,
            unBindVisible: false,
            taddVisible: false,
            delVisible: false,
            taddcellnumber: '',
            form: {
                nick_name: '',
                date: '',
                address: '',
                id: '',
                phone_num: '',
                status: '',
                bind_time: '',
                uid: ''
            },
            idx: -1
        };
    },
    computed: {
        data () {
            return this.tableData.filter((d) => {
                let is_del = false;
                for (let i = 0; i < this.del_list.length; i++) {
                    if (d.id === this.del_list[i].id) {
                        is_del = true;
                        break;
                    }
                }
                if (!is_del) {
                    console.log(d);
                    if (d.id.indexOf(this.select_cate) > -1) {
                        return d;
                    }
                }
            });
        }
    },
    created () {
        this.getData();
    },
    mounted () {

    },
    updated () {
        console.log(this.del_list);
    },
    methods: {
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
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
                        ' ' + date.getHours() + seperator2 + date.getMinutes() +
                        seperator2 + date.getSeconds();
            return currentdate;
        },
        // 获取 easy-mock 的模拟数据
        getData () {
            // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
            // if (process.env.NODE_ENV === 'development') {
            //     this.url = '/ms/table/list';
            // };
            let datt = {
                gym_name: global.gym_name || localStorage.getItem("gym_name"),
                page: this.cur_page
            };
            console.log(this);
            this.$axios.post(this.localhost + '/api/platform/members', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res.data.data);
                    var xbox = res.data.data;
                    console.log(xbox);
                    // console.log(new Date(xbox[0].bind_time));
                    var aDiv = [];
                    for (var i = 0; i < xbox.length; i++) {
                        aDiv.push(xbox[i]);
                    }
                    aDiv.sort(function (a, b) { return new Date(b.bind_time) - new Date(a.bind_time); });
                    for(var i = 0; i < aDiv.length; i++){
                        aDiv[i].ncc = (i+1)
                    }
                    console.log(aDiv);
                    this.tableData = aDiv;
                    // console.log(this.tableData.filter((d) => {
                    //     let is_del = false;
                    //     for (let i = 0; i < this.del_list.length; i++) {
                    //         if (d.id === this.del_list[i].id) {
                    //             is_del = true;
                    //             break;
                    //         }
                    //     }
                    //     if (!is_del) {
                    //         console.log(d);
                    //         if (d.id.indexOf(this.select_cate) > -1) {
                    //             return d;
                    //         }
                    //     }
                    // }));
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
                gym_name: global.gym_name || localStorage.getItem("gym_name"),
                id: this.form.id,
                uid: this.form.uid,
                nick_name: this.form.nick_name,
                phone_num: this.form.phone_num,
                bind_time: Date.parse(new Date()),
                page: this.cur_page
            };
            this.$axios.post('https://ll.linkfeeling.cn/api/platform/bracelet/bind', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
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
        // 解绑手环请求接口
        getfalseedit () {
            this.$route.path(editor);
            let that = this;
            let datt = {
                gym_name: global.gym_name || localStorage.getItem("gym_name"),
                id: this.form.id,
                end_time: Date.parse(new Date()),
                page: this.cur_page
            };
            this.$axios.post('https://ll.linkfeeling.cn/api/platform/bracelet/unbind', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
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
        // 删除手环请求接口
        getdel () {
            let that = this;
            let datt = {
                gym_name: global.gym_name || localStorage.getItem("gym_name"),
                id: this.form.id,
                page: this.cur_page
            };
            console.log('del');
            this.$axios.post('https://ll.linkfeeling.cn/api/platform/bracelet/delete', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
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
        margin-left: 30px;
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
        height: 500px !important;
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
</style>
