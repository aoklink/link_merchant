<template>
    <div class="home">
        <Content />
    </div>
</template>

<script>
// @ is an alias to /src
import Content from '../components/Content';
import store from '@/store';
import { VERIFY_AUTH } from '../store/action_type';

export default {
    name: 'Home',
    components: {
        Content
    },
    beforeRouteEnter: async (to, from, next) => {
        if (!store.state.authorization) {
            next({
                name: 'Login'
            });
        } else {
            next();
        }
    },
    async created () {
        let result = await this.$store.dispatch(VERIFY_AUTH);
        if (!result.success) {
            this.$message.error(result.data);
            this.$router.push({
                name: 'Login'
            });
        }
    }
};
</script>

<style>
.home{
    height: 100%;
    background:rgba(246,247,248,1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
</style>
