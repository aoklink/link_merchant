<template>
    <div class="content">
        <div class="table">
            <div class="crumbs">
                <div class="oo">
                    店铺管理
                </div>
                <div class="celllist">
                    日期选择
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
                    <span class="penson_data">{{decodeURIComponent(nam.replace(/\+/g, '%20'))}}的体测照片</span>
                    <span class="crrt" v-if="visibb==false" @click="visibb=true">生成对比照</span>
                    <span class="crrtll" v-if="visibb==true" @click="visibb=false">取消</span>
                    <span class="crrt" v-if="visibb==true" @click="showcan">下一步</span>
                </div>
                <div class="probox" v-if="visibb==false">
                    <span>体脂率</span>
                    <span>{{form.bfr>0?form.bfr:'--'}}%</span>
                    <span :style="{color:(parseFloat(form.bfr_dif)>=0?'#FF6464':'#27C986')}">{{form.kao}}</span>
                    <span>骨骼肌</span>
                    <span>{{form.skeletal_muscle>0?form.skeletal_muscle:'--'}}kg</span>
                    <span :style="{color:(parseFloat(form.skeletal_muscle_dif)>=0?'#FF6464':'#27C986')}">{{form.kbo}}</span>
                    <span>体重</span>
                    <span>{{form.weight>0?form.weight:'--'}}kg</span>
                    <span :style="{color:(parseFloat(form.weight_dif)>=0?'#FF6464':'#27C986')}">{{form.kco}}</span>
                </div>
                <div class="probox" v-if="visibb==true">
                    <div class="secnum">选择显示数值</div>
                    <span>体脂率</span>
                    <span>{{form.bfr}}%</span>
                    <span :style="{color:(parseFloat(form.bfr_dif)>=0?'#FF6464':'#27C986')}">{{form.kao}}</span>
                    <span>骨骼肌</span>
                    <span>{{form.skeletal_muscle}}kg</span>
                    <span :style="{color:(parseFloat(form.skeletal_muscle_dif)>=0?'#FF6464':'#27C986')}">{{form.kbo}}</span>
                    <span>体重</span>
                    <span>{{form.weight}}kg</span>
                    <span :style="{color:(parseFloat(form.weight_dif)>=0?'#FF6464':'#27C986')}">{{form.kco}}</span>
                    <el-checkbox-group v-model="checkListc" :min="minc">
                        <el-checkbox label="体脂率"></el-checkbox>
                        <el-checkbox label="骨骼肌"></el-checkbox>
                        <el-checkbox label="体重"></el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="imgbox" v-if="visibb==false">
                    <div class="secimg" 
                        v-for="(item, index) in imgList"
                        :key="index"
                        :style="{ 'background': 'url(' +item.src + ') no-repeat center','background-size': '150px 200px'}"
                    >
                    </div>
                </div>
                <div class="imgbox" v-if="visibb==true">
                    <div class="secnumb">选择生成图素材</div>
                    <div class="secimg" 
                        v-for="(item, index) in imgList"
                        :key="index"
                        :style="{ 'background': 'url(' +item.src + ') no-repeat center','background-size': '150px 200px'}"
                        @click="seciima($event,index,item.ind)"
                    >
                        <span class="secin" 
                            :style="{background:(item.state==true?'#305CD9':'#D6D6D6')}"
                        >{{item.ind>-1?item.ind:''}}</span>
                    </div>
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
        <!-- 裁剪 -->
        <div class="box" v-if='osvisi'>
            <div class="bboq" v-if='showimg'>
                <div class="cb_td">生成对比照(3/3)</div>
                <canvas id="canvas" width="374" height="527"></canvas>
                <img id="imgkk">
                <a class="bbtn" download :href="npc" @click="showimg=false;osvisi=false">保存至电脑</a>
                <div class="exit" @click="clle">点击取消</div>
            </div>
            <div class="llff" style="display:none;">
                <div class="lltit">点击选择裁剪图片</div>
                <div class="llup" :style="{ 'background': 'url(' + srca + ') no-repeat center'}" 
                    @click="pssec(0)"
                ><span>1</span></div>
                <div class="lldo" :style="{ 'background': 'url(' + srcb + ') no-repeat center'}"
                    @click="pssec(1)"
                ><span>2</span></div>
            </div>
            <div class="info-item handle">
            <!-- <label class="btn btn-orange" for="uploads" style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">选择图片</label> -->
            <!-- <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)"> -->
            <!-- <input type="button" class="btn btn-blue" value="上传头像" @click="finish('blob')"> -->
            <div class="line" style="margin-top: 85px;">
                <div class="cropper-content" style="margin-top:-60px;">
                <div class="cb_box" v-if='!showimg'>
                    <div class="cb_ta">{{cb_ta}}</div>
                    <div class="cb_tb">{{cb_tb}}</div>
                    <div class="cropper">
                        <vueCropper
                        ref="cropper"
                        :img="option.src"
                        :outputSize="option.size"
                        :outputType="option.outputType"
                        :info="true"
                        :full="option.full"
                        :canMove="option.canMove"
                        :canMoveBox="option.canMoveBox"
                        :original="option.original"
                        :autoCrop="option.autoCrop"
                        :autoCropWidth="option.autoCropWidth"
                        :autoCropHeight="option.autoCropHeight"
                        :fixedBox="option.fixedBox"
                        @realTime="realTime"
                        @imgLoad="imgLoad"
                        ></vueCropper>
                    </div>
                    <div v-if='blob_ok==0' class="cb_tc" @click="down('blob')">下一步</div>
                    <div v-if='blob_ok==1' class="cb_tc" @click="downb('blob')">下一步</div>
                    <!-- <div v:if='!blob_ok' class="cb_tc" @click="down('blob')">保存至电脑</div> -->
                </div>
                <div style="margin-left:20px;">
                    <div class="show-preview" :style="{'width': '187px', 'height':'360px',  'overflow': 'hidden', 'margin': '5px'}">
                    <div :style="previews.div" class="preview" style="visibility:hidden">
                        <img :src="previews.url" :style="previews.img">
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <!-- <input type="button" class="oper" style="height:20px;width:23px;font-size:10px;margin-left:300px;margin-top: 85px;" value="+" title="放大" @click="changeScale(1)">
            <input type="button" class="oper" style="height:20px;width:23px;font-size:10px;" value="-" title="缩小" @click="changeScale(-1)">
            <input type="button" class="oper" style="height:20px;width:23px;font-size:10px;" value="↺" title="左旋转" @click="rotateLeft">
            <input type="button" class="oper" style="height:20px;width:23px;font-size:10px;" value="↻" title="右旋转" @click="rotateRight">
            <input type="button" class="oper osave" style="height:20px;width:53px;font-size:10px;" value="保存" title="保存" @click="down('blob')">
            <span class="scs" @click="start">合成照片</span> -->
            </div>
            <div class="rrff" style="display:none;">
                <div class="rrtit">素材图</div>
                <div class="rrup" :style="{ 'background': 'url(' + srcc + ') no-repeat center'}"><span>1</span></div>
                <div class="rrdo" :style="{ 'background': 'url(' + srcd + ') no-repeat center'}"><span>2</span></div>              
            </div>
        </div>
    </div>
</template>

<script>
import {VueCropper} from 'vue-cropper'
import global from '../components/Global';
export default {
    name: 'photoshop',
    inject: ['reload'],//注入reload方法
    data () {
        return {
            localhost: 'http://bg.linkfeeling.cn',
            localhost: 'https://dev.linkfeeling.cn',
            // url: './static/vuetable.json',
            url: this.localhost + '/api/platform/members',
            tableData: [],
            yybox: {},
            aac: 2,
            cb_ta: '生成对比照(1/3)',
            cb_tb: '裁剪第一张照片',
            blob_ok: -1,
            minc: 1,
            bbc: 2,
            ttbox: [],
            showimg: false,
            inquiry: '',
            visicc: false,
            checkListb: [],
            aaa: '',
            kval: '所有',
            cur_page: 1,
            cuepp: 0,
            visibb: false,
            imgList: [],
            porList: [],
            aac: 3,
            bbc: 1,
            bka: 0,
            bkb: 0,
            bkc: 0,
            curper: '体重',
            perList: [{value:"体重",ind:'0',ppq:'ka'},{value:"体脂率",ind:'1',ppq:'kb'},{value:"骨骼肌",ind:'2',ppq:'kc'},{value:"胸围",ind:'3',ppq:'kd'},{value:"腰围",ind:'4',ppq:'ke'},{value:"臀围",ind:'5',ppq:'kf'},{value:"肩宽",ind:'6',ppq:'kg'},{value:"身高",ind:'7',ppq:'kh'},{value:"BMI",ind:'8',ppq:'ki'},{value:"上臀围(左)",ind:'9',ppq:'kj'},{value:"上臀围(右)",ind:'10',ppq:'kk'},{value:"大腿围(左)",ind:'11',ppq:'kl'},{value:"大腿围(右)",ind:'12',ppq:'km'},{value:"小腿围(左)",ind:'13',ppq:'kn'},{value:"小腿围(右)",ind:'14',ppq:'ko'}],
            okl: true,
            inquiry: '',
            multipleSelection: [],
            select_cate: '',
            select_word: '',
            del_list: [],
            imgsta: [],
            coalist: ['教练壹号','教练贰号','教练叁号'],
            is_search: false,
            editVisible: false,
            unBindVisible: false,
            taddVisible: false,
            delVisible: false,
            taddcellnumber: '',
            checkListc: ["体脂率"],
            dnw: '',
            coaar: [],
            aka: '',
            akb: '',
            akc: '',
            form: {},
            gym: {},
            idx: -1,
            npc: '',
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
            formThead: [],
            headImg:'',
            srca: '',
            srcb: '',
            srcc: '',
            srcd: '',
            //剪切图片上传
            crap: false,
            previews: {},
            option: {
                img: '',
                src: '',
                outputSize:1, //剪切后的图片质量（0.1-1）
                full: false,//输出原图比例截图 props名full
                outputType: 'png',
                canMove: true, 
                original: false, 
                canMoveBox: true, 
                autoCrop: true, 
                autoCropWidth: 187, 
                autoCropHeight: 360, 
                fixedBox: true 
            }, 
            fileName:'',  //本机文件地址
            downImg: '#',
            imgFile:'',
            uploadImgRelaPath:'', //上传后的图片的地址（不带服务器域名）
            pscur: 0,
            osvisi: false
        };
    },
    components: { 
      VueCropper 
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
        console.log(this.value2)
        this.getData();
    },
    mounted () {

    },
    updated () {

    },
    methods: {
        //点击取消，画布清空
        clle () {
            console.log(99)
            this.clearCanvas()
            this.showimg = false
            this.osvisi = false
        },
        clearCanvas () {  
            var c=document.getElementById("canvas");  
            var cxt=c.getContext("2d");  
            cxt.clearRect(0,0,c.width,c.height);  
        },
        start () {
            if(this.srcc == ''){
                this.$message.error(`请裁剪保存1号图片`);
                return
            }
            if(this.srcd == ''){
                this.$message.error(`请裁剪保存2号图片`);
                return
            }
            // this.osvisi = false
            this.showimg=true
            var that =this
            setTimeout(function(){
                that.draw()
            },0)
        },
        pssec (ind) {
            console.log(ind)
            var that = this
            if(ind == 0){
                console.log(this.option.src)
                that.option.src = that.srca  
                that.pscur = 0
            }else{
                that.option.src = that.srcb   
                that.pscur = 1
            }
        },
        tadd () {
            this.taddVisible = true;
        },
        //放大/缩小
        changeScale(num) { 
            console.log('changeScale')
            num = num || 1; 
            this.$refs.cropper.changeScale(num); 
        }, 
        //坐旋转
        rotateLeft() { 
            console.log('rotateLeft')
            this.$refs.cropper.rotateLeft(); 
        }, 
        //右旋转
        rotateRight() { 
            console.log('rotateRight')
            this.$refs.cropper.rotateRight(); 
        }, 
        //上传图片（点击上传按钮）
        finish(type) { 
            console.log('finish')
            let _this = this;
            let formData = new FormData();
            // 输出 
            if (type === 'blob') { 
            this.$refs.cropper.getCropBlob((data) => { 
                let img = window.URL.createObjectURL(data) 
                this.model = true; 
                this.modelSrc = img; 
                formData.append("file", data, this.fileName);
                this.$http.post(Api.uploadSysHeadImg.url, formData, {contentType: false, processData: false, headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
                .then((response)=>{
                var res = response.data;
                if(res.success == 1){
                    $('#btn1').val('');
                    _this.imgFile = '';
                    _this.headImg = res.realPathList[0];  //完整路径
                    _this.uploadImgRelaPath = res.relaPathList[0];  //非完整路径
                    _this.$message({　　//element-ui的消息Message消息提示组件
                    type: 'success',
                    message: '上传成功'
                    });
                }
                })
            }) 
            } else { 
            this.$refs.cropper.getCropData((data) => { 
                this.model = true; 
                this.modelSrc = data; 
            }) 
            } 
        }, 
        // 实时预览函数 
        realTime(data) { 
            console.log(data)
            this.previews = data 
        }, 
        //下载图片
        down(type) { 
            console.log('down')
            var that = this
            var aLink = document.createElement('a') 
            aLink.download = 'author-img' 
            if (type === 'blob') { 
                this.$refs.cropper.getCropBlob((data) => { 
                    this.downImg = window.URL.createObjectURL(data)
                    aLink.href = window.URL.createObjectURL(data) 
                    console.log(this.pscur)
                    if(this.pscur == 0){
                        console.log(0)
                        this.srcc = aLink.href
                    }else{
                        console.log(1)
                        this.srcd = aLink.href
                    }
                    that.blob_ok = 1
                    that.cb_ta = '生成对比照（2/3）'
                    that.cb_tb = '裁剪第二张照片'
                    console.log(that.blob_ok)
                    that.option.src = that.srcb
                    that.pscur = 1
                    // aLink.click() 
                }) 
            } else { 
                this.$refs.cropper.getCropData((data) => { 
                    this.downImg = data;
                    aLink.href = data; 
                    if(this.pscur == 0){
                        this.srcc = aLink.href
                    }else{
                        this.srcd = aLink.href
                    }
                    // aLink.click() 
                }) 
            } 
        }, 
        downb(type) { 
            var that = this
            console.log('downb')
            var aLink = document.createElement('a') 
            aLink.download = 'author-img' 
            if (type === 'blob') { 
            this.$refs.cropper.getCropBlob((data) => { 
                this.downImg = window.URL.createObjectURL(data)
                aLink.href = window.URL.createObjectURL(data) 
                console.log(this.pscur)
                if(this.pscur == 0){
                    console.log(0)
                    this.srcc = aLink.href
                }else{
                    console.log(1)
                    this.srcd = aLink.href
                }
                that.blob_ok = -1
                that.showimg = true
                that.start()
                
                // aLink.click() 
            }) 
            } else { 
            this.$refs.cropper.getCropData((data) => { 
                this.downImg = data;
                aLink.href = data; 
                if(this.pscur == 0){
                    this.srcc = aLink.href
                }else{
                    this.srcd = aLink.href
                }
                that.blob_ok = -1
                that.showimg = true
                that.start()
                // aLink.click() 
            }) 
            } 
            this.blob_ok = 2  
        }, 
        //选择本地图片
        uploadImg(e, num) { 
            console.log('uploadImg');
            var _this = this;
            //上传图片 
            var file = e.target.files[0] 
            _this.fileName = file.name;
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) { 
            alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种') 
            return false 
            } 
            var reader = new FileReader(); 
            reader.onload =(e) => { 
            let data; 
            if (typeof e.target.result === 'object') { 
                // 把Array Buffer转化为blob 如果是base64不需要 
                data = window.URL.createObjectURL(new Blob([e.target.result])) 
            } 
            else { 
                data = e.target.result 
            }
            if (num === 1) { 
                _this.option.img = data 
            } else if (num === 2) { 
                _this.example2.img = data 
            } 
            } 
            // 转化为base64 
            // reader.readAsDataURL(file) 
            // 转化为blob 
            reader.readAsArrayBuffer(file);
        }, 
        imgLoad (msg) { 
            console.log('imgLoad')
            console.log(msg) 
        },
        showcan () {
            if(this.imgsta.length<2){
                this.$message.error('请选择两张对比照');
                return
            }
            this.srcc = ''
            this.srcd = ''
            this.osvisi = true
            var that = this
            that.blob_ok = 0
            console.log(that.imgsta)
            console.log(this.imgList)
            if(that.imgsta[0]>that.imgsta[1]){
                that.srca = that.imgList[that.imgsta[1]].src+"?"+new Date().getTime()
                that.srcb = that.imgList[that.imgsta[0]].src+"?"+new Date().getTime()
                console.log(that.srca)
                console.log(that.srcb)
            }else{
                that.srca = that.imgList[that.imgsta[0]].src+"?"+new Date().getTime()
                that.srcb = that.imgList[that.imgsta[1]].src+"?"+new Date().getTime()
                console.log(that.srca)
                console.log(that.srcb)
            }
            // this.srca =  require('../assets/bbg.png')
            // this.srcb = require('../assets/bbk.png')
            this.option.src = this.srca
            this.pscur = 0
            console.log(this.option.src)
        },
        serch () {
            var ta = this.value2 || -1
            console.log(this.value2)
            if(ta==-1){
                this.$message.error('请选择时间区间');
                return
            }
            this.kval = '所有'
            this.checkList = []
            this.getData()
        },
        draw () {
            var H = 2000
            var W = 2000
            var canvas = document.getElementById('canvas');
            var h = H/100;//百分1的高
            var w = W/100;//百分1的宽
            var ctx = canvas.getContext("2d");
            var ck = 1
            ctx.width = ctx.width*ck;
            ctx.height = ctx.height*ck;
            ctx.beginPath();
            ctx.fillStyle='#fff'
            ctx.fillRect(0, 0, 374, 527)
            ctx.stroke();

            var imgx = []
            var ddk = 0
            var yhy
            console.log(this.imgsta)
            console.log(this.imgList)
            console.log(this.checkListc)
            console.log(this.form)
            var ffa = this.imgsta[0]
            var ffb = this.imgsta[1]
            var ima =  new Image()
            // ima.src = this.imgList[ffa].src
            ima.crossOrigin = "Anonymous";
            // ima.src = this.srcc+"?"+new Date().getTime()
            ima.src = this.srcc
            console.log(ima.src)
            var that = this
            ima.onload = function(){
                console.log(ima.src)
                // ctx.drawImage(ima,0,0,187,360,0,0,187,360)
                ctx.drawImage(ima,0,0,187,360)
                var imb =  new Image()
                console.log(that.imgList[1])
                // imb.src = that.imgList[ffb].src
                imb.crossOrigin = "Anonymous";
                // imb.src = that.srcd+"?"+new Date().getTime()
                console.log(imb.src)
                imb.src = that.srcd
                imb.onload = function(){
                    console.log(imb.src)
                    // ctx.drawImage(imb,0,0,187,360,187,0,187,360)
                    ctx.drawImage(imb,187,0,187,360)
                    // if(that.checkListc.length==1){
                    //     ctx.beginPath();
                    //     ctx.lineWidth = 0.5
                    //     ctx.font="12px Arial";
                    //     ctx.fillStyle="rgba(106,111,123,1)"
                    //     ctx.fillText(that.checkListc[0], 23 * ck, 385 * ck)
                    //     ctx.stroke();
                    //     for(var i=0;i<3;i++){
                    //         if(that.thre[i].value == that.checkListc[0]){

                    //         }
                    //     }
                    //     ctx.beginPath()
                    //     ctx.font="11px Arial";
                    //     ctx.fillText(, 23 * ck, 413 * ck)
                    //     ctx.stroke()
                    // }
                    if(that.checkListc.length==1){
                        for(var i=0;i<that.form.thre.length;i++){
                            if(that.form.thre[i].value == that.checkListc[0]){
                                ctx.beginPath();
                                ctx.lineWidth = 0.5 * ck
                                ctx.font="12px Arial";
                                ctx.fillStyle="#000"
                                ctx.fillText(that.form.thre[i].value, 23 * ck, 385 * ck)
                                ctx.stroke();
                                ctx.beginPath()
                                ctx.font="11px Arial";
                                ctx.fillStyle="#000"
                                ctx.fillText(that.form.thre[i].aa, 23 * ck, 413 * ck)
                                ctx.stroke()
                                ctx.beginPath()
                                ctx.font="20px Arial";
                                ctx.fillStyle="#000"
                                ctx.fillText(that.form.thre[i].bb, 53 * ck, 415 * ck)
                                ctx.stroke()
                            }
                        }
                    }
                    if(that.checkListc.length==2){
                        for(var i=0;i<that.form.thre.length;i++){
                            if(that.form.thre[i].value == that.checkListc[0]){
                                ctx.beginPath();
                                ctx.lineWidth = 0.5 * ck
                                ctx.font="12px Arial";
                                ctx.fillStyle="rgba(0,0,0,1)"
                                ctx.fillText(that.form.thre[i].value, 23 * ck, 385 * ck)
                                ctx.stroke();
                                ctx.beginPath()
                                ctx.font="11px Arial";
                                ctx.fillStyle="rgba(0,0,0,1)"
                                ctx.fillText(that.form.thre[i].aa, 23 * ck, 413 * ck)
                                ctx.stroke()
                                ctx.beginPath()
                                ctx.font="20px Arial";
                                ctx.fillStyle="#000"
                                ctx.fillText(that.form.thre[i].bb, 53 * ck, 415 * ck)
                                ctx.stroke()
                            }
                            if(that.form.thre[i].value == that.checkListc[1]){
                                ctx.beginPath();
                                ctx.lineWidth = 0.5 * ck
                                ctx.font="12px Arial";
                                ctx.fillStyle="rgba(0,0,0,1)"
                                ctx.fillText(that.form.thre[i].value, 160 * ck, 385 * ck)
                                ctx.stroke();
                                ctx.beginPath()
                                ctx.font="11px Arial";
                                ctx.fillStyle="rgba(0,0,0,1)"
                                ctx.fillText(that.form.thre[i].aa, 141 * ck, 413 * ck)
                                ctx.stroke()
                                ctx.beginPath()
                                ctx.font="20px Arial";
                                ctx.fillStyle="#000"
                                ctx.fillText(that.form.thre[i].bb, 171 * ck, 415 * ck)
                                ctx.stroke()
                            }
                        }
                    }
                    if(that.checkListc.length==3){
                        for(var i=0;i<that.form.thre.length;i++){
                            if(that.form.thre[i].value == that.checkListc[0]){
                                ctx.beginPath();
                                ctx.lineWidth = 0.5 *ck
                                ctx.font="12px Arial";
                                ctx.fillStyle="rgba(0,0,0,1)"
                                ctx.fillText(that.form.thre[i].value, 23 * ck, 385 * ck)
                                ctx.stroke();
                                ctx.beginPath()
                                ctx.font="11px Arial";
                                ctx.fillStyle="rgba(0,0,0,1)"
                                ctx.fillText(that.form.thre[i].aa, 23 * ck, 413 * ck)
                                ctx.stroke()
                                ctx.beginPath()
                                ctx.font="20px Arial";
                                ctx.fillStyle="#000"
                                ctx.fillText(that.form.thre[i].bb, 53 * ck, 415 * ck)
                                ctx.stroke()
                            }
                            if(that.form.thre[i].value == that.checkListc[1]){
                                ctx.beginPath();
                                ctx.lineWidth = 0.5 * ck
                                ctx.font="12px Arial";
                                ctx.fillStyle="rgba(0,0,0,1)"
                                ctx.fillText(that.form.thre[i].value, 160 * ck, 385 * ck)
                                ctx.stroke();
                                ctx.beginPath()
                                ctx.font="11px Arial";
                                ctx.fillStyle="rgba(0,0,0,1)"
                                ctx.fillText(that.form.thre[i].aa, 141 * ck, 413 * ck)
                                ctx.stroke()
                                ctx.beginPath()
                                ctx.font="20px Arial";
                                ctx.fillStyle="#000"
                                ctx.fillText(that.form.thre[i].bb, 171 * ck, 415 * ck)
                                ctx.stroke()
                            }
                            if(that.form.thre[i].value == that.checkListc[2]){
                                ctx.beginPath();
                                ctx.lineWidth = 0.5 * ck
                                ctx.font="12px Arial";
                                ctx.fillStyle="rgba(0,0,0,1)"
                                ctx.fillText(that.form.thre[i].value, 322 * ck, 385 * ck)
                                ctx.stroke();
                                ctx.beginPath()
                                ctx.font="11px Arial";
                                ctx.fillStyle="rgba(0,0,0,1)"
                                ctx.fillText(that.form.thre[i].aa, 273 * ck, 413 * ck)
                                ctx.stroke()
                                ctx.beginPath()
                                ctx.font="20px Arial";
                                ctx.fillStyle="#000"
                                ctx.fillText(that.form.thre[i].bb, 303 * ck, 415 * ck)
                                ctx.stroke()
                            }
                        }
                    }
                    //名字二维码
                    ctx.beginPath()
                    ctx.font="14px PingFangSC";
                    ctx.fillStyle="#000"
                    ctx.fillText(that.gym.name, 22 * ck, 475 * ck)
                    ctx.stroke()
                    ctx.beginPath()
                    ctx.font="11px PingFangSC";
                    ctx.fillStyle="#000"
                    ctx.fillText(that.getDate(new Date(parseFloat(that.value2[0])))+' - '+that.getDate(new Date(parseFloat(that.value2[1]))), 22 * ck, 497 * ck)
                    ctx.stroke()
                    var srccc = canvas.toDataURL("img/jpg");
                    document.getElementById('imgkk').setAttribute('src',srccc)
                    that.npc = srccc
                }
            }
            // var canvas = document.getElementById('canvas');
            // var ctx = canvas.getContext("2d");
            // var ck = 1
            // ctx.width = ctx.width*ck;
            // ctx.height = ctx.height*ck;
            // var cfont = 10 * ck + "px Arial"
            // var imga = new Image();
            // imga.src = require('../assets/nava.png')
            // var imgb = new Image();
            // imgb.src = 'http://photocdn.sohu.com/20130416/Img372885486.jpg'
            // imga.onload = function(){
            //     ctx.drawImage(imga,0*ck,0*ck,150*ck,200*ck,0*ck,0*ck,187*ck,360*ck)
            // }
            // imgb.onload = function(){
            //     ctx.drawImage(imgb,0*ck,0*ck,100*ck,38*ck,187*ck,0*ck,187*ck,360*ck)
            // }
    
            
            //生成的data的路径,可以通过php生成图片存到数据库,单存data路径不合适,高清图片情况下会出现图片的残缺
            // var srccc = canvas.toDataURL("img/jpg");
            // $("#img").attr("src",srccc);
            // console.log(123)
        },
        seciima (x,y,z) {
            for(var i=0;i<this.imgsta.length;i++){
                if(this.imgsta[i]==y){
                    this.imgList[y].state=!this.imgList[y].state
                    this.imgList[y].ind = -1
                    this.imgsta.splice(i,1)
                    return
                }
            }
            console.log(this.imgsta)
            if(this.imgsta.length>=2){
                return
            }else{
                this.imgList[y].state=!this.imgList[y].state
                this.imgsta.push(y)
            }
            for(var i=0;i<this.imgList.length;i++){
                if(this.imgList[i].state == false){
                   this.imgList[i].ind = -1
                }
            }
            var ffa = -1
            for(var i=0;i<this.imgList.length;i++){
                if(this.imgList[i].state == true){
                    this.imgList[i].ind = 1
                    ffa = i
                    break
                }
            }
            
            console.log(ffa)
            if(ffa>-1){
                for(var i=ffa+1;i<this.imgList.length;i++){
                    if(this.imgList[i].state == true){
                        this.imgList[i].ind = 2
                        break
                    }
                    
                }
            } 
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
        getDate: function (no) {
            var date = no;
            var seperator1 = '/';
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
            if (mins >= 1 && mins <= 9) {
                mins = '0' + mins;
            }
            if (secs >= 1 && secs <= 9) {
                secs = '0' + secs;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            return currentdate;
        },
        // 获取 easy-mock 的模拟数据
        getData () {
            this.inquiry = this.$route.query.inquiry;
            this.nam = this.$route.query.nam;
            var that = this
            that.imgList = []
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
                uid: this.inquiry
            };
            console.log(this);
            this.$axios.post(this.localhost + '/api/coach/web/student/img/list', JSON.stringify(datt), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res.data.data);
                    var xbox = res.data.data;
                    this.gym.code = xbox.gym_info.mini_program_code_url
                    this.gym.name = xbox.gym_info.name
                    if(xbox.bfr_dif>0){
                        xbox.kao = '上升'+xbox.bfr_dif+'%'
                        xbox.xa = '上升'
                        xbox.xb = xbox.bfr_dif+'%'
                    }else if(xbox.bfr_dif == 0){
                        xbox.kao = '-'
                        xbox.xa = '-'
                        xbox.xb = '%'
                    }else{
                        xbox.kao = '下降'+(-1*xbox.bfr_dif)+'%'
                        xbox.xa = '下降'
                        xbox.xb = (-1*xbox.bfr_dif)+'%'
                    }
                    if(xbox.skeletal_muscle_dif>0){
                        xbox.kbo = '上升'+xbox.skeletal_muscle_dif+'kg'
                        xbox.ya = '上升'
                        xbox.yb = xbox.skeletal_muscle_dif+'kg'
                    }else if(xbox.skeletal_muscle_dif == 0){
                        xbox.kbo = '-'
                        xbox.ya = '-'
                        xbox.yb = 'kg'
                    }else{
                        xbox.kbo = '下降'+(-1*xbox.skeletal_muscle_dif)+'kg'
                        xbox.ya = '下降'
                        xbox.yb = (-1*xbox.skeletal_muscle_dif)+'kg'
                    }
                    if(xbox.weight_dif>0){
                        xbox.kco = '上升'+xbox.weight_dif+'kg'
                        xbox.za = '上升'
                        xbox.zb = xbox.weight_dif+'kg'
                    }else if(xbox.weight_dif == 0){
                        xbox.kco = '-'
                        xbox.za = '-'
                        xbox.zb = 'kg'
                    }else{
                        xbox.kco = '下降'+(-1*xbox.weight_dif)+'kg'
                        xbox.za = '下降'
                        xbox.zb = (-1*xbox.weight_dif)+'kg'
                    }
                    for(var i=0;i<xbox.images.length;i++){
                        this.imgList.push({
                            src: xbox.images[i],
                            state: false,
                            ind: -1
                        })
                    }
                    console.log(this.imgList)
                    xbox.thre = [
                        {
                            value: "体脂率",
                            sum: xbox.bfr,
                            change: xbox.kao,
                            aa: xbox.xa,
                            bb: xbox.xb
                        },{
                            value: "骨骼肌",
                            sum: xbox.skeletal_muscle,
                            change: xbox.kbo,
                            aa: xbox.ya,
                            bb: xbox.yb
                        },{
                            value: "体重",
                            sum: xbox.weight,
                            change: xbox.kco,
                            aa: xbox.za,
                            bb: xbox.zb
                        }
                    ]
                    this.form = xbox
                    console.log(this.form)
                    // this.draw()
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
    .imgbox .el-checkbox__input{
        position: absolute;
        left: 13px;
        top: 11px;
    }
    .imgbox .el-checkbox__label{
        position: absolute;
        left: 0;
        top: 0;
        padding: 0;
    }
    .imgbox .el-checkbox{
        margin-right: 10px;
    }
    .imgbox .el-checkbox__input.is-checked .el-checkbox__inner,.imgbox .el-checkbox__input.is-indeterminate .el-checkbox__inner{
        background-color: #305CD9;
        border-color: #305CD9;
    }
    .probox .el-checkbox__label{
        display: none;
    }
    .probox .el-checkbox-group{
        position: absolute;
        top: 37px;
    }
    .probox .el-checkbox:nth-of-type(1){
        position: absolute;
        left: 57px;
    }
    .probox .el-checkbox:nth-of-type(2){
        position: absolute;
        left: 218px;
    }
    .probox .el-checkbox:nth-of-type(3){
        position: absolute;
        left: 376px;
    }
</style>

<style scoped>
    .secnum{
        height: 30px;
        line-height: 30px;
        font-size: 13px;
        text-indent: 20px;
    }
    .secnumb{
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        text-indent: 8px;
        position: absolute;
        top: -30px;
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
        height: 590px;
    }
    .content{
        background: #F6F7F8;
        height: 700px;
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
        -moz-user-select:none; /*火狐*/
        -webkit-user-select:none; /*webkit浏览器*/
        -ms-user-select:none; /*IE10*/
        -khtml-user-select:none; /*早期浏览器*/
        user-select:none;

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
        overflow: auto;
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
        position: relative;
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
    }
    .cbot{
        position: relative;
        width: 100%;
        height: 500px;
    }
    .probox{
        width: 100%;
        height: 125px;
        position: relative;
    }
    .probox span:nth-of-type(1){
        position: absolute;
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(106,111,123,1);
        line-height:17px;
        display: inline-block;
        left: 28px;
        top: 35px;
    }
    .probox span:nth-of-type(4){
        position: absolute;
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(106,111,123,1);
        line-height:17px;
        display: inline-block;
        left: 184px;
        top: 35px;
    }
    .probox span:nth-of-type(7){
        position: absolute;
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(106,111,123,1);
        line-height:17px;
        display: inline-block;
        left: 355px;
        top: 35px;
    }
    .probox span:nth-of-type(2){
        height:29px;
        font-size:24px;
        font-family:DIN-BlackItalic;
        font-weight:normal;
        color:rgba(60,68,86,1);
        line-height:29px;
        position: absolute;
        left: 28px;
        top: 57px;
    }
    .probox span:nth-of-type(5){
        height:29px;
        font-size:24px;
        font-family:DIN-BlackItalic;
        font-weight:normal;
        color:rgba(60,68,86,1);
        line-height:29px;
        position: absolute;
        left: 183px;
        top: 57px;
    }
    .probox span:nth-of-type(8){
        height:29px;
        font-size:24px;
        font-family:DIN-BlackItalic;
        font-weight:normal;
        color:rgba(60,68,86,1);
        line-height:29px;
        position: absolute;
        left: 355px;
        top: 57px;
    }
    .probox span:nth-of-type(3){
        height:16px;
        font-size:11px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(39,201,134,1);
        line-height:16px;
        position: absolute;
        left: 90px;
        top: 68px;
    }
    .probox span:nth-of-type(6){
        height:16px;
        font-size:11px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(39,201,134,1);
        line-height:16px;
        position: absolute;
        left: 256px;
        top: 68px;
    }
    .probox span:nth-of-type(9){
        height:16px;
        font-size:11px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(39,201,134,1);
        line-height:16px;
        position: absolute;
        left: 427px;
        top: 68px;
    }
    .imgbox{
        float: left;
        margin-left: 13px;
        position: relative;
    }
    .secimg{
        width:150px;
        height:200px;
        border:3px solid transparent;
        box-sizing: border-box;
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
        position: relative;
    }
    .imgbox .el-checkbox{
        width:150px;
        height:200px;
        position: relative;
    }
    .secin{
        position: absolute;
        right: 13px;
        top: 11px;
        width: 22px;
        height: 22px;
        border-radius: 3px;
        background: #D6D6D6;
        color: #fff;
        text-align: center;
        line-height: 22px;
    }
    .crrt{
        width:83px;
        height:27px;
        background:rgba(60,68,86,1);
        border-radius:2px;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:27px;
        position: absolute;
        right: 20px;
        top: 8px;
        text-align: center;
    }
    .crrtll{
        width:83px;
        height:27px;
        border-radius:2px;
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:27px;
        position: absolute;
        right: 112px;
        top: 8px;
        text-align: center;
        border:1px solid rgba(60,68,86,1);
    }
    .bcby{
        position: fixed;
        z-index: 99;
        background:rgba(60,68,86,.2);
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 0 auto;
    }
    .bboq{
        width:508px;
        height:729px;
        background:rgba(51,60,77,1);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .bboq img{
        position: absolute;
        left: 0;
        width: 0;
        height: 0;
        z-index: -99;
    }
    .bbtn{
        width:166px;
        height:40px;
        background:rgba(255,192,1,1);
        border-radius:2px;
        position: absolute;
        top: 653px;
        left: 50%;
        transform: translateX(-50%);
        font-size:12px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:40px;
        text-align: center;
        text-decoration: none;
    }
    canvas{
        background: #fff;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 79px;
    }
    .info {
    width: 720px;
    margin: 0 auto;
    
    
  }
  .oper-dv {
      height:20px;
      text-align:right;
      margin-right:100px;
      
    }

  a {
        font-weight: 500;
        
      }
  &:last-child {
          margin-left: 30px;
        }
  .info-item {
      margin-top: 15px;
      
      
    }
  label {
        display: inline-block;
        width: 100px;
        text-align: right;
      }
  .sel-img-dv {
        position: relative;
      }
  .sel-file {
          position: absolute;
          width: 90px;
          height: 30px;
          opacity: 0;
          cursor: pointer;
          z-index: 2;
        }
  .sel-btn {
          position: absolute;
          cursor: pointer;
          z-index: 1;
        }
  .cropper-content{
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
    height: 0;
  }
  .cropper{
    position: absolute;
    width: 345px;
    height: 452px;
    left: 50%;
    transform: translateX(-50%); 
    box-sizing: border-box;
    top: 130px;
    }
  .show-preview{
      flex: 1;
      -webkit-flex: 1;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -webkit-justify-content: center;
    }
  .cropper-content .show-preview .preview {margin-left: 0;}
  .preview{
        overflow: hidden;
        border:1px solid #cccccc;
        background: #cccccc;
        margin-left: 40px;
      }
.box{
    width: 100%;
    height: 900px;
    z-index: 99;
    position: absolute;
    top: 0; 
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0 auto;
    background:rgba(60,68,86,.2);
}
.handle{
    width: 830px;
    float: left;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.llff{
  float: left;
  width: 250px;
  height: 100%;
}
.llup{
  float: left;
  width: 187px;
  height: 360px;
  margin-top:50px;
  margin-left: 20px;
  background-size:187px 360px !important;
  position: relative;
}
.lldo{
  float: left;
  width: 187px;
  height: 360px;
  margin-top:50px;
  margin-left: 20px;
  background-size:187px 360px !important;
  position: relative;
}
.rrff{
  float: right;
  width: 250px;
  height: 100%;
}
.rrup{
  float: left;
  width: 187px;
  height: 360px;
  margin-top:50px;
  margin-left: 20px;
  background: #ccc;
  background-size:187px 360px !important;
  position: relative;
  border: 2px solid #ccc;
}
.rrdo{
  float: left;
  width: 187px;
  height: 360px;
  margin-top:50px;
  margin-left: 20px;
  background: #ccc;
  background-size:187px 360px !important;
  position: relative;
  border: 2px solid #ccc;
}
.scs{
    display: inline-block;
    width: 80px;
    height: 20px;
    line-height: 20px;
    color: #fff;
    background: #305CD9;
    text-align: center;
    margin-left: 50px;
    font-size: 10px;
    line-height: 22px;
}
.llup span,.lldo span{
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #305CD9;
    text-align: center;
    line-height: 20px;
    color: #fff;
    right: -50px;
    top: 20px;
}
.rrup span,.rrdo span{
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #305CD9;
    text-align: center;
    line-height: 20px;
    color: #fff;
    left: -50px;
    top: 20px;
}
.lltit{
    position: absolute;
    top: 10px;
    left: 50px;
}
.rrtit{
    position: absolute;
    top: 10px;
    right: 118px;
}
.exit{
    position: absolute;
    right: 20px;
    top: 23px;
    background: #305CD9;
    color: #fff;
    text-align: center;
    line-height: 31px;
    height: 30px;
    font-size: 16px;
    width: 90px;
    z-index: 1000;
}
.cb_box{
    width:508px;
    height:729px;
    background: #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.cb_ta{
    height:25px;
    font-size:18px;
    font-family:PingFangSC-Medium,PingFangSC;
    font-weight:500;
    color:rgba(0,0,0,1);
    line-height:25px;
    position: absolute;
    top: 33px;
    left: 37px;
}
.cb_tb{
    width:100%;
    text-align: center;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Medium,PingFangSC;
    font-weight:500;
    color:rgba(0,0,0,1);
    line-height:20px;
    top: 82px;
    left: 0;
    position: absolute;
}
.cb_tc{   
    font-size:12px;
    font-family:PingFangSC-Medium,PingFangSC;
    font-weight:500;
    color:rgba(60,68,86,1);
    line-height:40px;
    width:166px;
    height:40px;
    background:rgba(255,192,1,1);
    border-radius:2px;
    top: 639px;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    text-align: center;
    text-decoration: none;
}
.cb_td{
    height:25px;
    font-size:18px;
    font-family:PingFangSC-Medium,PingFangSC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:25px;
    position: absolute;
    top: 33px;
    left: 37px;
}
.line{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
</style>
