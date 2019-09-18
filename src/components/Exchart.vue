<template>
    <div class="content">
        <div class="table">
            <div class="crumbs">
                <div class="oo">
                    教练管理
                </div>
                <div class="celllist">
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
                </div>
            </div>
            <div class="container">
                <div class="ctop">
                    <span class="penson_data">{{decodeURIComponent(nam.replace(/\+/g, '%20'))}}的体测数据</span>
                    <el-dropdown>
                        <span class="eldrolink">
                            {{curper}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                                @click.native="sec(item.ind)"
                                v-for="(item, index) in perList"
                                :key="index"
                            >{{item.value}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="cbot">
                    <canvas id="yzycan" class="lclcan" width="1250" height="500"></canvas>
                </div>
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
            yybox: {},
            ttbox: [],
            inquiry: '',
            checkListb: [],
            aaa: '',
            kval: '所有',
            cur_page: 1,
            cuepp: 0,
            porList: [],
            aac: 3,
            bbc: 1,
            bka: 0,
            bkb: 0,
            bkc: 0,
            curper: '体重',
            perList: [{value:"体重",ind:'0',ppq:'weight'},{value:"体脂率",ind:'1',ppq:'bfr'},{value:"骨骼肌",ind:'2',ppq:'skeletal_muscle'},{value:"胸围",ind:'3',ppq:'bust'},{value:"腰围",ind:'4',ppq:'waist'},{value:"臀围",ind:'5',ppq:'hips'},{value:"肩宽",ind:'6',ppq:'shoulder_breadth'},{value:"身高",ind:'7',ppq:'height'},{value:"BMI",ind:'8',ppq:'bmi'},{value:"上臀围(左)",ind:'9',ppq:'left_arm_girth'},{value:"上臀围(右)",ind:'10',ppq:'right_arm_girth'},{value:"大腿围(左)",ind:'11',ppq:'left_thigh_girth'},{value:"大腿围(右)",ind:'12',ppq:'right_thigh_girth'},{value:"小腿围(左)",ind:'13',ppq:'left_shank_girth'},{value:"小腿围(右)",ind:'14',ppq:'right_shank_girth'}],
            okl: true,
            inquiry: '',
            multipleSelection: [],
            select_cate: '',
            select_word: '',
            del_list: [],
            coalist: ['教练壹号','教练贰号','教练叁号'],
            is_search: false,
            editVisible: false,
            unBindVisible: false,
            taddVisible: false,
            delVisible: false,
            taddcellnumber: '',
            checkList: [],
            dnw: '',
            coaar: [],
            aka: '',
            nam: '',
            akb: '',
            akc: '',
            form: {
                nick_name: '',
                time: '',
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
            value2: [],
            col: [],
            formThead: []
        };
    },
    computed: {
        data () {
            return this.tableData.filter((d) => {
                let is_del = false;
                for (let i = 0; i < this.del_list.length; i++) {
                    if (d.cellNum === this.del_list[i].cellNum) {
                        is_del = true;
                        break;
                    }
                }
                if (!is_del) {
                    if (d.cellNum.indexOf(this.select_cate) > -1) {
                        return d;
                    }
                }
            });
        }
    },
    created () {
        this.value2[0] = parseInt(this.$route.query.val1) || parseInt(localStorage.getItem('val1'))
        this.value2[1] = parseInt(this.$route.query.val2) || parseInt(localStorage.getItem('val2'));
        this.getData();
    },
    mounted () {

    },
    updated () {
        if(this.checkList.length>1 && this.checkList.length<this.coalist.length){
            this.kval = this.checkList[0]+'...'
        }
        if(this.checkList.length==1){
            this.kval = this.checkList[0]
        }
        if(this.checkList.length==0 || this.checkList.length==this.coalist.length){
            this.kval = '所有'
        } 
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
                            if(this.coaar[j].coachName==this.checkList[i]){
                                this.tableData.push(this.coaar[j])
                            }
                        }
                    }
                }
                if(this.checkList.length==1){
                    this.kval = this.checkList[0]
                    this.tableData = []
                    for(var i=0;i<this.coaar.length;i++){
                        if(this.coaar[i].coachName==this.checkList[0]){
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
            this.inquiry = this.$route.query.inquiry;
            this.nam = this.$route.query.nam;
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
                end: end_time,
                uid: that.inquiry
            };
            console.log(this);
            this.$axios.post(this.localhost + '/api/coach/web/physical/examination/detail/list', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res.data.data);
                    var xbox = res.data.data;
                    var prp = []
                    this.col = []
                    this.formThead = []
                    var yby
                    //canvas
                    var c=document.getElementById("yzycan");
                    var cxt=c.getContext("2d")
                    cxt.clearRect(0,0,c.width,c.height)
                    var d = document.getElementById('yzycan');
                    var lcl = d.getContext('2d');
                    var ck = 1
                    // ydqx.width = ydqx.width*ck;
                    // ydqx.height = ydqx.height*ck;
                    // for(var i=0;i<xbox.length;i++){
                        
                    // }
                    var cfont = 10 * ck + "px Arial"
                    lcl.font = cfont

                    lcl.beginPath();
                    lcl.lineWidth = 1
                    // lcl.strokeStyle='rgba(175,193,212,0.5)'
                    lcl.strokeStyle='#BFC6D3'
                    lcl.setLineDash([3 * ck, 3 * ck])
                    lcl.moveTo(80 * ck, 70 * ck);
                    lcl.lineTo(1150 * ck, 70 * ck);
                    lcl.stroke()
                    lcl.beginPath();
                    lcl.moveTo(80 * ck, 140 * ck);
                    lcl.lineTo(1150 * ck, 140 * ck);
                    lcl.stroke()
                    lcl.beginPath();
                    lcl.moveTo(80 * ck, 210 * ck);
                    lcl.lineTo(1150 * ck, 210 * ck);
                    lcl.stroke()
                    lcl.beginPath();
                    lcl.moveTo(80 * ck, 280 * ck);
                    lcl.lineTo(1150 * ck, 280 * ck);
                    lcl.stroke()
                    lcl.beginPath();
                    lcl.moveTo(80 * ck, 350 * ck);
                    lcl.lineTo(1150 * ck, 350 * ck);
                    lcl.stroke()
                    lcl.beginPath();
                    lcl.setLineDash([0, 0])
                    lcl.moveTo(80 * ck, 420 * ck);
                    lcl.lineTo(1150 * ck, 420 * ck);
                    lcl.stroke()
                    lcl.fillStyle="#BFC7E1"
                    //y轴
                    var kkgt = JSON.parse(JSON.stringify(xbox));
                    console.log(this.cuepp)
                    console.log(this.perList)
                    console.log(this.perList[this.cuepp].ppq)
                    var klb = this.perList[this.cuepp].ppq
                    console.log(xbox[0][klb])
                    kkgt.sort(function (a, b) {
                        return parseFloat(b[klb]) - parseFloat(a[klb]);
                    });
                    var maxkk = parseFloat(kkgt[0][klb])
                    var minkk = parseFloat(kkgt[kkgt.length-1][klb])
                    if(maxkk!=minkk){
                        var ceilm = Math.round(maxkk + (maxkk-minkk)/3)
                        var florm = Math.round(minkk - (maxkk-minkk)/3)
                    }else{
                        var ceilm = maxkk + 5
                        var florm = minkk - 5
                    }
                    console.log(maxkk)
                    console.log(minkk)
                    florm<0?florm=0:florm=florm
                    console.log(kkgt)

                    var yyy = []
                    for(var i=0;i<xbox.length;i++){
                        yyy.push(i*1070/(xbox.length-1))
                    }
                    console.log(yyy)
                    //x轴
                    lcl.beginPath();
                    cfont = 14 * ck + "px Arial"
                    lcl.strokeStyle='#3C4456'
                    lcl.fillStyle="#3C4456"
                    if(yyy.length>2){
                        lcl.fillText(xbox[0].time, 80 * ck, 450 * ck)
                        lcl.fillText(xbox[yyy.length-1].time, 1100 * ck, 450 * ck)
                        for(var i=1;i<yyy.length-1;i++){
                           lcl.fillText(xbox[i].time, i*(1100-80)/(yyy.length-1)+80 * ck, 450 * ck) 
                        }
                    }else if(yyy.length==1){
                        lcl.fillText(xbox[0].time, 80 * ck, 450 * ck)
                        for(var i=1;i<yyy.length-1;i++){
                           lcl.fillText(xbox[i].time, i*(1100-80)/(yyy.length-1)+80 * ck, 450 * ck) 
                        }
                    }else{
                        console.log(999)
                        lcl.fillText(xbox[0].time, 80 * ck, 450 * ck)
                        lcl.fillText(xbox[yyy.length-1].time, 1100 * ck, 450 * ck)
                    }
                    lcl.stroke();
                    for(var i=1;i<yyy.length;i++){
                        lcl.lineTo((lef+yyy[i])*ck,(kk*xbox[i][klb]+bb)*ck)
                    }
                    if(yyy.length==1){
                        var kk = maxkk
                        var bb = 0
                        lcl.beginPath();
                        cfont = 14 * ck + "px Arial"
                        lcl.strokeStyle='#3C4456'
                        lcl.fillStyle="#3C4456"
                        lcl.fillText(maxkk+3, 48 * ck, 73 * ck)
                        lcl.fillText(maxkk+2, 48 * ck, 143 * ck)
                        lcl.fillText(maxkk+1, 48 * ck, 213 * ck)
                        lcl.fillText(maxkk-1, 48 * ck, 283 * ck)
                        lcl.fillText(maxkk-2, 48 * ck, 353 * ck)
                        lcl.fillText(maxkk-3, 48 * ck, 423 * ck)
                        lcl.stroke();
                        var lef = 80
                        lcl.stroke()
                        var arrc = 6

                        lcl.beginPath();
                        lcl.fillStyle="#557BFF"
                        lcl.strokeStyle='#557BFF'
                        lcl.arc(lef*ck,248*ck,arrc*ck,0,2*Math.PI)
                        lcl.stroke()
                        lcl.fill()
                    }else{
                        lcl.beginPath();
                        cfont = 14 * ck + "px Arial"
                        lcl.strokeStyle='#3C4456'
                        lcl.fillStyle="#3C4456"
                        lcl.fillText(ceilm, 48 * ck, 73 * ck)
                        lcl.fillText(maxkk, 48 * ck, 143 * ck)
                        lcl.fillText(Math.round(maxkk-(maxkk-minkk)/3), 48 * ck, 213 * ck)
                        lcl.fillText(Math.round(minkk+(maxkk-minkk)/3), 48 * ck, 283 * ck)
                        lcl.fillText(minkk, 48 * ck, 353 * ck)
                        lcl.fillText(florm, 48 * ck, 423 * ck)
                        lcl.stroke();
                        var kk = 210/(minkk-maxkk)
                        var bb = 140 - maxkk * kk
                        console.log((kk*xbox[0][klb]+bb))
                        var lef = 80
                        lcl.beginPath();
                        lcl.moveTo((lef+yyy[0])*ck,(kk*xbox[0][klb]+bb)*ck)
                        lcl.strokeStyle='#557BFF'
                        for(var i=1;i<yyy.length;i++){
                            lcl.lineTo((lef+yyy[i])*ck,(kk*xbox[i][klb]+bb)*ck)
                        }
                        lcl.stroke()
                        var arrc = 6
                        for(var i=0;i<yyy.length;i++){
                            lcl.beginPath();
                            lcl.fillStyle="#557BFF"
                            lcl.strokeStyle='#557BFF'
                            lcl.arc((lef+yyy[i]-arrc)*ck,(kk*xbox[i][klb]+bb)*ck,arrc*ck,0,2*Math.PI)
                            lcl.stroke()
                            lcl.fill()
                        }
                    }
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        sec (ind) {
            console.log(ind)
            this.curper=this.perList[ind].value
            this.cuepp=ind
            var c=document.getElementById("yzycan");
	        var cxt=c.getContext("2d")
            cxt.clearRect(0,0,c.width,c.height)
            this.getData()
        },
        yzy () {
            console.log('yzy');
        },
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
    }
    .checkbox .el-checkbox__label{
        /* float: left; */
    }
    .knmg .el-checkbox{
        margin-top: 27px;
        width: 80px;
    }
    .knmg .bdmd{
        padding: 0;
    }
    .ctop .el-icon--right{
        margin: 0;
        width: 5px;
        height: 10px;;
        position: absolute;
        right: 25px;
        top: 8px;
    }
    .ctop .el-icon-arrow-down:before{
        position: absolute;
        margin-left: -30px;
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
    .container{
        border-radius: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        border: 1px solid #C6CCDC;
    }
    .penson_data{
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:45px;
        text-indent: 20px;
        height: 45px;
        display: inline-block;
        float: left;
    }
    .ctop{
        width:100%;
        height:45px;
        background:rgba(233,238,246,1);
    }
    .eldrolink{
        cursor: pointer;
        float: left;
        margin-left: 28px;
        display: inline-block;
        width: 110px;
        height: 30px;
        margin-top: 7px;
        line-height: 30px;
        border: 1px solid #C6CCDC;
        background: #fff;
        text-indent: 19px;
        position: relative;
    }
    .cbot{
        position: relative;
        width: 100%;
        height: 500px;
    }
</style>
