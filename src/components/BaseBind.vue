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
                <el-table ref="multipleTable" :data="data" border
                        :row-class-name="tableRowClassName"
                          class="table table_list" @selection-change="handleSelectionChange"
                           
                >
                    <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                    <el-table-column prop="id" label="手环编号"
                                     style="color: red !important"
                    />
                    <el-table-column prop="bracelet_id" label="手环ID"
                                     style="color: red !important"
                    />
                    <el-table-column prop="batteryStr" label="电量"
                                     style="color: red !important"
                    />
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
                <div class="page_list">
                    <div class="pagination">
                        <el-pagination background 
                            @current-change="handleCurrentChange" 
                            layout="prev, pager, next" 
                            :total="pagep_total"
                            :page-size="page_size"
                            :pager-count="5"
                            background
                        >
                        </el-pagination>
                    </div>
                </div>
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
                                        v-on:input="find(state2)"
                                        @focus="find_null()"
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
            localhost: global.host,
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
            des: [''],
            page_num: 1,
            page_size: 20,
            pagep_total: 0
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
                    if (d.bracelet_id.indexOf(this.select_cate) > -1) {
                        return d;
                    }
                }
            });
        }
    },
    created () {
        this.getData();
        this.find_null()
    },
    mounted () {
        // this.restaurants = this.loadAll();
        console.log(this.restaurants);
    },
    updated () {
        console.log(this.del_list);
    },
    methods: {
        find_null (){
            var that = this;
            this.dataList = [];
            let datt = {
                gym_name: global.gym_name || localStorage.getItem('gym_name'),
                page_num: 1,
                page_size: this.page_size
            };
            this.$axios.post(this.localhost + '/api/platform/members', JSON.stringify(datt), {headers: {'Content-Type': 'application/json;charset=UTF-8'}})
            .then((res) => {
                if (res.data.code == 200) {
                    console.log(res.data.data);
                    var aDiv = [];
                    for (var i = 0; i < res.data.data.list.length; i++) {
                        aDiv.push(res.data.data.list[i]);
                    }
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
                    var arr = this.dataList
                    var arr2 = arr.filter((x, index,self)=>{
                    var arrids = []
                    arr.forEach((item,i) => {
                        arrids.push(item.value)
                    })
                    return arrids.indexOf(x.value) === index
                    })  
                    console.log(arr2);
                    that.dataList = arr2
                    console.log(that.dataList)
                    that.$set(that.dataList);
                } else {
                    that.$message.error('会员查找失败');
                }
            })
            .catch((res) => {
                console.log(res);
            });
            console.log(123)
            this.tableDdd = this.dataList;
            console.log(this.tableDdd)
            // this.restaurants = this.loadAll();
            this.restaurants = this.tableDdd;
        },
        find (val) {
            console.log(val)
            var val_zn = val
            var that = this;
            this.dataList = [];
            let datt = {
                gym_name: global.gym_name || localStorage.getItem('gym_name'),
                text: encodeURIComponent(val)
            };
            this.$axios.post(this.localhost + '/api/platform/members/lenovo', JSON.stringify(datt), {headers: {'Content-Type': 'application/json;charset=UTF-8'}})
            .then((res) => {
                if (res.data.code == 200) {
                    console.log(res.data.data);
                    var aDiv = [];
                    for (var i = 0; i < res.data.data.length; i++) {
                        aDiv.push(res.data.data[i]);
                    }
                    console.log(aDiv);
                    var byby;
                    for (var i = 0; i < aDiv.length; i++) {
                        byby = {};
                        byby.value = aDiv[i].phone_num;
                        byby.date = aDiv[i].bind_time;
                        byby.head = aDiv[i].head_icon || '';
                        byby.name = decodeURIComponent(aDiv[i].user_name.replace(/\+/g, '%20'));
                        that.dataList.push(byby);
                    }
                    console.log(this.dataList);
                    var arr = this.dataList
                    var arr2 = arr.filter((x, index,self)=>{
                    var arrids = []
                    arr.forEach((item,i) => {
                        arrids.push(item.value)
                    })
                    return arrids.indexOf(x.value) === index
                    })  
                    console.log(arr2);
                    that.dataList = arr2
                    that.$set(that.dataList);
                } else {
                    that.$message.error('会员查找失败');
                }
            })
            .catch((res) => {
                console.log(res);
            });
            this.tableDdd = this.dataList;
            console.log(this.tableDdd)
            // this.restaurants = this.loadAll();
            this.restaurants = this.tableDdd;
        },
        // 分页导航
        handleCurrentChange (val) {
            this.page_num = val;
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
                page_num: this.page_num,
                page_size: this.page_size
            };
            console.log(this);
            this.$axios.post(this.localhost + '/api/platform/bracelet/data', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}}
            )
                .then((res) => {
                    console.log(res.data.data);
                    this.pagep_total = parseInt(res.data.data.total)
                    var xbox = res.data.data.list;
                    console.log(xbox);
                    var aDiv = [];
                    for (var i = 0; i < xbox.length; i++) {
                        var m = xbox[i];
                        m.batteryStr = '-';
                        if (m.battery = parseInt(m.battery)) {
                            switch (m.battery) {
                            case -1: m.batteryStr = '已离线'; break;
                            case -2: m.batteryStr = '在线'; break;
                            default: m.batteryStr = m.battery + '%'; break;
                            }
                        }
                        aDiv.push(m);
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
        },
        tableRowClassName: function (row) { 
            if (this.tableData[row.rowIndex].battery >= -1 && this.tableData[row.rowIndex].battery < 34) {
                return 'battery-low';
            }
            return '';
        },
    }
};

</script>

<style>
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
</style>
