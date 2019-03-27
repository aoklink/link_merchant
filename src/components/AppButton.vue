<template>
    <button :class="className" @click="onClick">
        <slot />
    </button>
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            default: 'mini',
            validator: (value) => ['medium', 'small', 'mini', 'large'].includes(value)
        },
        theme: {
            type: String,
            default: 'plain',
            validator (value) {
                return ['plain', 'yellow', 'grey', 'green', 'red'].includes(value);
            }
        },
        customClass: {
            type: String,
            default: ''
        }
    },
    computed: {
        className () {
            return ['base', this.size, this.theme, this.customClass].join(' ');
        }
    },
    methods: {
        onClick (...args) {
            this.$emit('click', ...args);
        }
    }
};

</script>

<style scoped>
    .base {
        border-radius: 0.11rem;
        border: none;
        background: none;
        cursor: pointer;
        color: #3C4456;
        font-family:PingFangSC-Medium;
        font-weight:500;
        font-size: 14px;
    }
    .base:focus{
        outline: none;
    }
    .base:not(:last-of-type){
        margin-right: .25rem;;
    }

    .mini{
        width:1.67rem;
        height:0.69rem;
        line-height: .69rem;
    }
    .small{
        width:3.33rem;
        height: 0.83rem;
        line-height: 0.83rem;
    }
    .medium{
        width:3.33rem;
        height:0.97rem;
    }

    .large{
        width:2.78rem;
        height:1.11rem;
        border-radius:0.06rem;
    }

    .red{
        background-color: #f56c6c;
        color: #fff;
        border: 1px solid #f56c6c;
    }

    .green{
        color: #fff;
        background-color: #67c23a;
        border: 1px solid #67c23a;
    }

    .yellow{
        background:rgba(255,192,1,1);
        border: 1px solid rgba(255,192,1,1);
    }
    .plain {
        border:1px solid rgba(60,68,86,1);
    }
    .grey{
        background:rgba(60,68,86,1);
        color: #fff;
        border: 1px solid rgba(60,68,86,1);
    }

</style>
