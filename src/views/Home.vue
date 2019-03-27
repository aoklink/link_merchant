<template>
    <div class="home">
        <Banner />
        <Content />
    </div>
</template>

<script>
// @ is an alias to /src
import Banner from '../components/Banner';
import Content from '../components/Content';
import store from '@/store';
import { VERIFY_AUTH } from '../store/action_type';

export default {
    name: 'Home',
    components: {
        Banner,
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
    min-height: 100%;
    background:rgba(246,247,248,1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
</style>
