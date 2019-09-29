<template>
    <div class="content">
        <div class="table">
            <div class="crumbs">
                <div class="oo">
                    教练管理
                </div>
                <div class="celllist">
                    效果统计
                    <template>
                        <div class="date_sec">
                            <el-date-picker
                            v-model="value2"
                            type="datetimerange"
                            :picker-options="pickerOptions"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right">
                            </el-date-picker>
                        </div>
                    </template>
                    <div class="serch" @click="serch">搜索</div>
                    <div class="screen">
                        <el-dropdown @visible-change="mon($event)">
                            <span class="el-dropdown-link" v-model="kval">
                                {{kval}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <template>
                                    <el-checkbox-group v-model="checkList" class="checkbox">
                                        <el-checkbox 
                                            class=""
                                            v-for="(item, index) in coalist"
                                            :key="index"
                                            :label="item"
                                        ></el-checkbox>
                                    </el-checkbox-group>
                                </template>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div @click="showtab" class="showtab">
                        列表显示设置
                        <span class="shsvg">
                            <svg width="7px" height="5px" class="svg">
                                <polygon points="1,1 7,1 4,4" style="fill:#000;stroke:#000;stroke-width:1" /> 
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div class="container">
                <el-table ref="multipleTable" :data="data" border
                          class="table" @selection-change="handleSelectionChange"
                >
                    <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                    <el-table-column prop="user_name" label="学员昵称">
                        <template slot-scope="scope">
                            <div>
                                 {{tableData[scope.$index].user_name}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone_num" label="学员手机"
                    />
                    <el-table-column prop="coach_name" label="教练姓名">
                        <template slot-scope="scope">
                            <div type="text">
                                {{ tableData[scope.$index].coach_name}}
                            </div>
                        </template>
                    </el-table-column>
                    <template v-for="(item, index) in col">
                        <el-table-column
                        :show-overflow-tooltip="okl"
                        :key="index"
                        :label="item.label"
                        prop="pro"
                        v-if="formThead.includes(item.label)"
                        >
                            <template slot-scope="scope">
                                <div class="tbo">
                                    <span>{{tableData[scope.$index].pro[item.ind][1]>0?tableData[scope.$index].pro[item.ind][1]:'--'}}</span>
                                    <span :style="{color:(parseFloat(tableData[scope.$index].pro[item.ind][2])>=0?'#FF6464':'#27C986')}">{{tableData[scope.$index].pro[item.ind][3]}}</span>
                                </div>
                            </template>
                        </el-table-column>
                    </template>
                    <el-table-column prop="complete_course_num" label="上课次数">
                    </el-table-column>
                    <el-table-column label="操作" align="center" width=200>
                        <template slot-scope="scope">
                            <router-link class="bb" :to="{ path: '/exchart', query: { inquiry: tableData[scope.$index].uid, nam: tableData[scope.$index].user_name,val1: value_pre,val2: value2[1].getTime()}}">
                                查看数据
                            </router-link>
                            <router-link class="dels" :to="{ path: '/photoshop', query: { inquiry: tableData[scope.$index].uid, nam: tableData[scope.$index].user_name,val1: value_pre,val2: value2[1].getTime()}}">
                                查看照片
                            </router-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 列表显示弹出框 -->
            <div v-if="editVisible" class="bindlog knmg">
                <div class="bindbox">
                    <div class="bdup">
                        <div>
                            列表显示设置
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
                        <template>
                            <el-checkbox-group v-model="checkListb" :max='aac' :min="bbc">
                                <el-checkbox 
                                    v-for="(item, index) in porList"
                                    :key="index"
                                    :label="item"
                                ></el-checkbox>
                            </el-checkbox-group>
                        </template>
                    </div>
                    <div class="bdbt">
                        <span @click="editVisible=false">取消</span>
                        <span class="redsure" @click="saveEdit">确定</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import global from '../components/Global';
export default {
    name: 'classscene',
    inject: ['reload'],//注入reload方法
    data () {
        return {
            localhost: 'http://bg.linkfeeling.cn',
            localhost: 'https://dev.linkfeeling.cn',
            // url: './static/vuetable.json',
            url: this.localhost + '/api/platform/members',
            tableData: [],
            value_pre: '',
            yybox: {},
            ttbox: [],
            inquiry: '',
            checkListb: [],
            aaa: '',
            kval: '所有',
            cur_page: 1,
            porList: [],
            aac: 3,
            bbc: 1,
            bka: 0,
            bkb: 0,
            bkc: 0,
            okl: false,
            inquiry: '',
            multipleSelection: [],
            select_cate: '',
            select_word: '',
            del_list: [],
            coalist: [],
            is_search: false,
            editVisible: false,
            unBindVisible: false,
            taddVisible: false,
            delVisible: false,
            taddcellnumber: '',
            checkList: [],
            coaar: [],
            aka: '',
            akb: '',
            akc: '',
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
            idx: -1,
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            value2: [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 30),new Date()],
            col: [],
            formThead: []
        };
    },
    computed: {
        data () {
            return this.tableData.filter((d) => {
                let is_del = false;
                for (let i = 0; i < this.del_list.length; i++) {
                    if (d.phone_num === this.del_list[i].phone_num) {
                        is_del = true;
                        break;
                    }
                }
                if (!is_del) {
                    // console.log(d);
                    if (d.phone_num.indexOf(this.select_cate) > -1) {
                        return d;
                    }
                }
            });
        }
    },
    created () {
        this.getData();
        this.getCoach()
    },
    mounted () {

    },
    updated () {
        console.log(this.value2[0])
        var that = this
        if(typeof(that.value2[0]) == 'number'){
            that.value_pre = that.value2[0]
            console.log(value_pre)
        }else{
            that.value_pre = that.value2[0].getTime()
            console.log(value_pre)
        }
        console.log(this.checkList)
        if(this.checkList.length>1 && this.checkList.length<this.coalist.length){
            this.kval = this.checkList[0]+'...'
        }
        if(this.checkList.length==1){
            this.kval = this.checkList[0]
        }
        if(this.checkList.length==0 || this.checkList.length==this.coalist.length){
            this.kval = '所有'
        } 
        localStorage.setItem('val1', this.value2[0])
        localStorage.setItem('val2', this.value2[1].getTime())
    },
    methods: {
        serch () {
            var ta = this.value2 || -1
            if(ta==-1){
                this.$message.error('请选择时间区间');
                return
            }
            this.kval = '所有'
            this.checkList = []
            this.getData()
        },
        mon (val) {
            if(val==false){
                if(this.checkList.length>1 && this.checkList.length<this.coalist.length){
                    this.kval = this.checkList[0]+'...'
                    this.tableData = []
                    for(var i=0;i<this.checkList.length;i++){
                        for(var j=0;j<this.coaar.length;j++){
                            console.log(this.coaar[j].coach_name)
                            console.log(this.checkList[i])
                            if(this.coaar[j].coach_name==this.checkList[i]){
                                this.tableData.push(this.coaar[j])
                            }
                        }
                    }
                }
                if(this.checkList.length==1){
                    console.log(this.checkList)
                    console.log(this.coaar)
                    this.kval = this.checkList[0]
                    this.tableData = []
                    for(var i=0;i<this.coaar.length;i++){
                        console.log(this.coaar[i].coach_name)
                        console.log(this.checkList[i])
                        if(this.coaar[i].coach_name==this.checkList[0]){
                            this.tableData.push(this.coaar[i])
                        }
                    }
                }
                if(this.checkList.length==0 || this.checkList.length==this.coalist.length){
                    this.kval = '所有'
                    this.tableData = this.coaar
                } 
            }
        },
        showtab () {
            this.editVisible = true
        },
        // handleCurrentChange (val) {
        //     this.cur_page = val;
        //     this.getData();
        // },
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
            if (hours >= 0 && hours <= 9) {
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
        // 获取 easy-mock 的模拟数据
        getData () {
            var that = this
            if(typeof(that.value2[0]) == 'number'){
                var start_time = that.getDd(new Date(parseFloat(that.value2[0])))
            }else{
                var start_time = that.getDd(that.value2[0])
            }
            if(typeof(that.value2[1]) == 'number'){
                var end_time = that.getDd(new Date(parseFloat(that.value2[1])))
            }else{
                var end_time = that.getDd(this.value2[1])
            }
            let datt = {
                gym_name: global.gym_name || localStorage.getItem('gym_name'),
                start: start_time,
                end: end_time
            };
            this.$axios.post(this.localhost + '/api/coach/web/physical/examination/list', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res.data);
                    var ybx=[["体重"],["体脂率"],["骨骼肌"],["胸围"],["腰围"],["臀围"],["肩宽"],["身高"],["BMI"],["上臀围(左)"],["上臀围(右)"],["大腿围(左)"],["大腿围(右)"],["小腿围(左)"],["小腿围(右)"]]
                    var xbox = res.data.data;
                    for(var i = 0; i < xbox.length; i++){
                        xbox[i].coach_name = decodeURIComponent(xbox[i].coach_name.replace(/\+/g, '%20'))
                        xbox[i].user_name = decodeURIComponent(xbox[i].user_name.replace(/\+/g, '%20'))
                    }
                    var prp = []
                    this.col = []
                    this.formThead = []
                    var yby
                    for(var i = 0; i < xbox.length; i++){
                        yby = JSON.parse(JSON.stringify(ybx))
                        
                        yby[0].push(xbox[i].weight,xbox[i].weight_dif)
                        yby[1].push(xbox[i].bfr,xbox[i].bfr_dif)
                        yby[2].push(xbox[i].skeletal_muscle,xbox[i].skeletal_muscle_dif)
                        yby[3].push(xbox[i].bust,xbox[i].bust_dif)
                        yby[4].push(xbox[i].waist,xbox[i].waist_dif)
                        yby[5].push(xbox[i].hips,xbox[i].hips_dif)
                        yby[6].push(xbox[i].shoulder_breadth,xbox[i].shoulder_breadth_dif)
                        yby[7].push(xbox[i].height,xbox[i].height_dif)
                        yby[8].push(xbox[i].bmi,xbox[i].bmi_dif)
                        yby[9].push(xbox[i].left_arm_girth,xbox[i].left_arm_girth_dif)
                        yby[10].push(xbox[i].right_arm_girth,xbox[i].right_arm_girth_dif)
                        yby[11].push(xbox[i].left_thigh_girth,xbox[i].left_thigh_girth_dif)
                        yby[12].push(xbox[i].right_thigh_girth,xbox[i].right_thigh_girth_dif)
                        yby[13].push(xbox[i].left_shank_girth,xbox[i].left_shank_girth_dif)
                        yby[14].push(xbox[i].right_shank_girth,xbox[i].right_shank_girth_dif)
                        
                        xbox[i].pro=yby
                    }
                    for (var i = 0; i < xbox.length; i++) {
                        for (var j = 0; j < xbox[i].pro.length; j++) {
                            if(parseFloat(xbox[i].pro[j][2])>0){
                                xbox[i].pro[j].push("上升"+xbox[i].pro[j][2]);
                            }
                            if(parseFloat(xbox[i].pro[j][2])==0){
                                xbox[i].pro[j].push("-");
                            }
                            if(parseFloat(xbox[i].pro[j][2])<0){
                                xbox[i].pro[j].push("下降"+(-1*xbox[i].pro[j][2]));
                            }
                        }
                    }
                    if(xbox.length>0){
                        for(var i=0;i<xbox[0].pro.length;i++){
                            this.porList.push(xbox[0].pro[i][0])
                        }
                        this.checkListb.push(this.porList[0])
                        console.log('sk1')
                        var skb = localStorage.getItem("ska1") || -1
                        if(skb>-1){
                            var skc
                            for(var i=0;i<3;i++){
                                skc = localStorage.getItem("ska"+i) || -1
                                if(skc>-1){
                                    this.col.push({
                                        label: localStorage.getItem("sk"+i),
                                        ind: localStorage.getItem("ska"+i),
                                    })
                                    this.formThead.push(localStorage.getItem("sk"+i))
                                }
                            }
                        }else{
                            for(var i=0;i<3;i++){
                                this.col.push({
                                    label: this.porList[i],
                                    ind: i
                                })
                                this.formThead.push(this.porList[i])
                            } 
                        }
                        
                    }
                    console.log(this.col)
                    console.log(this.formThead)
                    this.coaar = JSON.parse(JSON.stringify(xbox))
                    this.tableData = xbox;
                    console.log(this.tableData)
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        yzy () {
            console.log('yzy');
        },
        // 绑定手环请求接口
        getCoach () {
            let that = this;
            let datt = {
                gym_name: global.gym_name || localStorage.getItem('gym_name')
            };
            this.$axios.post(this.localhost + '/api/coach/web/gym/coach/list', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                   this.coalist = res.data.data
                   for(var i=0;i<this.coalist.length;i++){
                       this.coalist[i] = decodeURIComponent(this.coalist[i].replace(/\+/g, '%20'))
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
        // 确定添加
        saveTadd () {
            console.log('点击添加1');
            this.getadd();
            this.taddVisible = false;
            this.$message.success(`添加第 ${this.idx + 1} 行成功`);
        },
        // 确定绑定
        saveEdit () {
            this.editVisible = false;
            localStorage.clear('sk1')
            localStorage.clear('ska1')
            localStorage.clear('sk2')
            localStorage.clear('ska2')
            localStorage.clear('sk3')
            localStorage.clear('ska3')
            for(var i=0;i<this.porList.length;i++){
                for(var j=0;j<this.checkListb.length;j++){
                    if(this.porList[i] == this.checkListb[j]){
                        console.log(this.porList[i])
                        localStorage.setItem('sk'+j, this.porList[i])
                        localStorage.setItem('ska'+j, i)
                    }
                }
            }
            console.log(localStorage.getItem('sk1'))
            // this.$router.go(0)
            this.reload()
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
    .date_sec .el-date-editor .el-range__icon{
        position: relative;
        text-indent: 0;
    }
    .date_sec .el-input__icon{
        width: 1rem;
    }
    .date_sec .el-range-separator{
        text-indent: 0;
    }
    .el-picker-panel{
        position: absolute !important;
        top: 100px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
    }
    .date_sec .el-range__close-icon .el-input__icon:after{
        text-indent: 0;
    }
    .date_sec .el-range__close-icon{
        text-indent: 0;
    }
    .screen .el-dropdown{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
    }
    .screen .el-dropdown .el-button-group{
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .screen .el-button-group>.el-button:first-child{
        position: absolute;
        height: 100%;
        left: 0;
        width: 80px;
    }
    .screen .el-button-group>.el-button:last-child{
        position: absolute;
        height: 100%;
        left: 80px;
        width: 40px;
    }
    .screen .el-button--primary{
        color: #3C4456;
        background: #fff;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        border: solid #D3D7E4 1px;
    }
    .screen .el-button--primary:focus,.screen .el-button--primary:hover {
        border-color: #D3D7E4;
        color: #3C4456;
        background: #fff;
    }
    .checkbox{
        width: 120px;
    }
    .checkbox .el-checkbox__input{
       padding-left: 12px;
       text-align: left;
    }
    .checkbox .el-checkbox__label{
        /* float: left; */
    }
    .checkbox .el-checkbox{
        text-align: left;
    }
    .knmg .el-checkbox{
        margin-top: 27px;
        width: 80px;
    }
    .knmg .bdmd{
        padding: 0;
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
    .date_sec{
        display: inline-block;
        width: 400px;
        height: 40px;
        box-sizing: content-box;
    }
    .serch{
        width:60px;
        height:27px;
        background:rgba(60,68,86,1);
        border-radius:2px;
        display: inline-block;
        position: absolute;
        top: 16px;
        left: 520px;
        text-align: center;
        text-indent: 0;
        line-height: 27px;
        color: #fff;
        font-size: 12px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        cursor: pointer;
    }
    .showtab{
        width:120px;
        height:27px;
        background:#fff;
        border-radius:2px;
        display: inline-block;
        position: absolute;
        top: 16px;
        right: 20px;
        text-align: left;
        text-indent: 19px;
        line-height: 27px;
        color: rgba(60,68,86,1);
        font-size: 12px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        cursor: pointer;
        border: 1px solid #D3D7E4;
    }
    .shsvg{
        width: 7px;
        height: 5px;
        position: absolute;
        right: 8px;
        top: 11px;
    }
    .shsvg svg{
        position: absolute;
        right: 0;
        top: 0;
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
    width:70px;
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
    text-decoration: none;
}
.transbox{
    width: 150px;
    height: 25px;
}
.dels{
    float: right;
    width:70px;
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
    text-decoration: none;
    box-sizing: border-box;
}
.screen{
    width: 120px;
    height: 27px;
    position: absolute;
    left: 600px;
    top: 16px;
}
.screen .el-dropdown-link {
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    line-height: 27px;
    color: #3C4456;
    background: #fff;
    font-size:12px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    border: solid #D3D7E4 1px;
    text-indent: 12px;
  }
    .screen .el-icon--right{
        position: absolute;
        right: 10px;
        top: 7px;
    }
    .tbo{
        display: inline-block;
        width: 100%;
        height: 100%;
    }
    .tbo span:nth-of-type(1){
        display: inline-block;
        float: left;
    }
    .tbo span:nth-of-type(2){
        display: inline-block;
        float: left;
        margin-left: 25px;
    }
    .redsure{
        background: #FF6464 !important;
        color: #fff !important;
    }
</style>
