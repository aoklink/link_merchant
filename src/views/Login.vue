<template>
    <div class="page-login">
        <div class="login-form">
            <div class="login-form-top">
                <img src="../assets/img2.png">
                <img src="../assets/img1.png">
            </div>
            <div class="login-form-title">
                <h2>欢迎回来</h2>
                <h1>
                    Linkfeeling 后台系统管理
                </h1>
            </div>
            <div class="login-form-input">
                <div class="login-form-input-row">
                    <label>用户名</label>
                    <input v-model="formItem.userName" type="text" placeholder="请输入用户名">
                </div>
                <div class="login-form-input-row">
                    <label>密码</label>
                    <input v-model="formItem.password" type="password" placeholder="请输入密码">
                </div>
            </div>
            <div class="login-form-footer">
                <button class="btn-login" @click="onSubmit">
                    登录
                </button>
                <p>
                    领客菲力（杭州）健康技术有限公司
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import {
    LOGIN
} from '@/store/action_type.js';
import {
    md5
} from '../utils/crypto';

export default {
    data () {
        return {
            formItem: {
                userName: '',
                password: ''
            }
        };
    },
    methods: {
        async onSubmit () {
            let result = await this.$store.dispatch(LOGIN, {
                name: this.formItem.userName,
                password: md5(this.formItem.password)
            });
            if (result.success) {
                this.$message.success('登陆成功');
                this.$router.replace({
                    path: this.$route.query['from'] || '/'
                });
            } else {
                this.$message.error(result.data);
            }
        }
    }
};

</script>

<style>
.page-login{
    position: relative;
    text-align: left;
    width: 100%;
    min-height: 100%;
    background:rgba(246,247,248,1);
    background-image: url('../assets/bg.png');
    background-position: 15rem 0 ;
    background-repeat: no-repeat;
}
.login-form{
    position: relative;
    top:3rem;
    left: 3rem;
    width:17.67rem;
    height:22.08rem;
    background:rgba(255,255,255,1);
    box-shadow:0rem 0.28rem 1.11rem 0rem rgba(35,44,96,0.06);
}
.login-form-top{
    padding-top: 2rem;
    padding-left: 3rem;
    font-size: 0;
}

.login-form-top img:first-child{
    width: 1rem;
    vertical-align: top;
}

.login-form-top img:last-child{
    margin-left: 9rem;
    width: 2rem;
}
.login-form-title{
    padding-left: 3rem;
    padding-top: 1rem;
}
.login-form-title h2{
    font-size:0.67rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(60,68,86,1);
    line-height:0.92rem;
}
.login-form-title h1{
    font-size:0.67rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(60,68,86,1);
    line-height:0.92rem;
}
.login-form-input{
    padding-left: 3rem;
    padding-top: 2rem;
}
.login-form-input-row{
    width:12.22rem;
    height:1.94rem;
    background:rgba(246,247,248,1);
    border:0.01rem solid rgba(225,227,232,1);

}
.login-form-input-row:first-of-type{
    border-bottom: none;
}
.login-form-input-row > *{
    display: block;
}
.login-form-input-row label{
    padding-left: 1rem;
    padding-top: .5rem;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(91,99,126,1);
    line-height:0.47rem;
}
.login-form-input-row input{
    padding-left: 1rem;
    padding-top:8px;
    width: 100%;
    background: transparent;
    box-sizing: border-box;
    border: none;
    font-size:16px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    line-height:0.56rem;
}
.login-form-input-row input::placeholder{
    color:rgba(191,196,209,1);
}
.login-form-input-row input:focus{
    outline: none;
}
.login-form-footer{
    padding-left: 3rem;
    padding-top: 2rem;
}

.btn-login{
    padding: 0;
    font-size: 14px;
    width:12.33rem;
    height:1.94rem;
    background:rgba(255,192,1,1);
    border-radius:0.06rem;
    border: none;
    cursor: pointer;
}
.login-form-footer p{
    width:12.33rem;
    margin: 0;
    padding: 3rem 0 0;
    text-align: center;
    font-size: 14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(91,99,126,1);
    line-height:0.47rem;
}
</style>
