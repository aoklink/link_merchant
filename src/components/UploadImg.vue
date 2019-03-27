<template>
    <div class="upload-img">
        <el-upload
            :action="OSSsession.host||'/'"
            list-type="picture-card"
            :on-error="handleError"
            :on-success="handleSuccess"
            :data="formData"
            :multiple="false"
            :before-upload="handleBeforeUpload"
            :show-file-list="false"
        >
            <img v-if="oneImage&&imgSrc" :src="imgSrc">
            <img v-else-if="value" :src="value">
            <i v-else class="el-icon-plus" />
        </el-upload>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import { GET_OSS_SESSION } from '../store/action_type';

export default {
    props: {
        oneImage: {
            type: Boolean,
            default: true
        },
        value: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            imgSrc: ''
        };
    },
    computed: {
        ...mapState(['OSSsession']),
        formData: function () {
            return {
                policy: this.OSSsession.policy,
                signature: this.OSSsession.signature,
                key: `${this.OSSsession.dir}${this.getFileName()}`,
                name: this.getFileName(),
                OSSAccessKeyId: this.OSSsession.accessid,
                success_action_status: 200,
                callback: this.OSSsession.callback
            };
        }
    },
    methods: {
        getFileName () {
            return `${Date.now()}${Math.ceil(Math.random() * 1000)}.jpg`;
        },
        handleSuccess (response, file, fileList) {
            this.$store.dispatch(GET_OSS_SESSION);
            if (/ok/i.test(response.Status)) {
                this.$emit('input', response.data);
                this.$message.success('图片上传成功');
                if (!this.oneImage) {
                    this.$emit('addimg', response.data);
                    console.log(response.data);
                }
            } else {
                this.$emit('error', JSON.stringify(response));
            }
        },
        handleError (err, file, fileList) {
            this.$emit('error', err);
            this.$store.dispatch(GET_OSS_SESSION);
        },
        handleChange (file, fileList) {

        },
        handleBeforeUpload (file) {
            if (!/\.(png|jpg|jpeg|gif)$/.test(file.name)) {
                this.$message.error('只能上传图片');
                return false;
            }
            return true;
        }
    }
};
</script>

<style>
    .upload-img .el-upload--picture-card{
        width: 2.22rem;
        height: 2.22rem;
        line-height: 2.4rem;
    }
    .upload-img img{
        max-height: 2.22rem;
        max-width: 2.22rem;
    }

</style>
