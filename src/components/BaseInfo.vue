<template>
    <div class="content">
        <div :class="dt?'gray':'table'">
            <div class="crumbs">
                <div :class="dt?'gray':'oo'">
                    会员管理
                </div>
            </div>
            <div :class="dt?'celllistbb':'celllist'">
                <div class="aa">
                    <div class="ea">
                        个人信息
                    </div>
                    <div class="fa">
                        <div>{{ decodeURIComponent(user.usname.replace(/\+/g, '%20')) }}</div>
                        <div>{{ user.ussex }}</div>
                    </div>
                    <div :class="dt?'fbbb':'fb'">
                        <div class="fba">
                            <div>{{ user.usage }}</div>
                            <div>岁</div>
                        </div>
                        <div class="fbb">
                            <div>{{ user.usheight }}</div>
                            <div>cm</div>
                        </div>
                        <div class="fbc">
                            <div>{{ user.usweight }}</div>
                            <div>kg</div>
                        </div>
                    </div>
                    <div class="fc">
                        <div>运动目标</div>
                        <div>{{ user.usgoal }}</div>
                    </div>
                </div>
                <div class="bb">
                    <div class="ea">
                        运动报告
                    </div>
                    <div class="ha">
                        <div class="haa">
                            <div>运动总天数</div>
                            <div>
                                <div>{{ user.usday }}</div>
                                <div>天</div>
                            </div>
                        </div>
                        <div class="hab">
                            <div>运动总时长</div>
                            <div>
                                <div>{{ user.ustime }}</div>
                                <div>分钟</div>
                            </div>
                        </div>
                        <div class="hac">
                            <div>消耗总热量</div>
                            <div>
                                <div>{{ user.uscal }}</div>
                                <div>千卡</div>
                            </div>
                        </div>
                    </div>
                    <div />
                    <div v-for="(item,index) in tharr" class="hba" :style="'color:'+ item.color">
                        <div class="hbax">
                            <!-- <div class="hbaa" :style="'background:'+ item.category_data.bg_color"></div> -->
                            <div class="hbaa" :style="'background:'+ item.bgcolor" />
                            <div class="hbab">
                                {{ item.category_name }}
                            </div>
                        </div>
                        <div class="hbbx" :style="'background:'+ item.bgcolor">
                            <div class="hbt">
                                <div class="hbd">
                                    「 消耗热量 」
                                </div>
                                <div class="hbr">
                                    <div><span>{{ item.category_data.calorie }}</span></div>
                                    <div>千卡</div>
                                </div>
                            </div>
                            <div class="hbt">
                                <div class="hbd">
                                    「 运动时长 」
                                </div>
                                <div class="hbr">
                                    <div>共计&nbsp;&nbsp;<span>{{ Math.round(item.category_data.time/60000) }}</span>&nbsp;&nbsp;分钟</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="hbb">
                        <div class="hbax">
                            <div class="hbaa hbva"></div>
                            <div class="hbab hbua">HIIT</div>
                        </div>
                        <div class="hbbx hbva">
                            <div class="hbt">
                                <div class="hbd hbva">「 消耗热量 」</div>
                                <div class="hbr hbva">
                                    <div><span>120,002</span></div>
                                    <div>千卡</div>
                                </div>
                            </div>
                            <div class="hbt">
                                <div class="hbd hbva">「 运动时长 」</div>
                                <div class="hbr hbva">
                                    <div>共计&nbsp;&nbsp;&nbsp;&nbsp;<span>120</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分钟</div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <!-- <div class="hbc">
                        <div class="hbax">
                            <div class="hbaa hbvb"></div>
                            <div class="hbab hbub">极限力量</div>
                        </div>
                        <div class="hbbx hbvb">
                            <div class="hbt">
                                <div class="hbd hbvb">「 消耗热量 」</div>
                                <div class="hbr hbvb">
                                    <div><span>120,002</span></div>
                                    <div>千卡</div>
                                </div>
                            </div>
                            <div class="hbt">
                                <div class="hbd hbvb">「 运动时长 」</div>
                                <div class="hbr hbvb">
                                    <div>共计&nbsp;&nbsp;&nbsp;&nbsp;<span>120</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分钟</div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
                <div class="cc">
                    <div class="ea">
                        运动记录
                    </div>
                    <div class="listbox" />
                    <ul class="llbb">
                        <li v-for="item in items" class="list">
                            <div class="left">
                                <div />
                                <div />
                            </div>
                            <div class="right">
                                <div class="rtop">
                                    {{ getDd(new Date(parseInt(item.bind_time))) }}
                                </div>
                                <div class="rbom">
                                    <div class="rboo">
                                        <div class="rbooa">
                                            「 消耗热量 」
                                        </div>
                                        <div class="rbyx">
                                            <span>{{ Math.ceil(item.calorie) }}</span>千卡
                                        </div>
                                    </div>
                                    <div class="rboo">
                                        <div class="rbooa">
                                            「 运动时长 」
                                        </div>
                                        <div class="rbyy">
                                            运动了<span>{{ Math.floor(item.time/60000) }}</span>&nbsp;分钟
                                        </div>
                                    </div>
                                    <div class="rboo rsan">
                                        <!--  <div class="look" @click="dt=true;timeyy=item.date_time">查看</div> -->
                                        <div class="look" @click="see(item.bind_time)">
                                            查看
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="chabox" v-show="dt">
                <div class="chart">
                    <div class="chbox">
                        <div>运动记录</div>
                        <!-- <div>{{ getDd(new Date(parseInt(seetime))) }}</div> -->
                        <div>{{ getDd(new Date(parseInt(1554982731292))) }}</div>
                        <div @click="dt=false">
                            [&nbsp;&nbsp;]
                        </div>
                        <div />
                    </div>
                    <div class="cybox">
                        <div class="cyleft">
                            <div class="cylbox">
                                <div class="bca">
                                    本次运动时长
                                </div>
                                <!-- <div class="bcb"><span>{{Math.floor(stimea/60000)+Math.floor(stimeb/60000)+Math.floor(stimec/60000)}}</span>分钟</div> -->
                                <div class="bcb">
                                    <span>{{ Math.floor(tyti/60000) }}</span>分钟
                                </div>
                                <div class="bcc">
                                    <div>有氧</div><span>{{ Math.floor(stimea/60000) }}</span><div>分钟</div>
                                </div>
                                <!--   <div class="bcd" :style="'width:'+(stimea/mtime*230)+'px'"></div> -->
                                <div class="bcd" :style="'width:'+(10 + stimea/mtime*220)+'px'" />
                                <div class="bcc bccm">
                                    <div>HIIT</div><span>{{ Math.floor(stimec/60000) }}</span><div>分钟</div>
                                </div>
                                <div class="bcd bcca" :style="'width:'+(10 + stimec/mtime*220)+'px'" />
                                <div class="bcc bccm">
                                    <div>力量</div><span>{{ Math.floor(stimeb/60000) }}</span><div>分钟</div>
                                </div>
                                <div class="bcd bccb" :style="'width:'+(10 + stimeb/mtime*220)+'px'" />
                                <div class="bca bcaa">
                                    本次消耗热量
                                </div>
                                <!-- <div class="bcb bcba"><span>{{scala+scalb+scalc}}</span>千卡</div> -->
                                <div class="bcb bcba">
                                    <span>{{ tyca }}</span>千卡
                                </div>
                                <div class="bcc bfc">
                                    <div>有氧</div><span>{{ scala }}</span><div>千卡</div>
                                </div>
                                <div class="bcd" :style="'width:' + (10 + scala/mcal*220)+'px'" />
                                <div class="bcc bfc bccm">
                                    <div>HIIT</div><span>{{ scalc }}</span><div>千卡</div>
                                </div>
                                <div class="bcd bcca" :style="'width:' + (10 + scalb/mcal*220)+'px'" />
                                <div class="bcc bfc bccm">
                                    <div>力量</div><span>{{ scalb }}</span><div>千卡</div>
                                </div>
                                <div class="bcd bccb" :style="'width:' + (10 + scalc/mcal*220)+'px'" />
                            </div>
                        </div>
                        <div class="cyright">
                            <div class="prbox">
                                <div class="prtit">
                                    力量训练<span class="prbs">最大重量 <span class="pras">{{ mjuz }} </span>kg</span>
                                </div>
                                <div class="canabox">
                                    <div class="caa">
                                        <span>200</span>
                                        <span>150</span>
                                        <span>100</span>
                                        <span>50</span>
                                        <span>0</span>
                                    </div>
                                    <div class="cbb">
                                        <div class="cbup">
                                            <div class="canbu">
                                                <canvas id="lclcan" class="lclcan" width="530"
                                                        height="140"
                                                />
                                            </div>
                                        </div>
                                        <div class="cbdo">
                                            <span>{{ tarr[0]>100?getHh(new Date(tarr[0])):ptm }}</span>
                                            <span>{{ tarr[0]>100?getHh(new Date(tarr[1])):ptm }}</span>
                                            <span>{{ tarr[0]>100?getHh(new Date(tarr[2])):ptm }}</span>
                                            <span>{{ tarr[0]>100?getHh(new Date(tarr[3])):ptm }}</span>
                                            <span>{{ tarr[0]>100?getHh(new Date(tarr[4])):ptm }}</span>
                                            <span>{{ tarr[0]>100?getHh(new Date(tarr[5])):ptm }}</span>
                                            <span>{{ tarr[0]>100?getHh(new Date(tarr[6])):ptm }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="prtit uhu">
                                    运动曲线分布<span class="prbs">运动时间占比 <span class="pras">{{ Math.floor(kxtime*100) }} </span>%</span>
                                    <div class="ptvss">
                                        <span>未运动</span>
                                        <span />
                                        <span>HIIT</span>
                                        <span />
                                        <span>力量</span>
                                        <span />
                                        <span>有氧</span>
                                        <span />
                                    </div>
                                </div>

                                <div class="canabox okol">
                                    <div class="caa caab">
                                        <span>200</span>
                                        <span>180</span>
                                        <span>160</span>
                                        <span>140</span>
                                        <span>120</span>
                                        <span>100</span>
                                        <span>80</span>
                                    </div>
                                    <div class="cbb">
                                        <div class="cbup cbupb">
                                            <div class="canbu" style="height: 180px;">
                                                <canvas id="yzycan" class="lclcan" width="530"
                                                        height="180"
                                                />
                                            </div>
                                        </div>
                                        <div class="cbdo">
                                            <!-- <span>{{ mjuz>0?getHh(new Date(tbrr[0])):ptm }}</span> -->
                                            <span>{{ getHh(new Date(tbrr[0])) }}</span>
                                            <span>{{ getHh(new Date(tbrr[1])) }}</span>
                                            <span>{{ getHh(new Date(tbrr[2])) }}</span>
                                            <span>{{ getHh(new Date(tbrr[3])) }}</span>
                                            <span>{{ getHh(new Date(tbrr[4])) }}</span>
                                            <span>{{ getHh(new Date(tbrr[5])) }}</span>
                                            <span>{{ getHh(new Date(tbrr[6])) }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="cancbox cancboxa">
                                    <div class="lslf">
                                        <div class="lsti">
                                            心率功效统计
                                        </div>
                                        <div class="canbu" style="height: 150px;padding-top: 5px;">
                                            <canvas id="yyycan" class="lclcan" width="300"
                                                    height="200" style=""
                                            />
                                        </div>
                                    </div>
                                    <div class="lsrr">
                                        <div class="lsto">
                                            运动&nbsp;&nbsp;<span>{{ Math.floor((yarr[0]+yarr[1]+yarr[2]+yarr[3]+yarr[4]+yarr[5])/60000) }}</span>&nbsp;&nbsp;主要集中在&nbsp;&nbsp;<span>脂肪燃烧</span>
                                        </div>
                                        <div class="uyyn">
                                            <div class="ycbb">
                                                <div>激活放松&nbsp;&nbsp;<span>{{ Math.floor(yarr[0]/60000) }}</span>&nbsp;&nbsp;分钟</div>
                                                <div :style="'background: #B5ECDA;width:'+yarr[0]/maxyarr*120+'px'" />
                                            </div>
                                            <div class="ycbb">
                                                <div>动态热身&nbsp;&nbsp;<span>{{ Math.floor(yarr[1]/60000) }}</span>&nbsp;&nbsp;分钟</div>
                                                <div :style="'background: #C7C9FF;width:'+yarr[1]/maxyarr*120+'px'" />
                                            </div>
                                            <div class="ycbb">
                                                <div>脂肪燃烧&nbsp;&nbsp;<span>{{ Math.floor(yarr[2]/60000) }}</span>&nbsp;&nbsp;分钟</div>
                                                <div :style="'background: #C7DFFF;width:'+yarr[2]/maxyarr*120+'px'" />
                                            </div>
                                            <div class="ycbb">
                                                <div>有氧耐力&nbsp;&nbsp;<span>{{ Math.floor(yarr[3]/60000) }}</span>&nbsp;&nbsp;分钟</div>
                                                <div :style="'background: #FFEBAC;width:'+yarr[3]/maxyarr*120+'px'" />
                                            </div>
                                            <div class="ycbb">
                                                <div>无氧耐力&nbsp;&nbsp;<span>{{ Math.floor(yarr[4]/60000) }}</span>&nbsp;&nbsp;分钟</div>
                                                <div :style="'background: #FFBCD4;width:'+yarr[4]/maxyarr*120+'px'" />
                                            </div>
                                            <div class="ycbb">
                                                <div>峰值锻炼&nbsp;&nbsp;<span>{{ Math.floor(yarr[5]/60000) }}</span>&nbsp;&nbsp;分钟</div>
                                                <div :style="'background: #FFBEA2;width:'+yarr[5]/maxyarr*120+'px'" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import global from '../components/Global'
export default {
    name: 'Baseinfo',
    data () {
        return {
            localhost: 'https://ll.linkfeeling.cn',
            // localhost: 'http://test.linkfeeling.cn',
            // url: './static/vuetable.json',
            url: 'https://ll.linkfeeling.cn/api/user/sport/category_data',
            tableData: [],
            yybox: {},
            tharr: [],
            dt: false,
            ttbox: [],
            inquiry: '',
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
            chartVisibale: false,
            taddcellnumber: '',
            user: {
                usname: '',
                ussex: '',
                usage: '',
                usheight: '',
                usgoal: '',
                usweight: '',
                usday: '',
                ustime: '',
                uscal: ''
            },
            form: {
                user_name: '',
                date: '',
                address: '',
                bracelet_id: '',
                phone_num: '',
                status: '',
                start_time: ''
            },
            idx: -1,
            items: [],
            timeyy: '',
            seetime: '',
            // 详情
            stimea: '',
            stimeb: '',
            stimec: '',
            mtime: '',
            scala: '',
            scalb: '',
            scalc: '',
            mcal: '',
            mjuz: '',
            tarr: [],
            tbrr: [],
            yarr: [],
            maxyarr: '',
            kxtime: '',
            ptm: '00:00',
            tyti: '',
            tyca: ''
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
    watch: {
        '$route' (to, from) {
            // 刷新参数放到这里里面去触发就可以刷新相同界面了
            this.getData();
        }
    },
    created () {
        this.getData();
        // this.see()
        //  window.onscroll = function(){
        //  变量scrollTop是滚动条滚动时，距离顶部的距离
        //  var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        //  变量windowHeight是可视区的高度
        //  var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //  变量scrollHeight是滚动条的总高度
        //  var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        //  滚动条到底部的条件
        //  if(scrollTop+windowHeight==scrollHeight){
        //  写后台加载数据的函数
        //  console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
        //  }
        //  }
    },
    mounted () {
        // this.see()
        window.addEventListener('scroll', this.handleScroll, true);
    },
    methods: {
        // 查看
        see (x) {
            this.dt = true;
            console.log(x);
            this.seetime = x;
            this.clearCanvas()
            // 请求详情
            let dayp = {
                gym_name: global.gym_name || localStorage.getItem("gym_name"),
                page: this.cur_page,
                bind_time: x,
                // bind_time: "1553935864759",
                uid: this.inquiry
                // uid: "9c1b9a52f5d054de228dc8fc92fca5f8"
            };
            // let dayp = {
            //         uid: "9c1b9a52f5d054de228dc8fc92fca5f8",
            //         gym_name: 'link_office',
            //         page: this.cur_page
            //        }
            console.log(this);
            this.$axios.post(this.localhost + '/api/user/sport/detail', JSON.stringify(dayp), {headers: {'Content-Type': 'application/json'}})
                // this.$axios.post('https:/ll.linkfeeling.cn/api/fitness/list',JSON.stringify(dayp))
                // this.$axios.post('https://ll.linkfeeling.cn/api/fitness/bracelet',JSON.stringify(dayp))
                .then((res) => {
                    // jia  data
                    console.log(res.data.data);
                    var data = res.data.data;

                    // var tycal = data.data.total_calorie;
                    // var vyvy = data.data;
                    data = data.items
                    console.log(data);
                    //心率统计
                    var run_effects = []
                    var runa = 0
                    var runb = 0
                    var runc = 0
                    var rund = 0
                    var rune = 0
                    var runf = 0
                    console.log(data)
                    var llmax = 0

                    //10个最大力量值
                    var jjm = []
                    var sumjjm = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    for(var i=0;i<data.length;i++){
                    llmax < parseFloat(data[i].e) ? llmax = parseFloat(data[i].e) : llmax = llmax
                    if (parseFloat(data[i].e)>0){
                        sumjjm.push(parseFloat(data[i].e))
                    }
                    } 
                    // console.log(llmax)
                    // $("#llmax").html(llmax)
                    // $("#llpka").html(llmax>0?llmax:'')
                    // $("#llpkb").html(llmax>0?Math.floor(parseFloat(llmax)*5)/10:'')

                    sumjjm.sort(function (a, b) {
                    return b - a
                    });
                    jjm = sumjjm.slice(0,10)

                    // if(llmax>0){
                    // document.getElementById("fka").style.height = (jjm[0] / llmax*17.35 + 1.4) +'rem'
                    // document.getElementById("fkb").style.height = (jjm[1] / llmax*17.35 + 1.4) +'rem'
                    // document.getElementById("fkc").style.height = (jjm[2] / llmax*17.35 + 1.4) +'rem'
                    // document.getElementById("fkd").style.height = (jjm[3] / llmax*17.35 + 1.4) +'rem'
                    // document.getElementById("fke").style.height = (jjm[4] / llmax*17.35 + 1.4) +'rem'
                    // document.getElementById("fkf").style.height = (jjm[5] / llmax*17.35 + 1.4) +'rem'
                    // document.getElementById("fkg").style.height = (jjm[6] / llmax*17.35 + 1.4) +'rem'
                    // document.getElementById("fkh").style.height = (jjm[7] / llmax*17.35 + 1.4) +'rem'
                    // document.getElementById("fki").style.height = (jjm[8] / llmax*17.35 + 1.4) +'rem'
                    // document.getElementById("fkj").style.height = (jjm[9] / llmax*17.35 + 1.4) +'rem'
                    // }else{
                    // document.getElementById("fka").style.height = 1.4 +'rem'
                    // document.getElementById("fkb").style.height = 1.4 +'rem'
                    // document.getElementById("fkc").style.height = 1.4 +'rem'
                    // document.getElementById("fkd").style.height = 1.4 +'rem'
                    // document.getElementById("fke").style.height = 1.4 +'rem'
                    // document.getElementById("fkf").style.height = 1.4 +'rem'
                    // document.getElementById("fkg").style.height = 1.4 +'rem'
                    // document.getElementById("fkh").style.height = 1.4 +'rem'
                    // document.getElementById("fki").style.height = 1.4 +'rem'
                    // document.getElementById("fkj").style.height = 1.4 +'rem'
                    // }
                    var scccal = 0
                    var xcc = 0
                    var yqc = 0
                    var zcc = 0
                    var buc = {}
                    var cha = 0
                    var arrbox = [] 
                    buc.run_data = []
                    var acc = 0
                    var bcc = 0
                    var ccc = 0
                    var maxtime = 0
                    var tyca = 0
                    var sdata = JSON.parse(JSON.stringify(data));
                    for (var i = 0; i < data.length; i++) {
                         tyca = tyca + parseFloat(data[i].f)
                        //本次消耗热量
                        if (data[i].c.indexOf("跑步机") > -1 || data[i].c.indexOf("椭圆机") > -1 || data[i].c.indexOf("单车") > -1 || data[i].c.indexOf("台阶机") > -1){
                            xcc = xcc + parseFloat(data[i].f)
                        }
                        if (data[i].c.indexOf("哑铃") > -1 || data[i].c.indexOf("杠铃") > -1 || data[i].c.indexOf("飞鸟") > -1 || data[i].c.indexOf("罗马椅") > -1 || data[i].c.indexOf("倒蹬机") > -1 || data[i].c.indexOf("腹肌练习椅") > -1 || data[i].c.indexOf("史密斯机") > -1 || data[i].c.indexOf("蝴蝶机") > -1 || data[i].c.indexOf("卧式曲腿训练机") > -1 || data[i].c.indexOf("奥林匹克上斜椅") > -1 || data[i].c.indexOf("奥林匹克平椅") > -1) {
                            yqc = yqc + parseFloat(data[i].f)
                        }
                        if (data[i].c == 'hiit') {
                            zcc = zcc + parseFloat(data[i].f)
                        }
                    }
                    //运动时长
                    for (var i = 0; i < data.length-1; i++){
                        //运动曲线
                        if (data[i + 1].c == data[i].c) {
                            buc.run_data.push(data[i].g)
                        }
                        if (data[i + 1].c != data[i].c){
                            if(i==1){
                            buc.c = data[i].c
                            buc.duration = data[i].b - data[cha].b
                            buc.run_data.push(data[i].g)
                            cha = i 
                            arrbox.push(buc)
                            buc = {}
                            buc.run_data = []
                            }else{
                            buc.c = data[i].c
                            buc.duration = data[i].b - data[cha].b
                            buc.run_data.push(data[i].g)
                            cha = i
                            arrbox.push(buc) 
                            buc = {}
                            buc.run_data = []
                            }
                        }
                        
                        //心率统计
                        if (data[i].a == 0){
                            if(i==0){
                            runa = 0
                            }else{
                            runa = parseInt(runa) + parseInt(data[i].b - data[i - 1].b)
                            }
                        }
                        if (data[i].a == 1) {
                            if (i == 0) {
                            runb = 0
                            } else {
                            runb = parseInt(runb) + parseInt(data[i].b - data[i - 1].b)
                            }
                        }
                        if (data[i].a == 2) {
                            if (i == 0) {
                            runc = 0
                            } else {
                            runc = parseInt(runc) + parseInt(data[i].b - data[i - 1].b)
                            }
                        }
                        if (data[i].a == 3) {
                            if (i == 0) {
                            rund = 0
                            } else {
                            rund = parseInt(rund) + parseInt(data[i].b - data[i - 1].b)
                            }
                        }
                        if (data[i].a == 4) {
                            if (i == 0) {
                            rune = 0
                            } else {
                            rune = parseInt(rune) + parseInt(data[i].b - data[i - 1].b)
                            }
                        }
                        if (data[i].a == 5) {
                            if (i == 0) {
                            runf = 0
                            } else {
                            runf = parseInt(runf) + parseInt(data[i].b - data[i - 1].b)
                            }
                        }
                    }
                    var bigl = 0
                    xcc>yqc?bigl=xcc:bigl=yqc
                    console.log(scccal)
                    // $("#scccal").html(Math.round(scccal))
                    // $("#scyby").html(Math.round(scccal))
                    // $("#xcc").html(Math.round(xcc))
                    // $("#yqc").html(Math.round(yqc))

                    // if(bigl>0){
                    // document.getElementById("xbb").style.width = (xcc/bigl*30.5 + 0.5) +'rem'
                    // document.getElementById("yqa").style.width = (yqc/bigl*30.5 + 0.5) +'rem'
                    // }else{
                    // document.getElementById("xbb").style.width = 0.5 +'rem'
                    // document.getElementById("yqa").style.width = 0.5 +'rem'
                    // }

                    run_effects.push(runa)
                    run_effects.push(runb)
                    run_effects.push(runc)
                    run_effects.push(rund)
                    run_effects.push(rune)
                    run_effects.push(runf)

                    console.log(run_effects)
                    //心率功效时间排序
                    var zyx = JSON.parse(JSON.stringify(run_effects));
                    zyx.sort(function (a, b) {
                    return b - a;
                    });
                    var pcp = 0
                    for(var p=0;p<run_effects.length;p++){
                    pcp = pcp + run_effects[p]
                    }
                    console.log(zyx)
                    var pbig = zyx[0]
                    var nob = 0
                    var kobb
                    //主要集中在
                    for (var p = 0; p < run_effects.length; p++){
                    if(pbig == run_effects[p]){
                        nob = p
                    }
                    }
                    if(nob == 0){
                    kobb = '激活放松'
                    }
                    if (nob == 1) {
                    kobb = '动态热身'
                    }
                    if (nob == 2) {
                    kobb = '脂肪燃烧'
                    }
                    if (nob == 3) {
                    kobb = '有氧耐力'
                    }
                    if (nob == 4) {
                    kobb = '无氧耐力'
                    }
                    if (nob == 5) {
                    kobb = '峰值锻炼'
                    }
                    console.log(run_effects[2])

                    // $("#pcp").html(Math.round(pcp/60000))
                    // $("#kobb").html(kobb)
                    // $("#yaa").html(Math.round(run_effects[0] / 60000))
                    // $("#ybb").html(Math.round(run_effects[1] / 60000))
                    // $("#ycc").html(Math.round(run_effects[2] / 60000))
                    // $("#ydd").html(Math.round(run_effects[3] / 60000))
                    // $("#yee").html(Math.round(run_effects[4] / 60000))
                    // $("#yff").html(Math.round(run_effects[5] / 60000))
                    // document.getElementById("yya").style.width = (run_effects[0] / pbig * 12.5 + 0.5)+'rem'
                    // document.getElementById("yyb").style.width = (run_effects[1] / pbig * 12.5 + 0.5)+'rem'
                    // document.getElementById("yyc").style.width = (run_effects[2] / pbig * 12.5 + 0.5)+'rem'
                    // document.getElementById("yyd").style.width = (run_effects[3] / pbig * 12.5 + 0.5)+'rem'
                    // document.getElementById("yye").style.width = (run_effects[4] / pbig * 12.5 + 0.5)+'rem'
                    // document.getElementById("yyf").style.width = (run_effects[5] / pbig * 12.5 + 0.5)+'rem'
                    buc.c = data[data.length - 1].c
                    buc.duration = data[data.length - 1].b - data[cha].b
                    buc.run_data.push(data[data.length - 1].g)
                    arrbox.push(buc)

                    data = arrbox 
                    console.log(data)
                    var ssuummdur = 0;
                    
                    for (var i = 0; i < data.length; i++) {
                         ssuummdur = ssuummdur + data[i].duration
                        //本次运动时长
                        if (data[i].c.indexOf("跑步机") > -1 || data[i].c.indexOf("椭圆机") > -1 || data[i].c.indexOf("单车") > -1 || data[i].c.indexOf("台阶机") > -1){
                            acc = acc + data[i].duration
                        }
                        if (data[i].c.indexOf("哑铃") > -1 || data[i].c.indexOf("杠铃") > -1 || data[i].c.indexOf("飞鸟") > -1 || data[i].c.indexOf("罗马椅") > -1 || data[i].c.indexOf("倒蹬机") > -1 || data[i].c.indexOf("腹肌练习椅") > -1 || data[i].c.indexOf("史密斯机") > -1 || data[i].c.indexOf("蝴蝶机") > -1 || data[i].c.indexOf("卧式曲腿训练机") > -1 || data[i].c.indexOf("奥林匹克上斜椅") > -1 || data[i].c.indexOf("奥林匹克平椅") > -1) {
                            bcc = bcc + data[i].duration
                        }
                        if (data[i].c == 'hiit' || data[i].c == 'HIIT') {
                            ccc = ccc + data[i].duration
                        }
                    }
                    var maxcal = 0;
                    this.scala = Math.round(xcc);
                    this.scalb = Math.round(yqc);
                    this.scalc = Math.ceil(zcc);
                    xcc > yqc ? maxcal = xcc : maxcal = yqc;
                    maxcal > zcc ? maxcal = maxcal : maxcal = zcc;
                    this.mcal = maxcal;
                    this.tyca = Math.round(tyca);
                    this.tyti = Math.round(ssuummdur);

                  
                    this.stimea = acc;
                    this.stimeb = bcc;
                    this.stimec = ccc;
                    
                    acc > bcc ? maxtime = acc : maxtime = bcc;
                    maxtime > ccc ? maxtime = maxtime : maxtime = ccc;

                    console.log(maxtime);
                    this.mtime = maxtime;
                    

                    // 最大力量
                    console.log(sdata);
                    var maxjuz = 0;
                    for (var i = 0; i < sdata.length; i++) {
                        // if (sdata[i].c.indexOf("哑铃") > -1 || sdata[i].c.indexOf("杠铃") > -1 || sdata[i].c.indexOf("飞鸟") > -1) {
                        if (sdata[i].c.indexOf("哑铃") > -1 || sdata[i].c.indexOf("杠铃") > -1 || sdata[i].c.indexOf("飞鸟") > -1 || sdata[i].c.indexOf("罗马椅") > -1 || sdata[i].c.indexOf("倒蹬机") > -1 || sdata[i].c.indexOf("腹肌练习椅") > -1 || sdata[i].c.indexOf("史密斯机") > -1 || sdata[i].c.indexOf("蝴蝶机") > -1 || sdata[i].c.indexOf("卧式曲腿训练机") > -1 || sdata[i].c.indexOf("奥林匹克上斜椅") > -1 || sdata[i].c.indexOf("奥林匹克平椅") > -1) {
                            maxjuz > sdata[i].e ? maxjuz = maxjuz : maxjuz = sdata[i].e;
                            console.log(sdata[i].e)
                        }
                    }
                    this.mjuz = maxjuz;
                    console.log(maxjuz);

                    // canvas力量图
                    if (maxjuz > 0) {
                        var kk = -7 / 10;
                        var bb = 140;
                        var sumddp = 0;
                        var lasttop = 0;
                        var lefttop = 0;
                        var d = document.getElementById('lclcan');
                        var lpl = d.getContext('2d');
                        var ll = [];
                        for (var i = 0; i < sdata.length; i++) {
                            // if (sdata[i].c.indexOf("哑铃") > -1 || sdata[i].c.indexOf("杠铃") > -1 || sdata[i].c.indexOf("飞鸟") > -1) {
                            //     // console.log(sdata[i])
                            //     ll.push(sdata[i]);
                            // }
                            if (parseInt(sdata[i].e)>0) {
                                // console.log(sdata[i])
                                ll.push(sdata[i]);
                            }
                        }
                        console.log(ll)
                        // console.log(ll[1].run_data[data[1].run_data.length - 1].extra.field_value);
                        if (ll.length > 0) {
                            var ssuummdur = parseInt(ll[ll.length - 1].b) - parseInt(ll[0].b);
                            console.log(ll[0].e.length)
                            lpl.beginPath();
                            lpl.strokeStyle = 'rgba(255,255,255,0)';
                            lpl.fillStyle = '#FF6383';
                            if(ll[ll.length-1].e>0){
                                lpl.moveTo(530,kk*parseInt(ll[ll.length-1].e)+bb);
                                console.log(1)
                            }else{
                                lpl.moveTo(530,140);
                                console.log(2)
                            }
                            lpl.lineTo(530,140)
                            lpl.lineTo(0,140)
                            if(parseInt(ll[0].e)>0){
                                lpl.lineTo(0,kk*parseInt(ll[0].e)+bb);
                            }else{
                                lpl.moveTo(530,140);
                            }
                            lpl.lineWidth = 0.5;
                            for (var i = 1; i < ll.length; i++) {
                                if(ll[i].e == ""){
                                    ll[i].e = 0
                                }
                                if(ll[i].e == "2.5"){
                                    ll[i].e = 50
                                }
                                var linearGradient1 = lpl.createLinearGradient(0, 0, 0, 140);
                                linearGradient1.addColorStop(0, '#FF5E7F');
                                linearGradient1.addColorStop(1, 'rgba(255,93,127,0.2)');
                                lpl.fillStyle = linearGradient1;
                                lpl.lineTo((parseInt(ll[i].b)-parseInt(ll[0].b))/ssuummdur * 530,kk*parseInt(ll[i].e)+bb)
                                    // console.log((parseInt(ll[i].b)-parseInt(ll[0].b))/ssuummdur * 530)
                                    // console.log(kk*parseInt(ll[i].e)+bb)
                                
                                // if (i > 0) {
                                //     lefttop = parseInt(lefttop) + (parseInt(ll[i].b) - parseInt(ll[i - 1].b)) / ssuummdur * 530;
                                //     console.log(lefttop);
                                //     console.log((parseInt(ll[i].b) - parseInt(ll[i - 1].b)) / ssuummdur * 530);
                                // }
                                // lpl.beginPath();
                                // lpl.strokeStyle = 'rgba(255,255,255,0)';
                                // lpl.fillStyle = '#FF6383';
                                // var linearGradient1 = lpl.createLinearGradient(0, 0, 0, 140);
                                // linearGradient1.addColorStop(0, '#FF5E7F');
                                // linearGradient1.addColorStop(1, 'rgba(255,93,127,0.2)');
                                // lpl.fillStyle = linearGradient1;
                                // lpl.lineWidth = 0.5;
                                // lpl.moveTo(lefttop + ll[i].duration / ssuummdur * 530, kk * ll[i].run_data[data[i].run_data.length - 1].extra.field_value + bb);
                                // // console.log(lefttop+ll[i].duration/ssuummdur*530)
                                // // console.log(lefttop)
                                // sumddp = sumddp + ll[i].duration / ssuummdur * 530;
                                // lpl.lineTo(lefttop + ll[i].duration / ssuummdur * 530, 140);
                                // lpl.lineTo(lefttop, 140);
                                // lpl.lineTo(lefttop, kk * lasttop + bb);
                                // for (var j = 0; j < ll[i].length; j++) {
                                //     lpl.lineTo(lefttop + (j + 1) * ll[i].duration / ssuummdur * 530 / ll[i].run_data.length, kk * ll[i].run_data[j].extra.field_value + bb);
                                // }
                                // lpl.fill();
                                // lpl.stroke();
                                // lasttop = ll[i].run_data[data[i].run_data.length - 1].extra.field_value;
                                // lefttop = lefttop + ll[i].duration / ssuummdur * 530;
                            }
                            lpl.fill();
                            lpl.stroke();
                        }
                        // 顶部实线
                        // var kk = -7 / 10;
                        // var bb = 140;
                        // var sumddp = 0;
                        // var lasttop = 0;
                        // var lefttop = 0;
                        // var d = document.getElementById('lclcan');
                        // var lpl = d.getContext('2d');
                        // var ll = [];
                        // for (var i = 0; i < data.length; i++) {
                        //     if (data[i].category_name == '力量') {
                        //         ll.push(data[i]);
                        //     }
                        // }
                        // console.log(ll[1].run_data[data[1].run_data.length - 1].extra.field_value);
                        // if (ll.length > 0) {
                        //     var ssuummdur = ll[ll.length - 1].end_time - ll[0].start_time;
                        //     for (var i = 0; i < ll.length; i++) {
                        //         if (i > 0) {
                        //             lefttop = parseInt(lefttop) + (parseInt(ll[i].start_time) - parseInt(ll[i - 1].end_time)) / ssuummdur * 530;
                        //         }
                        //         lpl.beginPath();
                        //         lpl.strokeStyle = '#FF5E7F';
                        //         lpl.lineWidth = 0.5;
                        //         lpl.moveTo(lefttop, kk * lasttop + bb);
                        //         for (var j = 0; j < ll[i].run_data.length; j++) {
                        //             lpl.lineTo(lefttop + (j + 1) * ll[i].duration / ssuummdur * 530 / ll[i].run_data.length, kk * ll[i].run_data[j].extra.field_value + bb);
                        //         }
                        //         lpl.stroke();
                        //         lasttop = ll[i].run_data[data[i].run_data.length - 1].extra.field_value;
                        //         lefttop = lefttop + ll[i].duration / ssuummdur * 530;
                        //     }
                        // }
                        // 底部时间
                        // console.log(getHh(new Date(parseInt(ll[0].start_time))))
                        console.log(parseInt(ll[0].start_time));
                        this.tarr.push(parseInt(ll[0].start_time));

                        this.tarr.push(parseInt(parseInt(ll[0].start_time) + parseInt((ll[ll.length - 1].end_time - ll[0].start_time) / 6)));
                        this.tarr.push(parseInt(parseInt(ll[0].start_time) + parseInt((ll[ll.length - 1].end_time - ll[0].start_time) / 6 * 2)));
                        this.tarr.push(parseInt(parseInt(ll[0].start_time) + parseInt((ll[ll.length - 1].end_time - ll[0].start_time) / 6 * 3)));
                        this.tarr.push(parseInt(parseInt(ll[0].start_time) + parseInt((ll[ll.length - 1].end_time - ll[0].start_time) / 6 * 4)));
                        this.tarr.push(parseInt(parseInt(ll[0].start_time) + parseInt((ll[ll.length - 1].end_time - ll[0].start_time) / 6 * 5)));
                        this.tarr.push(parseInt(ll[ll.length - 1].end_time));
                    }
                    // canvas运动曲线分布图表
                    var d = document.getElementById('yzycan');
                    var lcl = d.getContext('2d');
                    
                    // data = data.categories_data
                    console.log(data);
                    var kk = -9 / 7;
                    var bb = -200 * kk;
                    var sumddp = 0;
                    var lasttop = 60;
                    var lefttop = 0;
                    var sumdura = 0;
                    var sumdurb = 0;
                    var sumdurc = 0;
                    var sumdurd = 0;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].c.indexOf("跑步机") > -1 || data[i].c.indexOf("椭圆机") > -1 || data[i].c.indexOf("单车") > -1 || data[i].c.indexOf("台阶机") > -1) {
                            sumdura = sumdura + data[i].duration;
                            // for(var j=0;j<data.categories_data[i].run_data.length;j++){
                            //   sumcala = sumcala + data.categories_data[i].run_data[j].f
                            // }
                        }
                        if (data[i].c == 'hiit' || data[i].c == 'HIIT') {
                            sumdurb = sumdurb + data[i].duration;
                            // for(var j=0;j<data.categories_data[i].run_data.length;j++){
                            //   sumcalb = sumcalb + data.categories_data[i].run_data[j].f
                            // }
                        }
                        if (data[i].c.indexOf("哑铃") > -1 || data[i].c.indexOf("杠铃") > -1 || data[i].c.indexOf("飞鸟") > -1 || data[i].c.indexOf("罗马椅") > -1 || data[i].c.indexOf("倒蹬机") > -1 || data[i].c.indexOf("腹肌练习椅") > -1 || data[i].c.indexOf("史密斯机") > -1 || data[i].c.indexOf("蝴蝶机") > -1 || data[i].c.indexOf("卧式曲腿训练机") > -1 || data[i].c.indexOf("奥林匹克上斜椅") > -1 || data[i].c.indexOf("奥林匹克平椅") > -1) {
                            sumdurc = sumdurc + data[i].duration;
                            // for(var j=0;j<data.categories_data[i].run_data.length;j++){
                            //   sumcalc = sumcalc + data.categories_data[i].run_data[j].f
                            // }
                        }
                        if (data[i].c == "rest" || data[i].c == "") {
                            sumdurd = sumdurd + data[i].duration;
                        }
                    }
                    
                    var ssuummdur = sumdura + sumdurb + sumdurc + sumdurd;
                    this.kxtime = (sumdura + sumdurb + sumdurc) / ssuummdur;
                    console.log(data)
                    for (var i = 0; i < data.length; i++) {
                        lcl.beginPath();
                        lcl.lineWidth = 0.5;
                        if (data[i].c.indexOf("跑步机") > -1 || data[i].c.indexOf("椭圆机") > -1 || data[i].c.indexOf("单车") > -1 || data[i].c.indexOf("台阶机") > -1) {
                            lcl.strokeStyle = 'rgba(255,255,255,0)';
                            lcl.fillStyle = '#FFD450';
                            var linearGradient1 = lcl.createLinearGradient(0, 0, 0, 180);
                            linearGradient1.addColorStop(0, '#FFD450');
                            linearGradient1.addColorStop(1, 'rgba(255,236,178,0.2)');
                            lcl.fillStyle = linearGradient1;
                        }
                        if (data[i].c.indexOf("哑铃") > -1 || data[i].c.indexOf("杠铃") > -1 || data[i].c.indexOf("飞鸟") > -1 || data[i].c.indexOf("罗马椅") > -1 || data[i].c.indexOf("倒蹬机") > -1 || data[i].c.indexOf("腹肌练习椅") > -1 || data[i].c.indexOf("史密斯机") > -1 || data[i].c.indexOf("蝴蝶机") > -1 || data[i].c.indexOf("卧式曲腿训练机") > -1 || data[i].c.indexOf("奥林匹克上斜椅") > -1 || data[i].c.indexOf("奥林匹克平椅") > -1) {
                            lcl.strokeStyle = 'rgba(255,255,255,0)';
                            lcl.fillStyle = '#398EFF';
                            var linearGradient1 = lcl.createLinearGradient(0, 0, 0, 180);
                            linearGradient1.addColorStop(0, '#398EFF');
                            linearGradient1.addColorStop(1, 'rgba(199,223,255,0.2)');
                            lcl.fillStyle = linearGradient1;
                        }
                        if (data[i].c == 'hiit' || data[i].c == 'HIIT') {
                            lcl.strokeStyle = 'rgba(255,255,255,0)';
                            lcl.fillStyle = '#FF5E7F';
                            var linearGradient1 = lcl.createLinearGradient(0, 0, 0, 180);
                            linearGradient1.addColorStop(0, '#FF5E7F');
                            linearGradient1.addColorStop(1, 'rgba(255,93,127,0.2)');
                            lcl.fillStyle = linearGradient1;
                        }
                        if (data[i].c == "rest" || data[i].c == "") {
                            lcl.strokeStyle = 'rgba(255,255,255,0)';
                            lcl.fillStyle = '#7E879C';
                            var linearGradient1 = lcl.createLinearGradient(0, 0, 0, 180);
                            linearGradient1.addColorStop(0, '#7E879C');
                            linearGradient1.addColorStop(1, 'rgba(216,221,238,0.2)');
                            lcl.fillStyle = linearGradient1;
                        }

                        lcl.lineWidth = 0.5;
                        lcl.moveTo(lefttop + data[i].duration / ssuummdur * 530, kk * data[i].run_data[data[i].run_data.length - 1] + bb);
                        sumddp = sumddp + data[i].duration / ssuummdur * 530;
                        lcl.lineTo(sumddp, 180);
                        lcl.lineTo(sumddp - data[i].duration / ssuummdur * 530, 180);
                        lcl.lineTo(sumddp - data[i].duration / ssuummdur * 530, kk * lasttop + bb);
                        for (var j = 0; j < data[i].run_data.length; j++) {
                            lcl.lineTo(lefttop + (j + 1) * data[i].duration / ssuummdur * 530 / data[i].run_data.length, kk * data[i].run_data[j] + bb);
                            // console.log(123)
                        }

                        lcl.fill();
                        lcl.stroke();
                        lasttop = data[i].run_data[data[i].run_data.length - 1];
                        lefttop = lefttop + data[i].duration / ssuummdur * 530;
                    }
                    // 顶部实线
                    var kk = -9 / 7;
                    var bb = -200 * kk;
                    var sumddp = 0;
                    var lasttop = 60;
                    var lefttop = 0;
                    for (var i = 0; i < data.length; i++) {
                        lcl.beginPath();
                        lcl.lineWidth = 0.5;
                        if (data[i].c.indexOf("跑步机") > -1 || data[i].c.indexOf("椭圆机") > -1 || data[i].c.indexOf("单车") > -1 || data[i].c.indexOf("台阶机") > -1) {
                            lcl.strokeStyle = '#FFD450';
                        }
                        if (data[i].c.indexOf("哑铃") > -1 || data[i].c.indexOf("杠铃") > -1 || data[i].c.indexOf("飞鸟") > -1 || data[i].c.indexOf("罗马椅") > -1 || data[i].c.indexOf("倒蹬机") > -1 || data[i].c.indexOf("腹肌练习椅") > -1 || data[i].c.indexOf("史密斯机") > -1 || data[i].c.indexOf("蝴蝶机") > -1 || data[i].c.indexOf("卧式曲腿训练机") > -1 || data[i].c.indexOf("奥林匹克上斜椅") > -1 || data[i].c.indexOf("奥林匹克平椅") > -1) {
                            lcl.strokeStyle = '#398EFF';
                        }
                        if (data[i].c == 'hiit' || data[i].c == 'HIIT') {
                            lcl.strokeStyle = '#FF5E7F';
                        }
                        if (data[i].c == "rest" || data[i].c == "") {
                            lcl.strokeStyle = '#7E879C';
                        }

                        lcl.lineWidth = 0.5;
                        sumddp = sumddp + data[i].duration / ssuummdur * 530;
                        lcl.moveTo(sumddp - data[i].duration / ssuummdur * 530, kk * lasttop + bb);
                        for (var j = 0; j < data[i].run_data.length; j++) {
                            // console.log(data[i].run_data[j].g)
                            lcl.lineTo(lefttop + (j + 1) * data[i].duration / ssuummdur * 530 / data[i].run_data.length, kk * data[i].run_data[j] + bb);
                        }

                        lcl.stroke();
                        lasttop = data[i].run_data[data[i].run_data.length - 1];
                        lefttop = lefttop + data[i].duration / ssuummdur * 530;
                    }
                    // 底部时间
                    var ftime = sdata[0].b
                    var etime = sdata[sdata.length - 1].b
                    this.tbrr.push(parseInt(ftime));
                    console.log(parseInt(ftime))
                    this.tbrr.push(parseInt(parseInt(ftime) + parseInt((etime - ftime) / 6)));
                    this.tbrr.push(parseInt(parseInt(ftime) + parseInt((etime - ftime) / 6 * 2)));
                    this.tbrr.push(parseInt(parseInt(ftime) + parseInt((etime - ftime) / 6 * 3)));
                    this.tbrr.push(parseInt(parseInt(ftime) + parseInt((etime - ftime) / 6 * 4)));
                    this.tbrr.push(parseInt(parseInt(ftime) + parseInt((etime - ftime) / 6 * 5)));
                    this.tbrr.push(parseInt(etime));
                    console.log(this.getHh(new Date(this.tbrr[0])))
                    
                    // 运动功效图表
                    var c = document.getElementById('yyycan');
                    var yzy = c.getContext('2d');
                    var x1, x2, x3, x4, x5;
                    var a1, a2, a3, a4, a5, a6;
                    yzy.beginPath();

                    var ydgxbox
                    ydgxbox = run_effects
                    // for (var i = 0; i < data.length; i++) {
                    //     ydgxbox.splice(data[i].effect, 1, data[i].time);
                    // }
                    // console.log(data);
                    a1 = ydgxbox[1];
                    a2 = ydgxbox[3];
                    a3 = ydgxbox[5];
                    a4 = ydgxbox[4];
                    a5 = ydgxbox[2];
                    a6 = ydgxbox[0];
                    console.log(ydgxbox);
                    this.yarr = ydgxbox;

                    var suaax = 0;
                    for (var i = 0; i < ydgxbox.length; i++) {
                        suaax > ydgxbox[i] ? suaax = suaax : suaax = ydgxbox[i];
                    }
                    this.maxyarr = suaax;

                    var zybox = JSON.parse(JSON.stringify(ydgxbox));
                    zybox.sort(function (a, b) {
                        return b - a;
                    });
                    var suaax = 0;
                    for (var i = 0; i < ydgxbox.length; i++) {
                        if (ydgxbox[i] == zybox[0]) {
                            suaax = i;
                        }
                    }
                    x1 = -0.5 + (Math.floor(a1 / (a1 + a2 + a3 + a4 + a5 + a6) * 1000) / 1000) * 2;
                    x2 = -0.5 + (Math.floor((a1 + a2) / (a1 + a2 + a3 + a4 + a5 + a6) * 1000) / 1000) * 2;
                    x3 = -0.5 + (Math.floor((a1 + a2 + a3) / (a1 + a2 + a3 + a4 + a5 + a6) * 1000) / 1000) * 2;
                    x4 = -0.5 + (Math.floor((a1 + a2 + a3 + a4) / (a1 + a2 + a3 + a4 + a5 + a6) * 1000) / 1000) * 2;
                    x5 = -0.5 + (Math.floor((a1 + a2 + a3 + a4 + a5) / (a1 + a2 + a3 + a4 + a5 + a6) * 1000) / 1000) * 2;

                    yzy.lineWidth = 35;
                    yzy.strokeStyle = '#5A93FF';
                    yzy.arc(150, 100, 50, -0.5 * Math.PI, x1 * Math.PI);
                    yzy.stroke();
                    yzy.beginPath();
                    yzy.strokeStyle = '#72D6FF';
                    yzy.arc(150, 100, 50, x1 * Math.PI, x2 * Math.PI);
                    yzy.stroke();
                    yzy.beginPath();
                    yzy.strokeStyle = '#47F4B4';
                    yzy.arc(150, 100, 50, x2 * Math.PI, x3 * Math.PI);
                    yzy.stroke();
                    yzy.beginPath();
                    yzy.strokeStyle = '#FFAD2A';
                    yzy.arc(150, 100, 50, x3 * Math.PI, x4 * Math.PI);
                    yzy.stroke();
                    yzy.beginPath();
                    yzy.strokeStyle = '#FFA271';
                    yzy.arc(150, 100, 50, x4 * Math.PI, x5 * Math.PI);
                    yzy.stroke();
                    yzy.beginPath();
                    yzy.strokeStyle = '#FF7F65';
                    yzy.arc(150, 100, 50, x5 * Math.PI, 1.5 * Math.PI);
                    yzy.stroke();
                    // yzy.beginPath();
                    // yzy.lineWidth = 2
                    // yzy.fillStyle = '#FF7F65'
                    // yzy.strokeStyle = '#FF7F65';
                    // yzy.moveTo(0, 55)
                    // yzy.lineTo(85, 55)
                    // yzy.arc(88, 55, 2, 0, 2 * Math.PI)
                    // yzy.fill()
                    // yzy.stroke()
                    // yzy.beginPath();
                    // yzy.strokeStyle = '#FFA271';
                    // yzy.fillStyle = '#FFA271'
                    // yzy.moveTo(0, 105)
                    // yzy.lineTo(75, 105)
                    // yzy.arc(78, 105, 2, 0, 2 * Math.PI)
                    // yzy.fill()
                    // yzy.stroke()
                    // yzy.beginPath();
                    // yzy.strokeStyle = '#FFAD2A';
                    // yzy.fillStyle = '#FFAD2A'
                    // yzy.moveTo(0, 165)
                    // yzy.lineTo(105, 165)
                    // yzy.arc(108, 165, 2, 0, 2 * Math.PI)
                    // yzy.fill()
                    // yzy.stroke()
                    // yzy.beginPath();
                    // yzy.strokeStyle = '#5A93FF';
                    // yzy.fillStyle = '#5A93FF'
                    // yzy.moveTo(215, 55)
                    // yzy.lineTo(300, 55)
                    // yzy.arc(213, 55, 2, 0, 2 * Math.PI)
                    // yzy.stroke()
                    // yzy.fill()
                    // yzy.beginPath();
                    // yzy.moveTo(225, 105)
                    // yzy.lineTo(300, 105)
                    // yzy.arc(223, 105, 2, 0, 2 * Math.PI)
                    // yzy.fillStyle = '#72D6FF'
                    // yzy.strokeStyle = '#72D6FF';
                    // yzy.fill()
                    // yzy.stroke()
                    // yzy.beginPath();
                    // yzy.strokeStyle = '#47F4B4';
                    // yzy.fillStyle = '#47F4B4'
                    // yzy.moveTo(195, 165)
                    // yzy.lineTo(300, 165)
                    // yzy.arc(193, 165, 2, 0, 2 * Math.PI)
                    // yzy.fill()
                    // yzy.stroke()
                    // yzy.font="12px Arial"
                    // yzy.fillStyle="#000"
                    // yzy.fillText("激活放松",0,25)
                    // yzy.font="12px Arial"
                    // yzy.fillStyle="#000"
                    // yzy.fillText("脂肪燃烧",0,75)
                    // yzy.font="12px Arial"
                    // yzy.fillStyle="#000"
                    // yzy.fillText("无氧耐力",0,135)
                    // yzy.font="12px Arial"
                    // yzy.fillStyle="#000"
                    // yzy.fillText("动态热身",250,25)
                    // yzy.font="12px Arial"
                    // yzy.fillStyle="#000"
                    // yzy.fillText("有氧耐力",250,75)
                    // yzy.font="12px Arial"
                    // yzy.fillStyle="#000"
                    // yzy.fillText("峰值锻炼",250,135)
                    // yzy.font="12px Arial"
                    // yzy.fillStyle="#000"
                    // yzy.fillText(Math.floor(ydgxbox[0]/(ydgxbox[0]+ydgxbox[1]+ydgxbox[3]+ydgxbox[2]+ydgxbox[4]+ydgxbox[5])*100)+"%",0,45)
                    // yzy.font="12px Arial"
                    // yzy.fillStyle="#000"
                    // yzy.fillText(Math.floor(ydgxbox[2]/(ydgxbox[0]+ydgxbox[1]+ydgxbox[3]+ydgxbox[2]+ydgxbox[4]+ydgxbox[5])*100)+"%",0,95)
                    // yzy.font="12px Arial"
                    // yzy.fillStyle="#000"
                    // yzy.fillText(Math.floor(ydgxbox[4]/(ydgxbox[0]+ydgxbox[1]+ydgxbox[3]+ydgxbox[2]+ydgxbox[4]+ydgxbox[5])*100)+"%",0,155)
                    // yzy.font="12px Arial"
                    // yzy.fillStyle="#000"
                    // yzy.fillText(Math.floor(ydgxbox[1]/(ydgxbox[0]+ydgxbox[1]+ydgxbox[3]+ydgxbox[2]+ydgxbox[4]+ydgxbox[5])*100)+"%",270,45)
                    // yzy.font="12px Arial"
                    // yzy.fillStyle="#000"
                    // yzy.fillText(Math.floor(ydgxbox[3]/(ydgxbox[0]+ydgxbox[1]+ydgxbox[3]+ydgxbox[2]+ydgxbox[4]+ydgxbox[5])*100)+"%",270,95)
                    // yzy.font="12px Arial"
                    // yzy.fillStyle="#000"
                    // yzy.fillText(Math.floor(ydgxbox[5]/(ydgxbox[0]+ydgxbox[1]+ydgxbox[3]+ydgxbox[2]+ydgxbox[4]+ydgxbox[5])*100)+"%",270,155)
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        // 滚动
        handleScroll (e) {
            // console.log(e.target.scrollTop)
            // 变量scrollTop是滚动条滚动时，距离顶部的距离
            // var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            var scrollTop = e.target.scrollTop;
            // 变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;

            // 变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            // console.log("距"+scrollTop+"可"+windowHeight+"滚"+scrollHeight);
            // 滚动条到底部的条件
            if ((scrollTop - scrollHeight) > -5 || (scrollTop - scrollHeight) > 5) {
                // 写后台加载数据的函数
                //                 console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);

            }
        },
        chart: function () {
            this.chartVisibale = true;
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
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
                        ' ' + date.getHours() + seperator2 + date.getMinutes() +
                        seperator2 + date.getSeconds();
            return currentdate;
        },
        getHh: function (no) {
            var date = no;
            var seperator2 = ':';
            var hours = date.getHours();
            var mins = date.getMinutes();
            if (hours >= 1 && hours <= 9) {
                hours = '0' + hours;
            }
            if (mins >= 0 && mins <= 9) {
                mins = '0' + mins;
            }
            var currentdate = hours + seperator2 + mins;
            return currentdate;
        },
        // 获取 easy-mock 的模拟数据
        getData () {
            // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
            // if (process.env.NODE_ENV === 'development') {
            //     this.url = '/ms/table/list';
            // };
            this.inquiry = this.$route.query.inquiry;
            console.log(999);
            console.log(this.inquiry);
            // 请求个人信息
            let datp = {
                gym_name: global.gym_name || localStorage.getItem("gym_name"),
                page: this.cur_page,
                uid: this.inquiry,
                app_version: '001',
                login_type: 'wx',
                network: '4G',
                platform: 'small_program',
                product_id: 'Linkfeeling',
                request_time: 1553496050000,
                tk: 'bb591cf0a67bd41c5e9084012fe53c3a',
                user_type: 'trainee'
            };
            console.log(this);
            this.$axios.post(this.localhost + '/api/account/info', JSON.stringify(datp), {headers: {'Content-Type': 'application/json'}})
                // this.$axios.post(this.localhost+'/api/account/get/account_info',JSON.stringify(datp),{headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res.data.data);
                    this.user.usname = res.data.data.name;
                    this.user.ussex = res.data.data.gender;
                    this.user.usage = res.data.data.age;
                    this.user.usheight = res.data.data.stature;
                    this.user.usweight = res.data.data.weight;
                    this.user.usgoal = res.data.data.goal;
                })
                .catch((res) => {
                    console.log(res);
                });
            // 请求报告
            let datd = {
                gym_name: global.gym_name || localStorage.getItem("gym_name"),
                page: this.cur_page,
                uid: this.inquiry
            };
            console.log(this);
            this.$axios.post(this.localhost + '/api/user/sport/all_data', JSON.stringify(datd), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res.data.data);
                    // res.data.data = res.data.data.data
                    this.user.usday = res.data.data.day_num;
                    this.user.ustime = res.data.data.total_time;
                    this.user.uscal = res.data.data.total_calorie;

                    this.tharr = res.data.data.device_categories;
                    var sumtime = 0//总时长
                    var sumcal = 0//总热量
                    for(var i=0;i<this.tharr.length;i++){
                        sumtime = sumtime + Math.round(parseInt(this.tharr[i].category_data.time))
                        sumcal = sumcal + parseInt(this.tharr[i].category_data.calorie)
                        if(this.tharr[i].category_name == '有氧运动'){
                            this.tharr[i].color = '#9B4909';
                            this.tharr[i].bgcolor = '#FFECB2';
                        }
                        if(this.tharr[i].category_name == '力量训练'){
                            this.tharr[i].color = '#9E394E';
                            this.tharr[i].bgcolor = '#FFA2B5';
                        }
                        if(this.tharr[i].category_name == 'HIIT'){
                            this.tharr[i].color = '#264F86';
                            this.tharr[i].bgcolor = '#C7DFFF';
                        }
                    }

                    this.user.ustime = Math.round(sumtime/60000)
                    this.user.uscal = Math.round(sumcal)
                    console.log(sumtime)
                })
                .catch((res) => {
                    console.log(res);
                });
            // 列表
            let datt = {
                gym_name: global.gym_name || localStorage.getItem("gym_name"),
                page: this.cur_page,
                uid: this.inquiry,
                pos: 1,
                count: 100,
                flag: false
            };
            console.log(this);
            this.$axios.post(this.localhost + '/api/user/sport/list', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res.data.data);
                    this.items = res.data.data;
                })
                .catch((res) => {
                    console.log(res);
                });
        },
        clearCanvas () {  
            var c=document.getElementById("yzycan");  
            var cxt=c.getContext("2d");  
            cxt.clearRect(0,0,c.width,c.height);
        },
        handleEdit (index, row, status) {
            this.$router.push('/editor');
            let that = this;
            this.idx = index;
            console.log(status);
            const item = this.tableData[index];
            // if(status == 0){
            //     this.editVisible = true;
            //     that.form = {
            //     bracelet_id: item.bracelet_id,
            //     user_name: item.user_name,
            //     date: item.date,
            //     address: item.address,
            //     phone_num: item.phone_num,
            //     status: item.status,
            //     start_time: Date.parse(new Date())
            //     }
            //     // that.getedit()
            //     console.log("status = 0")
            // }
        }
        //     tt: function () {
        //         var data = [{x:0,y:50},{x:40,y:80},{x:80,y:110},{x:120,y:40},{x:160,y:70},{x:200,y:90},{x:240,y:50},{x:280,y:70}]
        //         var d = document.getElementById("lclcan");
        //         var lcl= d.getContext("2d");
        //         lcl.beginPath()
        //         lcl.lineWidth = 1
        //         lcl.moveTo(data[data.length-1].x,140-data[data.length-1].y)
        //         lcl.lineTo(data[data.length-1].x,140)
        //         lcl.lineTo(0,140)
        //         lcl.lineTo(0,140-data[0].y)
        //         lcl.strokeStyle='#fff'
        //         for(var i=1;i<data.length;i++){
        //             lcl.lineTo(data[i].x,140-data[i].y)
        //         }
        //         var linearGradient1 = lcl.createLinearGradient(0,0,0,140);
        //         linearGradient1.addColorStop(0  , 'rgba(255,93,126,1)');
        //         linearGradient1.addColorStop(1  , 'rgba(255,93,126,.1)');
        //         lcl.fillStyle = linearGradient1;

        //         // lcl.fillStyle='yellow'
        //         lcl.fill()
        //         lcl.stroke()
        //         lcl.beginPath()
        //         for(var i=0;i<data.length;i++){
        //             lcl.lineTo(data[i].x,140-data[i].y)
        //         }
        //         lcl.strokeStyle='red'
        //         lcl.stroke()
        //     }
    }
};

</script>

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
        height: 100%;
        position: relative;
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
        height: 50px;
    }
    .celllist{
        width: 100%;
        background: #fff;
        height: calc(100% - 50px);
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
    .celllistbb{
        width: 100%;
        background: #eee;
        height: calc(100% - 50px);
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
    .celllist div{
        float: left;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
    }
    .aa,.bb,.cc{
        float: left;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        border-bottom: 1px solid rgba(198,204,220,1);
        height: 100%;
    }
    .celllist .aa{
        width: 21.7%;
        box-sizing: border-box;
        border-right: 1px solid rgba(198,204,220,1);
    }
    .celllist .bb{
        width: 49%;
        border-right: 1px solid rgba(198,204,220,1);
        box-sizing: border-box;
    }
    .celllist .cc{
        width: calc(100% - 70.7%);
        box-sizing: border-box;
    }
    .ea{
        width: 100%;
        height: 60px;
        border-bottom: 1px solid rgba(198,204,220,1);
        text-indent: 30px;
    }
    .fa{
        height: 127px;
        position: relative;
        width: 100%;
    }
    .fa div:nth-of-type(1){
        position: absolute;
        width: 100%;
        height:33px;
        font-size:24px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(60,68,86,1);
        line-height:33px;
        top: 29px;
    }
    .fa div:nth-of-type(2){
        position: absolute;
        width: 100%;
        height:20px;
        font-size:14px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(60,68,86,1);
        line-height:20px;
        bottom: 23px;
    }
    .fb{
        display: flex;
        width: 100%;
        height: 79px;
        background:rgba(244,245,249,1);
        line-height: 79px;
    }
    .fbbb{
        display: flex;
        width: 100%;
        height: 79px;
        background:#eee;
        line-height: 79px;
    }
    .fba,.fbb,.fbc{
        flex: 1;
        box-sizing: border-box;
        border-top: 1px solid rgba(198,204,220,1);
    }
    .fba,.fbb{
        border-right: 1px solid rgba(198,204,220,1);
    }
    .fba div:nth-of-type(1),.fbb div:nth-of-type(1),.fbc div:nth-of-type(1){
        font-size:24px;
        font-family:DINEngschriftStd;
        color:rgba(60,68,86,1);
        width: 50%;
    }
    .fba div:nth-of-type(2),.fbb div:nth-of-type(2),.fbc div:nth-of-type(2){
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        height: 100%;
        line-height: 85px;
    }
    .fc{
        width: calc(100% - 30px);
        height: 123px;
        margin: 20px 15px 0;
        background: #F4F5F9;
        display: inline-block;
    }
    .fc div:nth-of-type(1){
        height: 17px;
        margin-top: 15px;
        width: 100%;
        line-height: 17px;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(90,98,134,1);
        text-indent: 47px;
        background: url(../assets/goala.png) no-repeat 25px center;
    }
    .fc div:nth-of-type(2){
        height: 30px;
        margin-top: 20px;
        width: 69px;
        margin-left: 26px;
        line-height: 30px;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:#5780FF;
        background: #D4DEFA;
        text-align: center;
        text-indent: 0;
    }
    .content-box{
        padding-bottom: 10px !important;
    }
    .ha{
        height: 127px;
        background: #F4F5F9;
        width: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(198,204,220,1);
        margin-bottom: 7px;
    }
    .haa,.hab,.hac{
        height: 100%;
        box-sizing: border-box;
        border-right: 1px solid rgba(198,204,220,1);
    }
    .hac{
        border-right: 0;
    }
    .haa,.hab{
        width: 29%;
        box-sizing: border-box;
    }
    .hac{
        width: calc(100% - 58%);
        box-sizing: border-box;
    }
    .haa div:nth-of-type(1),.hab div:nth-of-type(1),.hac div:nth-of-type(1){
        height: 20px;
        width: 100%;
        margin-top: 19px;
        line-height: 20px;
        text-indent: 30px;
    }
    .haa div:nth-of-type(2),.hab div:nth-of-type(2),.hac div:nth-of-type(2){
        width: 100%;
    }
    .haa div:nth-of-type(2) div,.hab div:nth-of-type(2) div,.hac div:nth-of-type(2) div{
        height: 36px;
        float: left;
        width: 35%;
        margin-top: 27px;
        font-size: 26px;
        line-height: 36px;
        box-sizing: border-box;
        font-weight: bold;
    }
    .haa div:nth-of-type(2) div:nth-of-type(2),.hab div:nth-of-type(2) div:nth-of-type(2),.hac div:nth-of-type(2) div:nth-of-type(2){
        font-size: 14px;
        line-height: 40px;
        width: 65%;
        box-sizing: border-box;
        font-weight: lighter;
        text-indent: 40px;
    }
    .hba,.hbb,.hbc{
        width: 50%;
        box-sizing: border-box;
        height: 160px;
        float: left;
    }
    .hba{

    }
    .hbb{

    }
    .hbc{

    }
    .hbax{
        width: 100%;
        height: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .hbaa{
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #FFECB2;
        margin-left: 28px;
    }
    .hbab{
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        line-height:20px;
        text-indent: 10px;
    }
    .hbbx{
        height: 100px;
        width: calc(100% - 56px);
        margin-left: 28px;
        box-sizing: border-box;
        background: #FFECB2;
    }
    .hbt{
        width: 50%;
        box-sizing: border-box;
        height: 100%;
    }
    .hbd{
        width: 100%;
        height: 17px;
        line-height: 17px;
        text-indent: 20px;
        margin-top: 20px;
        font-size: 12px !important;
    }
    .hbr{
        width: 100%;
        height: 18px;
        line-height: 18px;
        text-indent: 20px;
        margin-top: 22px;
        font-size: 12px !important;
    }
    .hbr div{
        font-size: 12px !important;
    }
    .hbr span{
        font-weight: bold;
    }
    .hbva{
        background: #C7DFFF;
        color: #264F86 !important;
    }
    .hbvb{
        background: #FFA2B5;
        color: #982D43 !important;
    }
    .hbua{
        color: #264F86 !important;
    }
    .hbub{
        color: #982D43 !important;
    }
    .hbva div{
        color: #264F86 !important;
        font-size: 12px !important;
    }
    .hbvb div{
        color: #982D43 !important;
        font-size: 12px !important;
    }
    .listbox{
        height: 30px;
        width: 100%;
    }
    .list{
        height: 148px;
        box-sizing: border-box;
    }
    .left{
        width: 56px;
        height: 100%;
        box-sizing: border-box;
        float: left;
        position: relative;
    }
    .right{
        width: calc(100% - 80px);
        box-sizing: border-box;
        height: 100%;
        float: right;
        overflow: hidden;
        position: relative;
    }
    .llbb{
        width: 100%;
        height: calc(100% - 90px);
        display: inline-block;
        margin: 0 ;
        padding: 0;
        float: left;
        overflow: auto;
    }
    ul,li{
        list-style: none;
    }
    .llbb li:nth-of-type(1){
    }
    .left div:nth-of-type(1){
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 10px;
        height: 10px;
        background: #5780FF;
        border-radius: 50%;
    }
    .left div:nth-of-type(2){
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 3px;
        height: calc(100% - 10px);
        background: #5780FF;
    }
    .rtop{
        position: absolute;
        top: 0;
        width: 100%;
        height: 17px;
        line-height: 17px;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:#5A6286;
        text-align: left;
        text-indent: 0;
    }
    .rbom{
        position: absolute;
        width: 92%;
        border: 1px solid rgba(198,204,220,1);
        height: 100px;
        box-sizing: border-box;
        top: 28px;
    }
    .rbom{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    .rboo{
        flex: 1;
        height: 100%;
        text-indent: 10px;
    }
    .rbooa{
        height: 17px;
        width: 100%;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(90,98,134,1);
        line-height:17px;
        margin-top: 20px;
        box-sizing: border-box;
        text-indent: 0;
    }
    .rbyx{
        width: 100%;
        margin-top: 22px;
        height: 17px;
        line-height: 17px;
        box-sizing: border-box;
        text-align: right;
        font-size: 12px !important;
        text-indent: 0;
        text-align: center;
    }
    .rbyx span{
        text-align: center;
        display: inline-block;
        height: 100%;
        line-height: 17px;
        text-indent: 3px;
        width: calc(100% - 40px);
        font-size: 16px;
        font-weight: bold;
    }
    .rbyy{
        width: 100%;
        margin-top: 22px;
        height: 17px;
        line-height: 17px;
        box-sizing: border-box;
        font-size: 12px !important;
        text-indent: 0px;
        text-align: center;
    }
    .rbyy span{
        display: inline-block;
        height: 100%;
        line-height: 17px;
        text-indent: 3px;
      /*  width: calc(100% - 50px);*/
        font-size: 16px;
        font-weight: bold;
    }
    .rsan{
        position: relative;
    }
    .look{
        display: inline-block;
        width:60px;
        height:27px;
        background:rgba(87,128,255,1);
        border-radius:14px;
        position: absolute;
        left: 50%;
        top: 50%;
        line-height: 27px;
        transform: translate(-50%, -50%);
        color: #fff !important;
        text-indent: 0;
        text-align: center;
    }
    .chart{
        background: #fff;
        width: 1000px;
        height: 890px;
        position: absolute;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        overflow: auto;
        opacity: 1;
        /* border: #ccc 20px solid; */
    }
    .chbox{
        height: 60px;
        width: 100%;
        box-sizing: border-box;
        line-height: 60px;
        position: relative;
        background: #fff;
        box-shadow:0px 5px 10px 0px rgba(224,231,237,0.29);
        margin-bottom: 30px;
    }
    .chbox div{
        box-sizing: border-box;
        position: absolute;
    }
    .chbox div:nth-of-type(1){
        width: 80px;
        height: 100%;
        display: inline-block;
        left: 30px;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
    }
    .chbox div:nth-of-type(2){
        width: 200px;
        height: 100%;
        display: inline-block;
        left: 116px;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(90,98,134,1);
        letter-spacing: 2px;
    }
    .chbox div:nth-of-type(3){
        width: 60px;
        right: 0;
        height: 100%;
        background: url(../assets/noinfo.png) center no-repeat;
        text-align: center;
        color:rgba(90,98,134,.5);
        font-size: 16px;
        line-height: 60px;
        letter-spacing: 0px;
    }
    .chbox div:nth-of-type(4){
        width: 30px;
        height: 4px;
        background: #FFC001;
        left: 30px;
        bottom: 0;
    }
    .cybox{
        width: 100%;
        height: 799px;
        box-sizing: border-box;
    }
    .cyleft{
        width: 333px;
        height: 100%;
        border-right: 1px solid #C6CCDC;
        box-sizing: border-box;
        float: left;
        font-weight: 600;
    }
    .cyright{
        width: calc(100% - 333px);
        box-sizing: border-box;
        height: 100%;
        float: left;
    }
    .cylbox{
        width: 231px;
        height: calc(100% - 6px);
        margin: 0 44px 0 58px;
        box-sizing: border-box;
    }
    .bca{
        width: 100%;
        margin-top: 6px;
        height:20px;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:600;
        color:rgba(60,68,86,1);
        line-height:20px;
    }
    .bcb{
        width: 100%;
        margin-top: 27px;
        height:36px;
        line-height:36px;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:600;
        color:rgba(60,68,86,1);
        text-indent: 51px;
        position: relative;
        margin-bottom: 35px;
    }
    .bcb span{
        display: inline-block;
        left: 0;
        font-size:26px;
        font-family:DINEngschriftStd;
        color:rgba(60,68,86,1);
        height: 100%;
        position: absolute;
        text-indent: 0;
        line-height: 32px;
    }
    .bcc{
        height: 17px;
        width: 100%;
    }
    .bccm{
        margin-top: 20px;
    }
    .bcc div:nth-of-type(1){
        float: left;
        width:50px;
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Medium;
        color:rgba(60,68,86,1);
        line-height:17px;
    }
    .bcc span{
        float: left;
        height:17px;
        line-height: 16px;
        font-size: 18px;
        font-family: DINEngschriftStd;
        color: rgba(60,68,86,1);
        margin-left: 120px;
    }
    .bfc span{
        margin-left: 95px;
    }
    .bcc div:nth-of-type(2){
        float: right;
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Medium;
        color:rgba(60,68,86,1);
        line-height:17px;
        margin-right: 4px;
    }
    .bcd{
        margin-top: 10px;
        width:0;
        height:7px;
        background:rgba(255,236,178,1);
        border-radius:6px;
        box-sizing: border-box;
    }
    .bcca{
        background: #C7DFFF;
    }
    .bccb{
        background: #FFA2B5;
    }
    .bcaa{
        margin-top: 53px;
    }
    .bcba{
        text-indent: 84px;
    }
    .prbox{
        width: 567px;
        height: 100%;
        box-sizing: border-box;
        margin-left: 48px;
    }
    .prtit{
        width: 100%;
        height: 20px;
        padding-top: 6px;
        line-height: 20px;
        font-size: 14px;
        color: #3C4456;
        font-family: PingFangSC-Medium;
        font-weight: 600;
        box-sizing: content-box;
    }
    .prbs{
        float: right;
        margin-right: 20px;
    }
    .pras{
        font-size: 24px;
    }
    .canabox{
        width: 100%;
        height: 215px;
        float: left;
    }
    .caa{
        width: 30px;
        height: 100%;
        float: left;
        box-sizing: border-box;
        position: relative;
    }
    .cbb{
        width: 535px;
        height: 100%;
        float: left;
        box-sizing: border-box;
        display: inline-block;
    }
    .caa span{
        position: absolute;
        font-size:10px;
        font-family:DINAlternate-Bold;
        font-weight:bold;
        color:rgba(50,69,96,0.5);
        height: 11px;
        line-height: 11px;
    }
    .caa span:nth-of-type(1){
        top: 19px;
    }
    .caa span:nth-of-type(2){
        top: 55px;
    }
    .caa span:nth-of-type(3){
        top: 90px;
    }
    .caa span:nth-of-type(4){
        top: 126px;
    }
    .caa span:nth-of-type(5){
        top: 161px;
    }
    .caab span:nth-of-type(1){
        top: 19px;
    }
    .caab span:nth-of-type(2){
        top: 44px;
    }
    .caab span:nth-of-type(3){
        top: 69px;
    }
    .caab span:nth-of-type(4){
        top: 94px;
    }
    .caab span:nth-of-type(5){
        top: 119px;
    }
    .caab span:nth-of-type(6){
        top: 144px;
    }
    .caab span:nth-of-type(7){
        top: 169px;
    }
    .cbup{
        height: 173px;
        width: 100%;
    }
    .cbupb{
        height: 204px;
        width: 100%;
    }
    .cbdo{
        width: 100%;
        height: 11px;
        display: flex;
        justify-content: space-between;
    }
    .cbdo span{
        font-size:10px;
        font-family:DINAlternate-Bold;
        font-weight:bold;
        color:rgba(50,69,96,0.5);
        height: 11px;
        line-height: 11px;
    }
    .cbdo span:nth-of-type(1){

    }
    .cbdo span:nth-of-type(2){

    }
    .cbdo span:nth-of-type(3){

    }
    .cbdo span:nth-of-type(4){

    }
    .cbdo span:nth-of-type(5){

    }
    .cbdo span:nth-of-type(6){

    }
    .cbdo span:nth-of-type(7){

    }
    .canbu{
        background: #fff;
        width: 100%;
        height: 142px;
        padding-top: 21px;
    }
    .ptwo{
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        font-weight: 600;
        color: #3C4456;
        float: left;
    }
    .canbbox{
        width: 100%;
        height: 275px;
        background: yellow;
        float: left;
    }
    .cancbox{
        width: 100%;
        float: left;
        height: 244px;
    }
    .fbb div:nth-of-type(1){
        text-align: center;
    }
    .gray{
        background: #eee !important;
        width: 100%;
        font-size: 14px;
        height: 100%;
        position: relative;
    }
    .ptvss{
        position: absolute;
        width: 100%;
        height: 14px;
        margin-top: 10px;
    }
    .ptvss span{
        display: inline-block;
        height: 14px;
        line-height: 14px;
        float: right;
        font-size: 10px;
    }
    .ptvss span:nth-of-type(1){
        margin-right: 21px;
    }
    .ptvss span:nth-of-type(2){
        margin-right: 5px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #D6D9E7;
        margin-top: 3px;
    }
    .ptvss span:nth-of-type(3){
        margin-right: 10px;
    }
    .ptvss span:nth-of-type(4){
        margin-right: 5px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #FFA2B5;
        margin-top: 3px;
    }
    .ptvss span:nth-of-type(5){
        margin-right: 10px;
    }
    .ptvss span:nth-of-type(6){
        margin-right: 5px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #C7DFFF;
        margin-top: 3px;
    }
    .ptvss span:nth-of-type(7){
        margin-right: 10px;
    }
    .ptvss span:nth-of-type(8){
        margin-right: 5px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #FFECB2;
        margin-top: 3px;
    }
    .uhu{
        position: relative;
    }
    .okol{
        margin-top: 20px;
    }
    .cancboxa{
        margin-top: 38px;
    }
    .lslf{
        width: 300px;
        box-sizing: border-box;
        height: 100%;
        float: left;
    }
    .lsrr{
        width: calc(100% - 300px);
        box-sizing: border-box;
        height: 100%;
        float: left;
    }
    .lsti{
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:20px;
        height: 20px;
    }
    .lsto{
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(132,143,160,1);
        line-height:17px;
        margin-top: 12px;
        margin-left: 6px;
    }
    .lsto span{
        font-size:24px;
        font-family:DINEngschriftStd;
        color:rgba(132,143,160,1);
    }
    .lsto span:nth-of-type(2){
        font-size:14px;
        font-family:DINEngschriftStd;
        color:#3C4456;
    }
    .uyyn{
        margin-top: 25px;
        width: 100%;
        height: 142px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .ycbb{
        width: 120px;
        height: 34px;
        display: inline-block;
        box-sizing: border-box;
        float: left;
        position: relative;
    }
    .ycbb div:nth-of-type(1){
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:17px;
    }
    .ycbb div span{
        height:18px;
        font-size:18px;
        font-family:DINEngschriftStd;
        color:rgba(60,68,86,1);
        line-height:22px;
    }
    .ycbb div:nth-of-type(2){
        position: absolute;
        bottom: 0;
        background: #f00;
        width: 120px;
        height: 7px;
        border-radius: 6px;
    }
    .content{
        background: #F6F7F8;
        height: 735px;
    }
    .table{
        height: 735px;
    }
    .chabox{
        width: 100%;
        min-height: 30rem;
        box-sizing: border-box;
        position: absolute;
        z-index: 3099;
        background: #F6F7F8;
        top: 0px;
        left: 0;
        /* opacity: 0.2; */
    }
</style>
