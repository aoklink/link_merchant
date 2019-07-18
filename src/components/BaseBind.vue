<template>
    <div class="content">
        <div class="table">
            <div class="crumbs">
                <div class="oo">
                    手环管理
                </div>
                <div class="celllist">
                    手环列表
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
                    <el-table-column prop="id" label="手环编号"
                                     style="color: red !important"
                    />
                    <el-table-column prop="bracelet_id" label="手环ID"
                                     style="color: red !important"
                    />
                    <el-table-column prop="uwb_id" label="配置uwb">
                        <template slot-scope="scope">
                            <div type="text">
                                {{ tableData[scope.$index].status == 1?tableData[scope.$index].uwb_id:'-' }}
                            </div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="status" label="状态" width="150">
                        <template slot-scope="scope">
                            <div type="text" :class="tableData[scope.$index].status == 1?'aa':'bb'">
                                {{ tableData[scope.$index].status == 1?'使用中':'空闲' }}
                            </div>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="user_name" label="领取会员">
                        <template slot-scope="scope">
                            <div type="text">
                                {{ tableData[scope.$index].status == 1?decodeURIComponent(tableData[scope.$index].user_name.replace(/\+/g, '%20')):'-' }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone_num" label="会员手机">
                        <template slot-scope="scope">
                            <div type="text">
                                {{ tableData[scope.$index].status == 1?tableData[scope.$index].phone_num:'-' }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="bind_time" label="绑定时间">
                        <template slot-scope="scope">
                            <div type="text">
                                {{ tableData[scope.$index].status == 1?getDd(new Date(parseInt(tableData[scope.$index].bind_time))):'-' }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" padding="0"
                                     prop="status"
                    >
                        <template slot-scope="scope">
                            <div :class="tableData[scope.$index].status == 0?'cc':'dd'" type="text" @click="handleEdit(scope.$index, scope.row,tableData[scope.$index].status)">
                                {{ tableData[scope.$index].status==0?'绑定':'解绑' }}
                            </div>
                            <!-- <div :class="tableData[scope.$index].status == 0?'ee':'ee'" type="text" class="red" @click="handleDelete(scope.$index, scope.row)">删除</div> -->
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <div class="pagination">
                    <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                    </el-pagination>
                </div> -->
            </div>

            <!-- 解绑弹出框 -->
            <div v-if="unBindVisible" class="bindlog">
                <div class="unbindbox">
                    <div class="ubdup">
                        <div>
                            解除绑定
                            <span />
                            <span @click="unBindVisible=false">
                                <svg width="10px" height="10px" class="svg">
                                    <line x1="0" y1="0" x2="10"
                                          y2="10"
                                          style="stroke:#888EA7;stroke-width:1"
                                    />
                                    <line x1="10" y1="0" x2="0"
                                          y2="10"
                                          style="stroke:#888EA7;stroke-width:1"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="ubdmd">
                        <span class="unce" />
                        <div class="ubdta">
                            是否确认解除手环绑定？
                        </div>
                        <div class="ubdtb">
                            手环解除绑定后，将结束本次运动并生成运动报告
                        </div>
                    </div>
                    <div class="ubdbt">
                        <span @click="unBindVisible=false">取消</span>
                        <span @click="saveUn">解除绑定</span>
                    </div>
                </div>
            </div>
            <!-- 绑定弹出框 -->
            <div v-if="editVisible" class="bindlog">
                <div class="bindbox">
                    <div class="bdup">
                        <div>
                            手环绑定
                            <span />
                            <span @click="editVisible=false">
                                <svg width="10px" height="10px" class="svg">
                                    <line x1="0" y1="0" x2="10"
                                          y2="10"
                                          style="stroke:#888EA7;stroke-width:1"
                                    />
                                    <line x1="10" y1="0" x2="0"
                                          y2="10"
                                          style="stroke:#888EA7;stroke-width:1"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="bdmd">
                        <div class="bdta">
                            <span>手环编号</span>
                            <span>{{ form.id }}</span>
                        </div>
                        <div class="bdta">
                            <span>手环ID</span>
                            <span>{{ form.bracelet_id }}</span>
                        </div>
                        <div class="bdta">
                            <span>配置uwb</span>
                            <span>{{ form.uwb_id }}</span>
                        </div>
                        <!-- <div class="bdta bdtb">
                            <span>配置uwb</span>
                            <input type="text" v-model="form.uwb_id" placeholder="请输入定位模块的id">
                        </div> -->
                        <div class="bdta bdtb ccyb">
                            <span>领取会员</span>
                            <el-row class="demo-autocomplete">
                                <el-col :span="12">
                                    <el-autocomplete
                                        v-model="state2"
                                        popper-class="my-autocomplete"
                                        class="inline-input"
                                        :fetch-suggestions="querySearch"
                                        placeholder="请输入会员手机号"
                                        :trigger-on-focus="true"
                                        @select="handleSelect"
                                    >
                                        <template slot-scope="props" width="400">
                                            <div class="name">
                                                <span class="shead" :style="{ 'background': 'url(' +props.item.head + ') no-repeat left center'}" /><span class="stna">{{ props.item.name }}</span><span class="sttk">{{ props.item.value }}</span><span class="addr">{{ props.item.date }}</span>
                                            </div>
                                        </template>
                                    </el-autocomplete>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="bdbt">
                        <span @click="editVisible=false">取消</span>
                        <span @click="saveEdit">确定</span>
                    </div>
                </div>
            </div>

            <!-- 删除提示框 -->
            <!-- <el-dialog title="提示" :visible.sync="delVisible" width="300px"
                    center
            >
                <el-form ref="form" :model="form" label-width="50px">
                    <el-form-item label="手环">
                        <div v-model="form.bracelet_id">
                            {{ form.bracelet_id }}
                        </div>
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
            <div v-if="delVisible" class="bindlog">
                <div class="unbindbox">
                    <div class="ubdup">
                        <div>
                            删除手环
                            <span />
                            <span @click="delVisible=false">
                                <svg width="10px" height="10px" class="svg">
                                    <line x1="0" y1="0" x2="10"
                                          y2="10"
                                          style="stroke:#888EA7;stroke-width:1"
                                    />
                                    <line x1="10" y1="0" x2="0"
                                          y2="10"
                                          style="stroke:#888EA7;stroke-width:1"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="ubdmd">
                        <span class="dece" />
                        <div class="ubdta">
                            是否确认删除手环
                        </div>
                    </div>
                    <div class="ubdbt">
                        <span @click="delVisible=false">取消</span>
                        <span @click="deleteRow">删除手环</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import global from '../components/Global';
// this.$axios.defaults.headers.post['Content-Type'] = 'application/json'
export default {
    name: 'Basebind',
    data () {
        return {
            // localhost: 'http://bg.linkfeeling.cn',
            localhost: 'http://test.linkfeeling.cn',
            tableData: [],
            yybox: {},
            ttbox: [],
            cur_page: 1,
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
                user_name: '',
                date: '',
                address: '',
                bracelet_id: '',
                phone_num: '',
                status: '',
                bind_time: '',
                id: '',
                uwb_id: ''
            },
            idx: -1,
            dataList: [],
            tableDdd: '',
            restaurants: [],
            state1: '',
            state2: '',
            des: ['']
        };
    },
    computed: {
        data () {
            return this.tableData.filter((d) => {
                let is_del = false;
                for (let i = 0; i < this.del_list.length; i++) {
                    if (d.bracelet_id === this.del_list[i].bracelet_id) {
                        is_del = true;
                        break;
                    }
                }
                if (!is_del) {
                    console.log(d);
                    if (d.bracelet_id.indexOf(this.select_cate) > -1) {
                        return d;
                    }
                }
            });
        }
    },
    created () {
        this.getData();
        var that = this;
        this.dataList = [];
        let datt = {
            gym_name: global.gym_name || localStorage.getItem('gym_name'),
            page: this.cur_page
        };
        this.$axios.post(this.localhost + '/api/platform/members', JSON.stringify(datt), {headers: {'Content-Type': 'application/json;charset=UTF-8'}})
            .then((res) => {
                if (res.data.code == 200) {
                    console.log(res.data.data);
                    var aDiv = [];
                    for (var i = 0; i < res.data.data.length; i++) {
                        aDiv.push(res.data.data[i]);
                    }
                    aDiv.sort(function (a, b) { return new Date(b.bind_time || 0) - new Date(a.bind_time || 0); });
                    console.log(aDiv);
                    var byby;
                    for (var i = 0; i < aDiv.length; i++) {
                        byby = {};
                        byby.value = aDiv[i].phone_num;
                        byby.date = aDiv[i].bind_time;
                        byby.head = aDiv[i].head_icon || '';
                        byby.name = decodeURIComponent(aDiv[i].nick_name.replace(/\+/g, '%20'));
                        that.dataList.push(byby);
                    }
                    console.log(this.dataList);
                    that.$set(that.dataList);
                } else {
                    that.$message.success('会员列表请求失败');
                }
            })
            .catch((res) => {
                console.log(res);
            });
        this.tableDdd = this.dataList;
    },
    mounted () {
        this.restaurants = this.loadAll();
        console.log(this.restaurants);
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
            var hours = date.getHours();
            var mins = date.getMinutes();
            var secs = date.getSeconds();
            if (month >= 1 && month <= 9) {
                month = '0' + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate;
            }
            if (hours >= 1 && hours <= 9) {
                hours = '0' + hours;
            }
            if (mins >= 0 && mins <= 9) {
                mins = '0' + mins;
            }
            if (secs >= 0 && secs <= 9) {
                secs = '0' + secs;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
                        ' ' + hours + seperator2 + mins +
                        seperator2 + secs;
            return currentdate;
        },
        getYd: function (no) {
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
                gym_name: global.gym_name || localStorage.getItem('gym_name'),
                page: this.cur_page
            };
            console.log(this);
            this.$axios.post(this.localhost + '/api/platform/bracelet/data', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}}
            )
                .then((res) => {
                    console.log(res.data.data);
                    var xbox = res.data.data;
                    console.log(xbox);
                    var aDiv = [];
                    for (var i = 0; i < xbox.length; i++) {
                        aDiv.push(xbox[i]);
                    }
                    aDiv.sort(function (a, b) { return a.id - b.id; });
                    console.log(aDiv);
                    this.tableData = aDiv;
                    console.log(this.tableData.filter((d) => {
                        let is_del = false;
                        for (let i = 0; i < this.del_list.length; i++) {
                            if (d.bracelet_id === this.del_list[i].bracelet_id) {
                                is_del = true;
                                break;
                            }
                        }
                        if (!is_del) {
                            console.log(d);
                            if (d.bracelet_id.indexOf(this.select_cate) > -1) {
                                return d;
                            }
                        }
                    }));
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        querySearch_front (queryString, cb) {
            let restaurants = this.restaurants;
            let results = queryString ? restaurants.filter(this.createFilter_front(queryString)) : restaurants;
            console.log(results);
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter_front (queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0 || restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        querySearch (queryString, cb) {
            let restaurants = this.restaurants;
            let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter (queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1 || restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
            };
        },
        loadAll () {
            return this.dataList;
        },
        handleSelect (item) {
            console.log(item);
        },
        yzy () {
            console.log('yzy');
        },
        // 添加手环请求接口
        // getadd() {
        //     let that =this;
        //     let datt = {
        //         gym_name: 'link_office',
        //         bracelet_id: this.taddcellnumber,
        //         user_name: '',
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
            if (!(/^1[3456789]\d{9}$/.test(that.state2))) {
                that.$message.error(`手机号格式错误`);
                return;
            }
            console.log(that.tableData);
            for (var i = 0; i < that.tableData.length; i++) {
                if (that.state2 == that.tableData[i].phone_num) {
                    that.$message.error(`该手机号已绑定手环,请先解绑`);
                    return;
                }
            }
            let datt = {
                gym_name: global.gym_name || localStorage.getItem('gym_name'),
                bracelet_id: this.form.bracelet_id,
                id: this.form.id,
                uwb_id: this.form.uwb_id,
                user_name: this.form.user_name,
                phone_num: this.state2,
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
                    }
                    if (res.data.code == 103) {
                        that.$message.error(`手机号未注册`);
                    }
                    if (res.data.code == 112) {
                        that.$message.error(res.data.message);
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        // 解绑手环请求接口
        getfalseedit () {
            let that = this;
            let datt = {
                gym_name: global.gym_name || localStorage.getItem('gym_name'),
                bracelet_id: this.form.bracelet_id,
                phone_num: this.form.phone_num,
                unbind_time: Date.parse(new Date()),
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
        // 删除手环请求接口
        getdel () {
            let that = this;
            let datt = {
                gym_name: global.gym_name || localStorage.getItem('gym_name'),
                bracelet_id: this.form.bracelet_id,
                page: this.cur_page
            };
            console.log('del');
            this.$axios.post(this.localhost + '/api/platform/bracelet/delete', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    if (res.data.code == 200) {
                        that.$message.success('删除成功');
                        that.tableData.splice(this.idx, 1);
                        that.delVisible = false;
                    } else if (res.data.code == 106) {
                        that.$message.success('请先解绑');
                        that.delVisible = false;
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
        handleEdit (index, row, status) {
            let that = this;

            this.idx = index;
            console.log(status);
            const item = this.tableData[index];
            if (status == 0) {
                this.editVisible = true;
                that.state2 = '';
                that.form = {
                    bracelet_id: item.bracelet_id,
                    id: item.id,
                    uwb_id: item.uwb_id,
                    user_name: item.user_name,
                    date: item.date,
                    address: item.address,
                    phone_num: item.phone_num,
                    status: item.status,
                    bind_time: Date.parse(new Date())
                };
                // that.getedit()
                console.log('status = 0');
            } else if (status == 1) {
                this.unBindVisible = true;
                that.state2 = '';
                that.form = {
                    bracelet_id: item.bracelet_id,
                    id: item.id,
                    user_name: item.user_name,
                    date: item.date,
                    address: item.address,
                    phone_num: item.phone_num,
                    status: item.status,
                    bind_time: Date.parse(new Date())
                };
                // that.getfalseedit()
                console.log('status = 1');
            }
        },
        tadd () {
            this.taddVisible = true;
        },
        handleDelete (index, row) {
            this.idx = index;
            const item = this.tableData[index];
            this.form = {
                bracelet_id: item.bracelet_id,
                id: item.id
            };
            this.delVisible = true;
        },
        delAll () {
            const length = this.multipleSelection.length;
            let str = '';
            this.del_list = this.del_list.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].bracelet_id + ' ';
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
            this.getdel();
        }
    }
};

</script>

<style>
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
        margin-left: 30px;
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
        margin-top: 30px;
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
    .bdtb{
        background: #fff;
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
    /* .my-autocomplete{
        width: 500px !important;
    } */
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
    }
</style>
