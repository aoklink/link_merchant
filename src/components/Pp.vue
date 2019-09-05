<template>
  <div class="box">
    <div class="llff">
      <div class="llup" :style="{ 'background': 'url(' + srca + ') no-repeat center'}"></div>
      <div class="lldo" :style="{ 'background': 'url(' + srcb + ') no-repeat center'}"></div>
    </div>
    <div class="info-item handle">
      <label class="btn btn-orange" for="uploads" style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">选择图片</label>
      <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
      <input type="button" class="oper" style="height:20px;width:23px;font-size:20px;margin:3px 5px;" value="+" title="放大" @click="changeScale(1)">
      <input type="button" class="oper" style="height:20px;width:23px;font-size:20px;margin:3px 5px;" value="-" title="缩小" @click="changeScale(-1)">
      <input type="button" class="oper" style="height:20px;width:23px;font-size:20px;margin:3px 5px;" value="↺" title="左旋转" @click="rotateLeft">
      <input type="button" class="oper" style="height:20px;width:23px;font-size:20px;margin:3px 5px;" value="↻" title="右旋转" @click="rotateRight">
      <input type="button" class="oper" style="height:20px;width:23px;font-size:20px;margin:3px 5px;" value="↓" title="下载" @click="down('blob')">
      <input type="button" class="btn btn-blue" value="上传头像" @click="finish('blob')">
      <div class="line" style="margin-left: -280px;margin-top: 85px;">
        <div class="cropper-content" style="margin-top:-60px;">
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
          <div style="margin-left:20px;">
            <div class="show-preview" :style="{'width': '187px', 'height':'360px',  'overflow': 'hidden', 'margin': '5px'}">
              <div :style="previews.div" class="preview">
                <img :src="previews.url" :style="previews.img">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rrll">
      <div class="rrup" :style="{ 'background': 'url(' + srcc + ') no-repeat center'}"></div>
      <div class="rrdo" :style="{ 'background': 'url(' + srcd + ') no-repeat center'}"></div>
    </div>
  </div>
</template>

<script>
  import {VueCropper} from 'vue-cropper'
  // import Api from '@/js/api.js' //接口url配置文件
 

  export default {
    data() {
      return {
        headImg:'',
        srca: 'http://test.linkfeeling.cn/c3703576af3d77bf534a6e2bdc0f89f.jpg',
        srcb: 'http://test.linkfeeling.cn/c3703576af3d77bf534a6e2bdc0f89f.jpg',
        srcc: 'http://test.linkfeeling.cn/c3703576af3d77bf534a6e2bdc0f89f.jpg',
        srcd: 'http://test.linkfeeling.cn/c3703576af3d77bf534a6e2bdc0f89f.jpg',
        //剪切图片上传
        crap: false,
        previews: {},
        option: {
          img: '',
          src: require('../assets/bbg.png'),
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
      }
    },
    components: { 
      VueCropper 
    }, 
    methods: { 
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
        var aLink = document.createElement('a') 
        aLink.download = 'author-img' 
        if (type === 'blob') { 
          this.$refs.cropper.getCropBlob((data) => { 
            this.downImg = window.URL.createObjectURL(data)
            aLink.href = window.URL.createObjectURL(data) 
            console.log(aLink)
            this.srcc = aLink.href
            // aLink.click() 
          }) 
        } else { 
          this.$refs.cropper.getCropData((data) => { 
            this.downImg = data;
            aLink.href = data; 
            // aLink.click() 
          }) 
        } 
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
      }
    }, 
    
  }
</script>

<style>
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
  }
  .cropper{
      width: 460px;
      height: 460px;
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
  .handle{
    width: 750px;
  }
</style>
<style scoped>
.main-container,.box{
  width: 100%;
  height: 100%;
}
.handle{
  width: 750px;
  float: left;
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
}
.lldo{
  float: left;
  width: 187px;
  height: 360px;
  margin-top:50px;
  margin-left: 20px;
  background-size:187px 360px !important;
}
.rrff{
  float: left;
  width: 250px;
  height: 100%;
}
.rrup{
  float: left;
  width: 187px;
  height: 360px;
  margin-top:50px;
  margin-left: 20px;
  background-size:187px 360px !important;
}
.rrdo{
  float: left;
  width: 187px;
  height: 360px;
  margin-top:50px;
  margin-left: 20px;
  background-size:187px 360px !important;
}
</style>
