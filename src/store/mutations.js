import * as types from './mutation_type';
import { login, logout } from '../utils/auth';
import { initVal } from './state';

export default {
    [types.AUTHORIZATION] (state, isAuth) {
        state.authorization = isAuth;
        if (isAuth) {
            login();
        } else {
            logout();
            Object.assign(state, {
                ...initVal
            });
        }
    },
    [types.MUTATE_USERINFO] (state, payload) {
        state.userInfo = {
            name: payload.name,
            id: payload.id
        };
    },
    [types.MUTATE_GYM_INFO_LIST] (state, payload) {
        state.gymInfoList = payload;
    },
    [types.ADD_GYM_INFO_LIST_SELECTED] (state, payload) {
        state.gymInfoListSelected = [{
            id: payload.id,
            member_count: payload.memberCount,
            name: payload.name,
            city: payload.city,
            address: payload.address,
            label: payload.label,
            phone: payload.phone,
            logo_url: payload.logo_url,
            display_img_urls: payload.display_img_urls,
            mini_program_code_url: payload.mini_program_code_url
        }];
    },
    [types.REMOVE_ITEM_FROM_GYM_INFO_LIST_SELECTED] (state, payload) {
        state.gymInfoListSelected = state.gymInfoListSelected.filter(item => item.id != payload);
    },
    [types.MUTATE_COACH_INFO_LIST_SELECTED] (state, payload) {
        state.coachInfoListSelected = [...payload];
    },
    [types.MUTATE_CLASS_INFO_SELECTED] (state, payload) {
        state.classInfoSelected = {...payload};
    },
    [types.MUTATE_CLASS_INFO_LIST_SELECTED] (state, payload = []) {
        state.classInfoListSelected = [...payload];
    },
    [types.MUTATE_OSS_SESSION] (state, payload) {
        state.OSSsession = {
            accessid: payload.accessid,
            callback: payload.callback,
            dir: payload.dir,
            expire: payload.expire,
            host: payload.host,
            policy: payload.policy,
            signature: payload.signature
        };
    },
    [types.MUTATE_GYM_ADMIN_INFO_SELECTED] (state, payload) {
        state.gymAdminInfoSelected = {
            id: payload.id,
            name: payload.name,
            phone: payload.phone
        };
    }
};
